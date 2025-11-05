// src/components/cardadicionar.jsx
import React from 'react';

// Importa o CSS de modificação
import './../styles/cardadicionar.css';
// Não precisa importar cardobjetivos.css, o App.css já faz isso
// (ou o cardobjetivos.jsx já faz, e o estilo vaza globalmente)

function CardAdicionar({ onAddCard }) {
  return (
    /* *
     * CORREÇÃO CRÍTICA DE CSS:
     * 1. Usa "card-objetivo" para herdar o fundo, padding, e min-height.
     * 2. Usa "card-adicionar" para modificar a borda e centralizar o '+'.
    */
    <div 
      className="card-objetivo card-adicionar" 
      onClick={onAddCard}
    >
      <span className="plus-icon">+</span>
    </div>
  );
}

export default CardAdicionar;