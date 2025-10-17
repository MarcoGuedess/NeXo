import { useState } from 'react';


export function useObjetivos(initial = []) {
  const [objetivosCard, setObjetivosCard] = useState(initial);

  const addCard = (card = {}) => {
    const novoCard = {
      id: Date.now(), // id simples e único; troque por UUID se preferir
      titulo: card.titulo ?? "",
      texto: card.texto ?? "",
      ...card,
    };
    setObjetivosCard(prev => [...prev, novoCard]);
  };

  return { objetivosCard, addCard };
}