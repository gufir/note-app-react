import React from "react";

function ActiveButton({ onClick }) {
  return (
    <button className="note-item__archive-button" onClick={onClick}>
      Catatan
    </button>
  );
}

export default ActiveButton;