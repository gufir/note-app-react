import React from "react";
import DeleteButton from "./DeleteButton";
import ArchieveButton from "./ArchieveButton";
import NoteItemBody from "./NoteItemBody";
import ActiveButton from "./ActiveButton";

function NoteItem({ id, title, createdAt, body, archived, onDelete, onArchive, onActive }) {
  return (
    <div className="note-item">
      <NoteItemBody title={title} createdAt={createdAt} body={body} /> 
      <div className="note__item-actions">
        <DeleteButton id={id} onDelete={onDelete} onClick={() => onDelete(id)} />
        {
          archived ?
          <ActiveButton onClick={() => onActive(id)} /> :
          <ArchieveButton onClick={() => onArchive(id)} />
        }
      </div>
    </div>
  );
}



export default NoteItem;