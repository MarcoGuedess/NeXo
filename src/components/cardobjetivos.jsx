import React from 'react';
import '../styles/cardobjetivos.css';

function CardObjetivos({ id, titulo= '' ,texto = '' }) {
  return (
    <div className="objetivos-container">
      <div className="card-objetivo" id={id}>
        <input className="input-titulo" defaultValue={titulo} />
        <textarea className="input-texto" defaultValue={texto} />
      </div>
    </div>
  );
}

export default CardObjetivos;