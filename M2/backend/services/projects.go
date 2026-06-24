package services

import (
	"database/sql"

	"diploma/backend/models"
)

type ProjectService struct {
	db *sql.DB
}

func NewProjectService(db *sql.DB) *ProjectService {
	return &ProjectService{db: db}
}

func (s *ProjectService) List() ([]models.Project, error) {
	rows, err := s.db.Query(`SELECT id, name, category, image_path, year, order_index FROM projects ORDER BY order_index ASC, id ASC`)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	projects := []models.Project{}
	for rows.Next() {
		var p models.Project
		if err := rows.Scan(&p.ID, &p.Name, &p.Category, &p.ImagePath, &p.Year, &p.OrderIndex); err != nil {
			return nil, err
		}
		p.Images = []models.ProjectImage{}
		projects = append(projects, p)
	}
	if err := rows.Err(); err != nil {
		return nil, err
	}

	imgRows, err := s.db.Query(`SELECT id, project_id, image_path, order_index FROM project_images ORDER BY order_index ASC, id ASC`)
	if err != nil {
		return projects, nil
	}
	defer imgRows.Close()

	byID := make(map[int]int, len(projects))
	for i, p := range projects {
		byID[p.ID] = i
	}
	for imgRows.Next() {
		var img models.ProjectImage
		if err := imgRows.Scan(&img.ID, &img.ProjectID, &img.ImagePath, &img.OrderIndex); err != nil {
			return nil, err
		}
		if idx, ok := byID[img.ProjectID]; ok {
			projects[idx].Images = append(projects[idx].Images, img)
		}
	}
	return projects, nil
}

func (s *ProjectService) Create(p models.Project) (models.Project, error) {
	res, err := s.db.Exec(
		`INSERT INTO projects (name, category, image_path, year, order_index) VALUES (?, ?, ?, ?, ?)`,
		p.Name, p.Category, p.ImagePath, p.Year, p.OrderIndex,
	)
	if err != nil {
		return models.Project{}, err
	}
	id, _ := res.LastInsertId()
	p.ID = int(id)
	p.Images = []models.ProjectImage{}
	return p, nil
}

func (s *ProjectService) Update(id int, p models.Project) (models.Project, error) {
	_, err := s.db.Exec(
		`UPDATE projects SET name=?, category=?, image_path=?, year=?, order_index=? WHERE id=?`,
		p.Name, p.Category, p.ImagePath, p.Year, p.OrderIndex, id,
	)
	if err != nil {
		return models.Project{}, err
	}
	p.ID = id
	return p, nil
}

func (s *ProjectService) Delete(id int) error {
	if _, err := s.db.Exec(`DELETE FROM project_images WHERE project_id=?`, id); err != nil {
		return err
	}
	_, err := s.db.Exec(`DELETE FROM projects WHERE id=?`, id)
	return err
}

func (s *ProjectService) AddImage(projectID int, img models.ProjectImage) (models.ProjectImage, error) {
	img.ProjectID = projectID
	res, err := s.db.Exec(
		`INSERT INTO project_images (project_id, image_path, order_index) VALUES (?, ?, ?)`,
		img.ProjectID, img.ImagePath, img.OrderIndex,
	)
	if err != nil {
		return models.ProjectImage{}, err
	}
	id, _ := res.LastInsertId()
	img.ID = int(id)
	return img, nil
}

func (s *ProjectService) DeleteImage(imageID int) error {
	_, err := s.db.Exec(`DELETE FROM project_images WHERE id=?`, imageID)
	return err
}
