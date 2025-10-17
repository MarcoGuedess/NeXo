import React from 'react';
import CardObjetivos from '../components/cardobjetivos';
import { useObjetivos } from '../hooks/useObjetivos';
import CardAdicionar from '../components/cardadicionar';

function Home() {
  const { objetivosCard, addCard } = useObjetivos([
    { id: 1, texto: 'Marco Bonitão' }
  ]);

  return (
    <>
      {objetivosCard.map(card => (
        <CardObjetivos
          key={card.id}
          id={card.id}
          texto={card.texto}
          onAdd={addCard}
        />
      ))}

    <CardAdicionar onAdd={addCard} />      

    </>
  );
}

export default Home;  