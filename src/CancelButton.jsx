// src/CancelButton.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from 'react-bootstrap';

function CancelButton() {
  const navigate = useNavigate();

  const handleCancel = () => {
    navigate('/home');
  };

  return (
    <div style={{ textAlign: 'right', padding: '10px 20px' }}>
      <Button variant="secondary" onClick={handleCancel}>
        Cancel
      </Button>
    </div>
  );
}

export default CancelButton;
