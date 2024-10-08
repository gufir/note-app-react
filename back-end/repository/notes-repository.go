package repository

import (
	model "note-app/models"

	"gorm.io/gorm"
)

type NoteRepository interface {
	Create(note *model.Note) error
	FindAll() ([]model.Note, error)
	FindByID(id uint) (model.Note, error)
	Update(note *model.Note) error
	Delete(id uint) error
}

type noteRepository struct {
	db *gorm.DB
}

func NewNoteRepository(db *gorm.DB) NoteRepository {
	return &noteRepository{db}
}

func (r *noteRepository) Create(note *model.Note) error {
	return r.db.Create(note).Error
}

func (r *noteRepository) FindAll() ([]model.Note, error) {
	var notes []model.Note
	err := r.db.Find(&notes).Error
	return notes, err
}

func (r *noteRepository) FindByID(id uint) (model.Note, error) {
	var note model.Note
	err := r.db.First(&note, id).Error
	return note, err
}

func (r *noteRepository) Update(note *model.Note) error {
	return r.db.Save(note).Error
}

func (r *noteRepository) Delete(id uint) error {
	return r.db.Delete(&model.Note{}, id).Error
}
