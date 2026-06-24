package services

import (
	"database/sql"
	"errors"
	"os"
	"strings"
	"time"

	"diploma/backend/models"

	"github.com/golang-jwt/jwt/v5"
	"golang.org/x/crypto/bcrypt"
)

var (
	ErrInvalidInput    = errors.New("invalid input")
	ErrEmailRegistered = errors.New("email already registered")
	ErrInvalidCreds    = errors.New("invalid email or password")
	ErrUserNotFound    = errors.New("user not found")
)

type AuthService struct {
	db        *sql.DB
	tokenTTL  time.Duration
	jwtSecret []byte
}

func NewAuthService(db *sql.DB) *AuthService {
	secret := os.Getenv("JWT_SECRET")
	if secret == "" {
		secret = "dev-insecure-change-me"
	}
	return &AuthService{
		db:        db,
		tokenTTL:  7 * 24 * time.Hour,
		jwtSecret: []byte(secret),
	}
}

func (s *AuthService) Signup(email, password string) (models.User, string, error) {
	email = strings.ToLower(strings.TrimSpace(email))
	if email == "" || len(password) < 6 {
		return models.User{}, "", ErrInvalidInput
	}

	hash, err := bcrypt.GenerateFromPassword([]byte(password), bcrypt.DefaultCost)
	if err != nil {
		return models.User{}, "", err
	}

	createdAt := time.Now().Unix()
	res, err := s.db.Exec(
		`INSERT INTO users (email, password_hash, created_at) VALUES (?, ?, ?)`,
		email, string(hash), createdAt,
	)
	if err != nil {
		if strings.Contains(err.Error(), "UNIQUE") {
			return models.User{}, "", ErrEmailRegistered
		}
		return models.User{}, "", err
	}

	id, _ := res.LastInsertId()
	user := models.User{ID: int(id), Email: email, CreatedAt: createdAt}
	token, err := s.issueToken(user.ID, user.Email)
	if err != nil {
		return models.User{}, "", err
	}
	return user, token, nil
}

func (s *AuthService) Login(email, password string) (models.User, string, error) {
	email = strings.ToLower(strings.TrimSpace(email))

	var (
		id        int
		hash      string
		createdAt int64
	)
	err := s.db.QueryRow(
		`SELECT id, password_hash, created_at FROM users WHERE email = ?`,
		email,
	).Scan(&id, &hash, &createdAt)
	if err == sql.ErrNoRows {
		return models.User{}, "", ErrInvalidCreds
	}
	if err != nil {
		return models.User{}, "", err
	}

	if err := bcrypt.CompareHashAndPassword([]byte(hash), []byte(password)); err != nil {
		return models.User{}, "", ErrInvalidCreds
	}

	user := models.User{ID: id, Email: email, CreatedAt: createdAt}
	token, err := s.issueToken(user.ID, user.Email)
	if err != nil {
		return models.User{}, "", err
	}
	return user, token, nil
}

func (s *AuthService) GetByID(id int) (models.User, error) {
	var (
		email     string
		createdAt int64
	)
	err := s.db.QueryRow(
		`SELECT email, created_at FROM users WHERE id = ?`,
		id,
	).Scan(&email, &createdAt)
	if err == sql.ErrNoRows {
		return models.User{}, ErrUserNotFound
	}
	if err != nil {
		return models.User{}, err
	}
	return models.User{ID: id, Email: email, CreatedAt: createdAt}, nil
}

func (s *AuthService) issueToken(userID int, email string) (string, error) {
	claims := jwt.MapClaims{
		"sub":   userID,
		"email": email,
		"exp":   time.Now().Add(s.tokenTTL).Unix(),
		"iat":   time.Now().Unix(),
	}
	t := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)
	return t.SignedString(s.jwtSecret)
}
