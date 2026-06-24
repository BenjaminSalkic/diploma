package handlers

import (
	"database/sql"
	"encoding/json"
	"net/http"
)

func GetConfig(db *sql.DB) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		var configJSON string
		err := db.QueryRow("SELECT data FROM config LIMIT 1").Scan(&configJSON)
		if err != nil {
			if err == sql.ErrNoRows {
				// Default config if none exists
				configJSON = `{"global":{"theme":{"backgroundColor":"#ffffff","textColor":"#000000","primaryColor":"#3b82f6"},"font":{"heading":"Inter","body":"Roboto"}},"sections":[{"id":"hero","variant":1,"props":{}},{"id":"projects","variant":1,"props":{}},{"id":"skills","variant":1,"props":{}},{"id":"about","variant":1,"props":{}},{"id":"contact","variant":1,"props":{}}]}`
			} else {
				http.Error(w, "Database error", http.StatusInternalServerError)
				return
			}
		}

		w.Header().Set("Content-Type", "application/json")
		w.Write([]byte(configJSON))
	}
}

func UpdateConfig(db *sql.DB) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		var payload map[string]interface{}
		if err := json.NewDecoder(r.Body).Decode(&payload); err != nil {
			http.Error(w, "Invalid JSON", http.StatusBadRequest)
			return
		}

		configJSON, err := json.Marshal(payload)
		if err != nil {
			http.Error(w, "Error parsing JSON", http.StatusInternalServerError)
			return
		}

		_, err = db.Exec(`
			INSERT INTO config (id, data) VALUES (1, ?) 
			ON CONFLICT(id) DO UPDATE SET data = excluded.data
		`, configJSON)
		if err != nil {
			http.Error(w, "Failed to save config", http.StatusInternalServerError)
			return
		}

		w.Header().Set("Content-Type", "application/json")
		w.Write(configJSON)
	}
}
