package services

import (
	"database/sql"
	"errors"
)

var ErrConfigNotFound = errors.New("config not found")

type PageConfigService struct {
	db *sql.DB
}

func NewPageConfigService(db *sql.DB) *PageConfigService {
	return &PageConfigService{db: db}
}

// Get returns the raw JSON config blob. The frontend treats the body as
// opaque JSON, so we pass it through untouched rather than re-marshalling.
func (s *PageConfigService) Get() (string, error) {
	var config string
	err := s.db.QueryRow(`SELECT config FROM page_config WHERE id = 1`).Scan(&config)
	if err == sql.ErrNoRows {
		return "", ErrConfigNotFound
	}
	if err != nil {
		return "", err
	}
	return config, nil
}

func (s *PageConfigService) Update(raw string) error {
	_, err := s.db.Exec(`UPDATE page_config SET config = ? WHERE id = 1`, raw)
	return err
}
