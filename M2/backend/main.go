package main

import (
	"log"
	"net/http"
	"os"

	"diploma/backend/db"
	"diploma/backend/handlers"
	"diploma/backend/middleware"
	"diploma/backend/services"
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

	authSvc := services.NewAuthService(database)
	pageConfigSvc := services.NewPageConfigService(database)
	projectSvc := services.NewProjectService(database)
	uploadSvc := services.NewUploadService("./uploads", "/uploads")

	mux := http.NewServeMux()

	// Public reads
	mux.HandleFunc("GET /api/health", handlers.Health)
	mux.HandleFunc("GET /api/page-config", handlers.GetPageConfig(pageConfigSvc))
	mux.HandleFunc("GET /api/projects", handlers.GetProjects(projectSvc))
	mux.Handle("/uploads/", http.StripPrefix("/uploads/", http.FileServer(http.Dir("./uploads"))))

	// Auth
	mux.HandleFunc("POST /api/auth/signup", handlers.Signup(authSvc))
	mux.HandleFunc("POST /api/auth/login", handlers.Login(authSvc))
	mux.Handle("GET /api/auth/me", middleware.RequireAuth(handlers.Me(authSvc)))

	// Protected mutations
	mux.Handle("PUT /api/page-config", middleware.RequireAuth(handlers.UpdatePageConfig(pageConfigSvc)))
	mux.Handle("POST /api/uploads", middleware.RequireAuth(handlers.UploadFile(uploadSvc)))
	mux.Handle("POST /api/projects", middleware.RequireAuth(handlers.CreateProject(projectSvc)))
	mux.Handle("PUT /api/projects/{id}", middleware.RequireAuth(handlers.UpdateProject(projectSvc)))
	mux.Handle("DELETE /api/projects/{id}", middleware.RequireAuth(handlers.DeleteProject(projectSvc)))
	mux.Handle("POST /api/projects/{id}/images", middleware.RequireAuth(handlers.AddProjectImage(projectSvc)))
	mux.Handle("DELETE /api/project-images/{id}", middleware.RequireAuth(handlers.DeleteProjectImage(projectSvc)))

	handler := middleware.Logger(mux)

	log.Printf("server listening on :%s", port)
	if err := http.ListenAndServe(":"+port, handler); err != nil {
		log.Fatalf("server error: %v", err)
	}
}
