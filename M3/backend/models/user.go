package models

type User struct {
	ID        int    `json:"id"`
	Email     string `json:"email"`
	CreatedAt int64  `json:"created_at"`
}
