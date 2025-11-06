// src/pages/Home.jsx
import React, { useState } from 'react';
import CardObjetivos from '../components/cardobjetivos.jsx';
import CardAdicionar from '../components/cardadicionar.jsx';
import ModalObjetivos from '../components/modalobjetivos.jsx';
import { useObjetivos } from '../hooks/useObjetivos.jsx';

function Home() {
  const { objetivos, addCard, deleteCard, updateCard } = useObjetivos();
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  // 1. ESTA FUNÇÃO (handleCreateCard) É CHAMADA PELO MODAL
  const handleCreateCard = (cardData) => {
    addCard(cardData); // Adiciona o card
    handleCloseModal(); // Fecha o modal
  };

  return (
    <div className="container">
      {/* Lógica de posição (sem mudança) */}
      {objetivos.length === 0 && (
        <CardAdicionar onAddCard={handleOpenModal} />
      )}

      {objetivos.map((objetivo) => (
        <CardObjetivos
          key={objetivo.id}
          objetivo={objetivo}
          onDelete={deleteCard}
          onUpdate={updateCard}
        />
      ))}

      {objetivos.length > 0 && (
        <CardAdicionar onAddCard={handleOpenModal} />
      )}

      {/* * =============================================================
        * A CORREÇÃO CRÍTICA DO BOTÃO ESTÁ AQUI
        * =============================================================
        *
        * Estávamos passando a prop 'onSelectType' (antiga).
        * Agora passamos a prop 'onCreateCard' (correta).
      */}
      <ModalObjetivos
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onCreateCard={handleCreateCard} 
      />
    </div>
  );
}

export default Home;