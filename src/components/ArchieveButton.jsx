import React from "react";

function ArchieveButton({ onClick }) {
  return (
    <button className="note-item__archive-button" onClick={onClick}>
      Archive
    </button>
  );
}

export default ArchieveButton;