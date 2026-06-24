package services

import (
	"fmt"
	"io"
	"mime/multipart"
	"os"
	"path/filepath"
	"time"
)

type UploadService struct {
	dir       string
	publicURL string
}

func NewUploadService(dir, publicURL string) *UploadService {
	return &UploadService{dir: dir, publicURL: publicURL}
}

// Save copies the multipart file to disk under a timestamped filename and
// returns the public URL path (e.g. "/uploads/172...png") suitable for
// embedding in stored content.
func (s *UploadService) Save(file multipart.File, header *multipart.FileHeader) (string, error) {
	if err := os.MkdirAll(s.dir, 0755); err != nil {
		return "", err
	}

	ext := filepath.Ext(header.Filename)
	filename := fmt.Sprintf("%d%s", time.Now().UnixNano(), ext)
	dest := filepath.Join(s.dir, filename)

	out, err := os.Create(dest)
	if err != nil {
		return "", err
	}
	defer out.Close()

	if _, err := io.Copy(out, file); err != nil {
		return "", err
	}
	return s.publicURL + "/" + filename, nil
}
