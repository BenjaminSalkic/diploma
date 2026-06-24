package handlers

import (
	"net/http"

	"diploma/backend/services"
)

func UploadFile(svc *services.UploadService) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		if err := r.ParseMultipartForm(10 << 20); err != nil {
			http.Error(w, "file too large", http.StatusBadRequest)
			return
		}

		file, header, err := r.FormFile("file")
		if err != nil {
			http.Error(w, "missing file", http.StatusBadRequest)
			return
		}
		defer file.Close()

		path, err := svc.Save(file, header)
		if err != nil {
			http.Error(w, "could not save file", http.StatusInternalServerError)
			return
		}

		writeJSON(w, http.StatusOK, map[string]string{"path": path})
	}
}
