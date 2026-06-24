package handlers

import (
	"encoding/json"
	"errors"
	"net/http"

	"diploma/backend/services"
)

func GetPageConfig(svc *services.PageConfigService) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		config, err := svc.Get()
		if errors.Is(err, services.ErrConfigNotFound) {
			http.Error(w, "config not found", http.StatusNotFound)
			return
		}
		if err != nil {
			http.Error(w, "lookup failed", http.StatusInternalServerError)
			return
		}

		w.Header().Set("Content-Type", "application/json")
		w.Write([]byte(config))
	}
}

func UpdatePageConfig(svc *services.PageConfigService) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		var raw json.RawMessage
		if err := json.NewDecoder(r.Body).Decode(&raw); err != nil {
			http.Error(w, "invalid json", http.StatusBadRequest)
			return
		}

		if err := svc.Update(string(raw)); err != nil {
			http.Error(w, "failed to update config", http.StatusInternalServerError)
			return
		}

		w.Header().Set("Content-Type", "application/json")
		w.Write([]byte(`{"ok":true}`))
	}
}
