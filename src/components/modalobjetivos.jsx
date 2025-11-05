// src/components/GoalTypeModal.jsx
import React from 'react';
import Modal from 'react-modal';
import '../styles/modalobjetivos.css'; // Vamos criar este CSS

// Define o elemento raiz do seu app para acessibilidade
Modal.setAppElement('#root');

// Tipos de meta que o usuário pode escolher
const goalTypes = [
  { type: 'PERDA_PESO', label: 'Perda de Peso' },
  { type: 'PERDA_GORDURA', label: 'Perda de Gordura' },
  { type: 'GANHO_MASSA', label: 'Ganho de Massa Magra' },
  { type: 'PROGRESSAO_CARGA', label: 'Progressão de Carga' },
  { type: 'FREQUENCIA', label: 'Frequência Batida' },
];

function ModalObjetivos({ isOpen, onClose, onSelectType }) {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      className="modal-content"
      overlayClassName="modal-overlay"
    >
      <h2>Escolha o Tipo de Meta</h2>
      <div className="goal-type-list">
        {goalTypes.map((goal) => (
          <button
            key={goal.type}
            className="goal-type-button"
            onClick={() => onSelectType(goal.type)}
          >
            {goal.label}
          </button>
        ))}
      </div>
      <button className="modal-close-button" onClick={onClose}>
        Fechar
      </button>
    </Modal>
  );
}

export default ModalObjetivos;