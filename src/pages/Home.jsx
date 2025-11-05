// src/pages/Home.jsx
import React, { useState } from 'react'; // Importar useState
import CardObjetivos from '../components/cardobjetivos';
import CardAdicionar from '../components/cardadicionar';
import { useObjetivos } from '../hooks/useObjetivos';
import ModalObjetivos from '../components/modalobjetivos';

function Home() {
  // Pegar todas as funções do hook
  const { objetivos, addCard, deleteCard, updateCard } = useObjetivos();
  
  // Estado para controlar o modal
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  // Função chamada pelo modal
  const handleSelectType = (type) => {
    addCard(type);       // Cria o card com o tipo certo
    setIsModalOpen(false); // Fecha o modal
  };

  return (
    <div className="container">
      {/* Passar a função de ABRIR o modal para o card de adicionar */}
      <CardAdicionar onAddCard={handleOpenModal} />

      {objetivos.map((objetivo) => (
        <CardObjetivos
          key={objetivo.id}
          objetivo={objetivo} // Passa o objeto inteiro
          onDelete={deleteCard}
          onUpdate={updateCard} // Passa a função de update
        />
      ))}

      {/* Renderiza o Modal (ele só aparece se isModalOpen for true) */}
      <ModalObjetivos
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSelectType={handleSelectType}
      />
    </div>
  );
}

export default Home;