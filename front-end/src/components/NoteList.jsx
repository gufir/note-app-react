import React from "react";
import NoteItem from "./NoteItem";

function NoteList({ notes, onDelete, onArchive, onActive }) {
    if (notes.length === 0) {
        return (
            <div className="note__list-empty">No notes found</div>
        );
    }

    return (
        <div className="notes-list">
          {
            notes.map((note) => (
              <NoteItem 
                key={note.id} 
                {...note} 
                onDelete={onDelete} 
                onArchive={onArchive} 
                onActive={onActive} 
              />
            ))
          }
        </div>
      );
}

export default NoteList;