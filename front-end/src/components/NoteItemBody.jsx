import React from "react";
// import { showFormattedDate } from "../utils";


function NoteItemBody({ title, createdAt, body }) {
  return (
    <div className="note-item__content">
    <h3 className="note-item__title">{ title }</h3>
    <time className="note-item_date" dateTime={createdAt}>{ createdAt }</time>
    <p className="note-item__body">{ body }</p>
    </div>
  );
}

export default NoteItemBody;