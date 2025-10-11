import React from 'react';
import '../styles/cardadicionar.css';

function CardAdicionar({ id, texto = '+', onAdd }) {
  return (
    <div className="adicionar-container">
      <div className="card-adicionar" id={id} type="button" onClick={onAdd}>
        <h2>{texto}</h2>
      </div>
    </div>
  );
}

export default CardAdicionar;