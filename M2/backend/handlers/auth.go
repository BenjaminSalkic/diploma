package handlers

import (
	"encoding/json"
	"errors"
	"net/http"

	"diploma/backend/middleware"
	"diploma/backend/services"
)

func writeJSON(w http.ResponseWriter, status int, body any) {
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(status)
	json.NewEncoder(w).Encode(body)
}

type credentials struct {
	Email    string `json:"email"`
	Password string `json:"password"`
}

func Signup(auth *services.AuthService) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		var c credentials
		if err := json.NewDecoder(r.Body).Decode(&c); err != nil {
			http.Error(w, "invalid json", http.StatusBadRequest)
			return
		}

		user, token, err := auth.Signup(c.Email, c.Password)
		switch {
		case errors.Is(err, services.ErrInvalidInput):
			http.Error(w, "email required and password must be 6+ chars", http.StatusBadRequest)
			return
		case errors.Is(err, services.ErrEmailRegistered):
			http.Error(w, "email already registered", http.StatusConflict)
			return
		case err != nil:
			http.Error(w, "failed to create user", http.StatusInternalServerError)
			return
		}

		writeJSON(w, http.StatusCreated, map[string]any{
			"token": token,
			"user":  user,
		})
	}
}

func Login(auth *services.AuthService) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		var c credentials
		if err := json.NewDecoder(r.Body).Decode(&c); err != nil {
			http.Error(w, "invalid json", http.StatusBadRequest)
			return
		}

		user, token, err := auth.Login(c.Email, c.Password)
		switch {
		case errors.Is(err, services.ErrInvalidCreds):
			http.Error(w, "invalid email or password", http.StatusUnauthorized)
			return
		case err != nil:
			http.Error(w, "lookup failed", http.StatusInternalServerError)
			return
		}

		writeJSON(w, http.StatusOK, map[string]any{
			"token": token,
			"user":  user,
		})
	}
}

func Me(auth *services.AuthService) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		uid, ok := middleware.UserID(r.Context())
		if !ok {
			http.Error(w, "unauthorized", http.StatusUnauthorized)
			return
		}

		user, err := auth.GetByID(uid)
		if errors.Is(err, services.ErrUserNotFound) {
			http.Error(w, "user not found", http.StatusNotFound)
			return
		}
		if err != nil {
			http.Error(w, "lookup failed", http.StatusInternalServerError)
			return
		}
		writeJSON(w, http.StatusOK, user)
	}
}
