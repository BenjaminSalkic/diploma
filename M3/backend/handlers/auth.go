package handlers

import (
	"database/sql"
	"encoding/json"
	"net/http"
	"os"
	"strings"
	"time"

	"diploma/backend/middleware"
	"diploma/backend/models"

	"github.com/golang-jwt/jwt/v5"
	"golang.org/x/crypto/bcrypt"
)

func jwtSecret() []byte {
	s := os.Getenv("JWT_SECRET")
	if s == "" {
		s = "dev-insecure-change-me"
	}
	return []byte(s)
}

func writeJSON(w http.ResponseWriter, status int, body any) {
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(status)
	json.NewEncoder(w).Encode(body)
}

type credentials struct {
	Email    string `json:"email"`
	Password string `json:"password"`
}

func issueToken(userID int, email string) (string, error) {
	claims := jwt.MapClaims{
		"sub":   userID,
		"email": email,
		"exp":   time.Now().Add(7 * 24 * time.Hour).Unix(),
		"iat":   time.Now().Unix(),
	}
	t := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)
	return t.SignedString(jwtSecret())
}

func Signup(db *sql.DB) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		var c credentials
		if err := json.NewDecoder(r.Body).Decode(&c); err != nil {
			http.Error(w, "invalid json", http.StatusBadRequest)
			return
		}
		c.Email = strings.ToLower(strings.TrimSpace(c.Email))
		if c.Email == "" || len(c.Password) < 6 {
			http.Error(w, "email required and password must be 6+ chars", http.StatusBadRequest)
			return
		}

		hash, err := bcrypt.GenerateFromPassword([]byte(c.Password), bcrypt.DefaultCost)
		if err != nil {
			http.Error(w, "failed to hash password", http.StatusInternalServerError)
			return
		}

		res, err := db.Exec(
			`INSERT INTO users (email, password_hash, created_at) VALUES (?, ?, ?)`,
			c.Email, string(hash), time.Now().Unix(),
		)
		if err != nil {
			if strings.Contains(err.Error(), "UNIQUE") {
				http.Error(w, "email already registered", http.StatusConflict)
				return
			}
			http.Error(w, "failed to create user", http.StatusInternalServerError)
			return
		}

		id, _ := res.LastInsertId()
		token, err := issueToken(int(id), c.Email)
		if err != nil {
			http.Error(w, "failed to issue token", http.StatusInternalServerError)
			return
		}

		writeJSON(w, http.StatusCreated, map[string]any{
			"token": token,
			"user":  models.User{ID: int(id), Email: c.Email, CreatedAt: time.Now().Unix()},
		})
	}
}

func Login(db *sql.DB) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		var c credentials
		if err := json.NewDecoder(r.Body).Decode(&c); err != nil {
			http.Error(w, "invalid json", http.StatusBadRequest)
			return
		}
		c.Email = strings.ToLower(strings.TrimSpace(c.Email))

		var (
			id        int
			hash      string
			createdAt int64
		)
		err := db.QueryRow(
			`SELECT id, password_hash, created_at FROM users WHERE email = ?`,
			c.Email,
		).Scan(&id, &hash, &createdAt)
		if err == sql.ErrNoRows {
			http.Error(w, "invalid email or password", http.StatusUnauthorized)
			return
		}
		if err != nil {
			http.Error(w, "lookup failed", http.StatusInternalServerError)
			return
		}

		if err := bcrypt.CompareHashAndPassword([]byte(hash), []byte(c.Password)); err != nil {
			http.Error(w, "invalid email or password", http.StatusUnauthorized)
			return
		}

		token, err := issueToken(id, c.Email)
		if err != nil {
			http.Error(w, "failed to issue token", http.StatusInternalServerError)
			return
		}

		writeJSON(w, http.StatusOK, map[string]any{
			"token": token,
			"user":  models.User{ID: id, Email: c.Email, CreatedAt: createdAt},
		})
	}
}

func Me(db *sql.DB) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		uid, ok := middleware.UserID(r.Context())
		if !ok {
			http.Error(w, "unauthorized", http.StatusUnauthorized)
			return
		}

		var (
			email     string
			createdAt int64
		)
		err := db.QueryRow(
			`SELECT email, created_at FROM users WHERE id = ?`,
			uid,
		).Scan(&email, &createdAt)
		if err != nil {
			http.Error(w, "user not found", http.StatusNotFound)
			return
		}

		writeJSON(w, http.StatusOK, models.User{ID: uid, Email: email, CreatedAt: createdAt})
	}
}
