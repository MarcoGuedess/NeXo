// src/pages/Home.jsx

import React, { useState } from 'react';
import CardObjetivos from '../components/cardobjetivos.jsx';
import CardAdicionar from '../components/cardadicionar.jsx';
import ModalObjetivos from '../components/modalobjetivos.jsx';
import { useObjetivos } from '../hooks/useObjetivos.jsx';

function Home() {
  const { objetivos, addCard, deleteCard, updateCard } = useObjetivos();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleSelectType = (type) => {
    addCard(type); // Adiciona no final (graças ao hook)
    handleCloseModal();
  };

  return (
    <div className="container">
      
      {/* Se a lista estiver VAZIA, o "Adicionar" aparece no topo. */}
      {objetivos.length === 0 && (
        <CardAdicionar onAddCard={handleOpenModal} />
      )}

      {/* A lista de cards de objetivo (Renderizada PRIMEIRO) */}
      {objetivos.map((objetivo) => (
        <CardObjetivos
          key={objetivo.id}
          objetivo={objetivo}
          onDelete={deleteCard}
          onUpdate={updateCard}
        />
      ))}

      {/* Se a lista NÃO ESTIVER VAZIA, o "Adicionar" aparece no FINAL. */}
      {objetivos.length > 0 && (
        <CardAdicionar onAddCard={handleOpenModal} />
      )}

      {/* O Modal */}
      <ModalObjetivos
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSelectType={handleSelectType}
      />
    </div>
  );
}

export default Home;