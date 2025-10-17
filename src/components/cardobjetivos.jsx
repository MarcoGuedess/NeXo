import React from 'react';
import '../styles/cardobjetivos.css';
import { useButton } from '../hooks/useButton';

function CardObjetivos({ id, titulo = '', texto = '', state = null }) {
  const { status, toggleOk, toggleAtrasado } = useButton(state);

  return (
    <div className="objetivos-container">
      <div
        className="card-objetivo"
        id={id}
        data-status={status} // adiciona o status como data-attribute
      >
        <input className="input-titulo" defaultValue={titulo} />
        <textarea className="input-texto" defaultValue={texto} />
        <button
          type="button"
          className={`button-ok ${status === 'ok' ? 'active' : ''}`}
          aria-pressed={status === 'ok'}
          onClick={toggleOk}
        >
          ✓
        </button>
        <button
          type="button"
          className={`button-atrasado ${status === 'atrasado' ? 'active' : ''}`}
          aria-pressed={status === 'atrasado'}
          onClick={toggleAtrasado}
        >
          X
        </button>
      </div>
    </div>
  );
}

export default CardObjetivos;