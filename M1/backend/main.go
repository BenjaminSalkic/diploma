package main

import (
	"log"
	"net/http"
	"os"

	"diploma/backend/db"
	"diploma/backend/handlers"
	"diploma/backend/middleware"
)

func main() {
	port := os.Getenv("PORT")
	if port == "" {
		port = "8080"
	}

	dbPath := os.Getenv("DB_PATH")
	if dbPath == "" {
		dbPath = "./data.db"
	}

	database, err := db.Connect(dbPath)
	if err != nil {
		log.Fatalf("failed to connect to database: %v", err)
	}
	defer database.Close()

	if err := db.Init(database); err != nil {
		log.Fatalf("failed to initialize database: %v", err)
	}

	mux := http.NewServeMux()

	// Public reads
	mux.HandleFunc("GET /api/health", handlers.Health)
	mux.HandleFunc("GET /api/page-config", handlers.GetPageConfig(database))
	mux.HandleFunc("GET /api/projects", handlers.GetProjects(database))
	mux.Handle("/uploads/", http.StripPrefix("/uploads/", http.FileServer(http.Dir("./uploads"))))

	// Auth
	mux.HandleFunc("POST /api/auth/signup", handlers.Signup(database))
	mux.HandleFunc("POST /api/auth/login", handlers.Login(database))
	mux.Handle("GET /api/auth/me", middleware.RequireAuth(handlers.Me(database)))

	// Protected mutations
	mux.Handle("PUT /api/page-config", middleware.RequireAuth(handlers.UpdatePageConfig(database)))
	mux.Handle("POST /api/uploads", middleware.RequireAuth(http.HandlerFunc(handlers.UploadFile)))
	mux.Handle("POST /api/projects", middleware.RequireAuth(handlers.CreateProject(database)))
	mux.Handle("PUT /api/projects/{id}", middleware.RequireAuth(handlers.UpdateProject(database)))
	mux.Handle("DELETE /api/projects/{id}", middleware.RequireAuth(handlers.DeleteProject(database)))
	mux.Handle("POST /api/projects/{id}/images", middleware.RequireAuth(handlers.AddProjectImage(database)))
	mux.Handle("DELETE /api/project-images/{id}", middleware.RequireAuth(handlers.DeleteProjectImage(database)))

	handler := middleware.CORS(middleware.Logger(mux))

	log.Printf("server listening on :%s", port)
	if err := http.ListenAndServe(":"+port, handler); err != nil {
		log.Fatalf("server error: %v", err)
	}
}
