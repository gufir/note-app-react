import React from "react";

function DeleteButton({ onClick }) {
  return (
    <button className="note-item__delete-button" onClick={onClick}>
      Delete
    </button>
  );
}

export default DeleteButton;