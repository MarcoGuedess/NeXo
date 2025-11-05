// src/components/cards-especificos/CardGenerico.jsx
import React from 'react';
import './../../styles/cardobjetivos.css'; // Reutilize seu CSS antigo

function CardGenerico({ objetivo, onDelete, onUpdate }) {
  
  const handleSave = (e) => {
    // Lógica para salvar o título e texto...
    const novoTitulo = e.target.closest('.card-objetivo').querySelector('h3').innerText;
    const novoTexto = e.target.closest('.card-objetivo').querySelector('p').innerText;
    onUpdate(objetivo.id, { titulo: novoTitulo, texto: novoTexto });
  };

  return (
    <div className="card-objetivo" style={{ borderColor: '#ccc' }}>
      <h3 contentEditable onBlur={handleSave}>{objetivo.titulo}</h3>
      <p contentEditable onBlur={handleSave}>{objetivo.texto}</p>
      
      <div className="card-status">
        {/* Sua lógica de status... */}
      </div>

      <div className="card-actions">
        <button onClick={() => onDelete(objetivo.id)} className="delete-button">
          Excluir
        </button>
      </div>
    </div>
  );
}

export default CardGenerico;