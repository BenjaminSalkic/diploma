package handlers

import (
	"database/sql"
	"encoding/json"
	"net/http"
)

func GetPageConfig(db *sql.DB) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		var config string
		err := db.QueryRow(`SELECT config FROM page_config WHERE id = 1`).Scan(&config)
		if err != nil {
			http.Error(w, "config not found", http.StatusNotFound)
			return
		}

		w.Header().Set("Content-Type", "application/json")
		w.Write([]byte(config))
	}
}

func UpdatePageConfig(db *sql.DB) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		var raw json.RawMessage
		if err := json.NewDecoder(r.Body).Decode(&raw); err != nil {
			http.Error(w, "invalid json", http.StatusBadRequest)
			return
		}

		_, err := db.Exec(`UPDATE page_config SET config = ? WHERE id = 1`, string(raw))
		if err != nil {
			http.Error(w, "failed to update config", http.StatusInternalServerError)
			return
		}

		w.Header().Set("Content-Type", "application/json")
		w.Write([]byte(`{"ok":true}`))
	}
}
