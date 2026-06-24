package handlers

import (
	"encoding/json"
	"net/http"
	"strconv"

	"diploma/backend/models"
	"diploma/backend/services"
)

func GetProjects(svc *services.ProjectService) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		projects, err := svc.List()
		if err != nil {
			http.Error(w, "query failed", http.StatusInternalServerError)
			return
		}
		writeJSON(w, http.StatusOK, projects)
	}
}

func CreateProject(svc *services.ProjectService) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		var p models.Project
		if err := json.NewDecoder(r.Body).Decode(&p); err != nil {
			http.Error(w, "invalid json", http.StatusBadRequest)
			return
		}

		created, err := svc.Create(p)
		if err != nil {
			http.Error(w, "insert failed", http.StatusInternalServerError)
			return
		}
		writeJSON(w, http.StatusCreated, created)
	}
}

func UpdateProject(svc *services.ProjectService) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		id, err := strconv.Atoi(r.PathValue("id"))
		if err != nil {
			http.Error(w, "invalid id", http.StatusBadRequest)
			return
		}

		var p models.Project
		if err := json.NewDecoder(r.Body).Decode(&p); err != nil {
			http.Error(w, "invalid json", http.StatusBadRequest)
			return
		}

		updated, err := svc.Update(id, p)
		if err != nil {
			http.Error(w, "update failed", http.StatusInternalServerError)
			return
		}
		writeJSON(w, http.StatusOK, updated)
	}
}

func DeleteProject(svc *services.ProjectService) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		id, err := strconv.Atoi(r.PathValue("id"))
		if err != nil {
			http.Error(w, "invalid id", http.StatusBadRequest)
			return
		}

		if err := svc.Delete(id); err != nil {
			http.Error(w, "delete failed", http.StatusInternalServerError)
			return
		}

		w.Header().Set("Content-Type", "application/json")
		w.Write([]byte(`{"ok":true}`))
	}
}

func AddProjectImage(svc *services.ProjectService) http.HandlerFunc {
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

		created, err := svc.AddImage(projectID, img)
		if err != nil {
			http.Error(w, "insert failed", http.StatusInternalServerError)
			return
		}
		writeJSON(w, http.StatusCreated, created)
	}
}

func DeleteProjectImage(svc *services.ProjectService) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		id, err := strconv.Atoi(r.PathValue("id"))
		if err != nil {
			http.Error(w, "invalid id", http.StatusBadRequest)
			return
		}

		if err := svc.DeleteImage(id); err != nil {
			http.Error(w, "delete failed", http.StatusInternalServerError)
			return
		}

		w.Header().Set("Content-Type", "application/json")
		w.Write([]byte(`{"ok":true}`))
	}
}
