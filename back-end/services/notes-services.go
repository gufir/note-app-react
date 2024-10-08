package services

import (
	model "note-app/models"
	"note-app/repository"
)

type NoteService interface {
	Create(note *model.Note) error
	GetAll() ([]model.Note, error)
	GetByID(id uint) (model.Note, error)
	Update(note *model.Note) error
	Delete(id uint) error
}

type noteService struct {
	repo repository.NoteRepository
}

func NewNoteService(repo repository.NoteRepository) NoteService {
	return &noteService{repo}
}

func (s *noteService) Create(note *model.Note) error {
	return s.repo.Create(note)
}

func (s *noteService) GetAll() ([]model.Note, error) {
	return s.repo.FindAll()
}

func (s *noteService) GetByID(id uint) (model.Note, error) {
	return s.repo.FindByID(id)
}

func (s *noteService) Update(note *model.Note) error {
	return s.repo.Update(note)
}

func (s *noteService) Delete(id uint) error {
	return s.repo.Delete(id)
}
