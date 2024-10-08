package handler

import (
	"net/http"
	model "note-app/models"
	"note-app/services"
	"strconv"

	"github.com/labstack/echo/v4"
)

type NoteHandler struct {
	Service services.NoteService
}

func NewNoteHandler(service services.NoteService) *NoteHandler {
	return &NoteHandler{Service: service}
}

func (h *NoteHandler) Create(c echo.Context) error {
	var note model.Note

	if err := c.Bind(&note); err != nil {
		return c.JSON(http.StatusBadRequest, err.Error())
	}

	if err := h.Service.Create(&note); err != nil {
		return c.JSON(http.StatusInternalServerError, err.Error())
	}

	return c.JSON(http.StatusCreated, note)
}

func (h *NoteHandler) GetAll(c echo.Context) error {
	notes, err := h.Service.GetAll()

	if err != nil {
		return c.JSON(http.StatusInternalServerError, err.Error())
	}

	return c.JSON(http.StatusOK, notes)
}

func (h *NoteHandler) GetByID(c echo.Context) error {
	// Ambil ID dari parameter URL
	idStr := c.Param("id")

	// Parse ID ke tipe uint
	id, err := strconv.ParseUint(idStr, 10, 32)
	if err != nil {
		return c.JSON(http.StatusBadRequest, "Invalid ID")
	}

	// Gunakan ID yang sudah di-parse untuk mengambil note dari service
	note, err := h.Service.GetByID(uint(id))
	if err != nil {
		return c.JSON(http.StatusInternalServerError, err.Error())
	}

	// Jika data tidak ditemukan
	if note.ID == 0 {
		return c.JSON(http.StatusNotFound, "Note not found")
	}

	return c.JSON(http.StatusOK, note)
}

func (h *NoteHandler) Update(c echo.Context) error {
	idStr := c.Param("id")
	id, err := strconv.ParseUint(idStr, 10, 32)

	if err != nil {
		return c.JSON(http.StatusBadRequest, "Invalid ID")
	}

	var note model.Note

	if err := c.Bind(&note); err != nil {
		return c.JSON(http.StatusBadRequest, err.Error())
	}

	note.ID = uint(id)

	if err := h.Service.Update(&note); err != nil {
		return c.JSON(http.StatusInternalServerError, err.Error())
	}

	return c.JSON(http.StatusOK, note)

}

func (h *NoteHandler) Delete(c echo.Context) error {
	idStr := c.Param("id")
	id, err := strconv.ParseUint(idStr, 10, 32)

	if err != nil {
		return c.JSON(http.StatusBadRequest, "Invalid ID")
	}

	if err := h.Service.Delete(uint(id)); err != nil {
		return c.JSON(http.StatusInternalServerError, err.Error())
	}

	return c.NoContent(http.StatusNoContent)
}
