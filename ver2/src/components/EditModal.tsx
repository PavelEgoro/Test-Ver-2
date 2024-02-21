import React, { useState } from 'react';
import './Modal.css'

interface EditModalProps {
  initialName: string;
  onSave: (newName: string) => void;
  onClose: () => void;
}

const EditModal: React.FC<EditModalProps> = ({ initialName, onSave, onClose }) => {
  const [name, setName] = useState(initialName);

  return (
    <div className="modalBackdrop">
    <div className="modalContent">
    <div className="inputGroup"> 
      <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
    </div>
    <div className="buttonsGroup">
      <button className="modalButton" onClick={() => onSave(name)}>Save</button>
      <button className="modalButton" onClick={onClose}>Close</button>
    </div>
    </div>
    </div>
  );
};

export default EditModal;
