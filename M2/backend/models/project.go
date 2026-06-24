package models

type ProjectImage struct {
	ID         int    `json:"id"`
	ProjectID  int    `json:"project_id"`
	ImagePath  string `json:"image_path"`
	OrderIndex int    `json:"order_index"`
}

type Project struct {
	ID         int            `json:"id"`
	Name       string         `json:"name"`
	Category   string         `json:"category"`
	ImagePath  string         `json:"image_path"`
	Year       string         `json:"year"`
	OrderIndex int            `json:"order_index"`
	Images     []ProjectImage `json:"images"`
}
