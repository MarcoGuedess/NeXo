import React from 'react';
import '../styles/cardobjetivos.css';
import { useButton } from '../hooks/useButton';
import { useEdit } from '../hooks/useEdit';

function CardObjetivos({ id, titulo = '', texto = '', state = null }) {
  const { status, toggleOk, toggleAtrasado } = useButton(state);
  const {
    isEditing,
    titulo: currentTitulo,
    texto: currentTexto,
    startEditing,
    saveChanges,
    updateTitulo,
    updateTexto
  } = useEdit(titulo, texto);

  return (
    <div className="objetivos-container">
      <div
        className={`card-objetivo ${isEditing ? 'editing-mode' : ''}`}
        id={id}
        data-status={status}
      >
        <input
          className="input-titulo"
          value={currentTitulo}
          onChange={(e) => updateTitulo(e.target.value)}
          disabled={!isEditing}
        />
        <textarea
          className="input-texto"
          value={currentTexto}
          onChange={(e) => updateTexto(e.target.value)}
          disabled={!isEditing}
        />

        <div className="buttons-container">
          <button
            type="button"
            className={`button-edit ${isEditing ? 'editing' : ''}`}
            onClick={isEditing ? saveChanges : startEditing}
          >
            {isEditing ? '💾' : '✎'}
          </button>

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
    </div>
  );
}

export default CardObjetivos;