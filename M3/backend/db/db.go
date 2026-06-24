package db

import (
	"database/sql"

	_ "github.com/mattn/go-sqlite3"
)

func Connect(path string) (*sql.DB, error) {
	database, err := sql.Open("sqlite3", path)
	if err != nil {
		return nil, err
	}

	if err := database.Ping(); err != nil {
		return nil, err
	}

	return database, nil
}

const defaultConfig = `{
  "global": {
    "theme": {
      "backgroundColor": "#ffffff",
      "textColor": "#000000",
      "primaryColor": "#3b82f6"
    },
    "font": {
      "heading": "Inter",
      "body": "Roboto"
    }
  },
  "sections": [
    {
      "id": "hero",
      "variant": 1,
      "props": {
        "heading": "We build powerful digital solutions.",
        "images": []
      }
    },
    { "id": "projects", "variant": 1, "props": {} },
    { "id": "skills",   "variant": 1, "props": {} },
    { "id": "about",    "variant": 1, "props": {} },
    { "id": "contact",  "variant": 1, "props": {} }
  ]
}`

func Init(database *sql.DB) error {
	_, err := database.Exec(`
		CREATE TABLE IF NOT EXISTS page_config (
			id     INTEGER PRIMARY KEY,
			config TEXT NOT NULL
		)
	`)
	if err != nil {
		return err
	}

	_, err = database.Exec(`
		CREATE TABLE IF NOT EXISTS projects (
			id          INTEGER PRIMARY KEY AUTOINCREMENT,
			name        TEXT    NOT NULL DEFAULT '',
			category    TEXT    NOT NULL DEFAULT '',
			image_path  TEXT    NOT NULL DEFAULT '',
			order_index INTEGER NOT NULL DEFAULT 0
		)
	`)
	if err != nil {
		return err
	}

	// Add year column if it doesn't exist yet
	database.Exec(`ALTER TABLE projects ADD COLUMN year TEXT NOT NULL DEFAULT ''`)

	_, err = database.Exec(`
		CREATE TABLE IF NOT EXISTS project_images (
			id          INTEGER PRIMARY KEY AUTOINCREMENT,
			project_id  INTEGER NOT NULL,
			image_path  TEXT    NOT NULL DEFAULT '',
			order_index INTEGER NOT NULL DEFAULT 0
		)
	`)
	if err != nil {
		return err
	}

	_, err = database.Exec(`
		CREATE TABLE IF NOT EXISTS users (
			id            INTEGER PRIMARY KEY AUTOINCREMENT,
			email         TEXT    NOT NULL UNIQUE,
			password_hash TEXT    NOT NULL,
			created_at    INTEGER NOT NULL
		)
	`)
	if err != nil {
		return err
	}

	var count int
	if err := database.QueryRow(`SELECT COUNT(*) FROM page_config`).Scan(&count); err != nil {
		return err
	}
	if count == 0 {
		_, err = database.Exec(`INSERT INTO page_config (id, config) VALUES (1, ?)`, defaultConfig)
		return err
	}
	return nil
}
