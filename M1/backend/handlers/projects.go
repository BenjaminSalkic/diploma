package handlers

import (
	"database/sql"
	"encoding/json"
	"net/http"
	"strconv"
	"strings"

	"diploma/backend/models"
)

func GetProjects(db *sql.DB) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		rows, err := db.Query(`SELECT id, name, category, image_path, year, order_index FROM projects ORDER BY order_index ASC, id ASC`)
		if err != nil {
			http.Error(w, "query failed", http.StatusInternalServerError)
			return
		}
		defer rows.Close()

		projects := []models.Project{}
		for rows.Next() {
			var p models.Project
			if err := rows.Scan(&p.ID, &p.Name, &p.Category, &p.ImagePath, &p.Year, &p.OrderIndex); err != nil {
				continue
			}
			p.Images = []models.ProjectImage{}
			projects = append(projects, p)
		}

		// Attach images to each project.
		imgRows, err := db.Query(`SELECT id, project_id, image_path, order_index FROM project_images ORDER BY order_index ASC, id ASC`)
		if err == nil {
			defer imgRows.Close()
			for imgRows.Next() {
				var img models.ProjectImage
				if err := imgRows.Scan(&img.ID, &img.ProjectID, &img.ImagePath, &img.OrderIndex); err != nil {
					continue
				}
				for i := range projects {
					if projects[i].ID == img.ProjectID {
						projects[i].Images = append(projects[i].Images, img)
					}
				}
			}
		}

		w.Header().Set("Content-Type", "application/json")
		json.NewEncoder(w).Encode(projects)
	}
}

func CreateProject(db *sql.DB) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		var p models.Project
		if err := json.NewDecoder(r.Body).Decode(&p); err != nil {
			http.Error(w, "invalid json", http.StatusBadRequest)
			return
		}

		res, err := db.Exec(
			`INSERT INTO projects (name, category, image_path, year, order_index) VALUES (?, ?, ?, ?, ?)`,
			p.Name, p.Category, p.ImagePath, p.Year, p.OrderIndex,
		)
		if err != nil {
			http.Error(w, "insert failed", http.StatusInternalServerError)
			return
		}

		id, _ := res.LastInsertId()
		p.ID = int(id)
		p.Images = []models.ProjectImage{}

		w.Header().Set("Content-Type", "application/json")
		w.WriteHeader(http.StatusCreated)
		json.NewEncoder(w).Encode(p)
	}
}

func UpdateProject(db *sql.DB) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		idStr := r.PathValue("id")
		if idStr == "" {
			idStr = strings.TrimPrefix(r.URL.Path, "/api/projects/")
		}
		id, err := strconv.Atoi(idStr)
		if err != nil {
			http.Error(w, "invalid id", http.StatusBadRequest)
			return
		}

		var p models.Project
		if err := json.NewDecoder(r.Body).Decode(&p); err != nil {
			http.Error(w, "invalid json", http.StatusBadRequest)
			return
		}

		_, err = db.Exec(
			`UPDATE projects SET name=?, category=?, image_path=?, year=?, order_index=? WHERE id=?`,
			p.Name, p.Category, p.ImagePath, p.Year, p.OrderIndex, id,
		)
		if err != nil {
			http.Error(w, "update failed", http.StatusInternalServerError)
			return
		}

		p.ID = id
		w.Header().Set("Content-Type", "application/json")
		json.NewEncoder(w).Encode(p)
	}
}

func DeleteProject(db *sql.DB) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		idStr := r.PathValue("id")
		if idStr == "" {
			idStr = strings.TrimPrefix(r.URL.Path, "/api/projects/")
		}
		id, err := strconv.Atoi(idStr)
		if err != nil {
			http.Error(w, "invalid id", http.StatusBadRequest)
			return
		}

		db.Exec(`DELETE FROM project_images WHERE project_id=?`, id)
		if _, err := db.Exec(`DELETE FROM projects WHERE id=?`, id); err != nil {
			http.Error(w, "delete failed", http.StatusInternalServerError)
			return
		}

		w.Header().Set("Content-Type", "application/json")
		w.Write([]byte(`{"ok":true}`))
	}
}

func AddProjectImage(db *sql.DB) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		projectID, err := strconv.Atoi(r.PathValue("id"))
		if err != nil {
			http.Error(w, "invalid project id", http.StatusBadRequest)
			return
		}

		var img models.ProjectImage
		if err := json.NewDecoder(r.Body).Decode(&img); err != nil {
			http.Error(w, "invalid json", http.StatusBadRequest)
			return
		}
		img.ProjectID = projectID

		res, err := db.Exec(
			`INSERT INTO project_images (project_id, image_path, order_index) VALUES (?, ?, ?)`,
			img.ProjectID, img.ImagePath, img.OrderIndex,
		)
		if err != nil {
			http.Error(w, "insert failed", http.StatusInternalServerError)
			return
		}

		id, _ := res.LastInsertId()
		img.ID = int(id)

		w.Header().Set("Content-Type", "application/json")
		w.WriteHeader(http.StatusCreated)
		json.NewEncoder(w).Encode(img)
	}
}

func DeleteProjectImage(db *sql.DB) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		id, err := strconv.Atoi(r.PathValue("id"))
		if err != nil {
			http.Error(w, "invalid id", http.StatusBadRequest)
			return
		}

		if _, err := db.Exec(`DELETE FROM project_images WHERE id=?`, id); err != nil {
			http.Error(w, "delete failed", http.StatusInternalServerError)
			return
		}

		w.Header().Set("Content-Type", "application/json")
		w.Write([]byte(`{"ok":true}`))
	}
}
