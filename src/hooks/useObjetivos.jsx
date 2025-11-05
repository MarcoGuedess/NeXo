// src/hooks/useObjetivos.jsx

import { useState } from 'react';

// A função getInitialCardData continua a mesma...
const getInitialCardData = (type) => {
  const baseData = {
    id: Date.now(),
    type: type,
    titulo: `Novo Objetivo: ${type.replace('_', ' ')}`,
    status: 'Em Andamento',
  };

  switch (type) {
    case 'PERDA_PESO':
    case 'PERDA_GORDURA':
    case 'GANHO_MASSA':
    case 'PROGRESSAO_CARGA':
      return {
        ...baseData,
        unidade: type === 'PROGRESSAO_CARGA' ? 'kg (carga)' : 'kg (corporal)',
        valorInicial: 0,
        valorAlvo: 10,
        progresso: [], 
        subMetas: [], 
      };
    case 'FREQUENCIA':
      return {
        ...baseData,
        frequenciaSemanal: 3,
        diasMarcados: [],
      };
    default:
      return {
        ...baseData,
        type: 'GENERICO',
        titulo: 'Novo Objetivo',
        texto: 'Escreva seu objetivo aqui...',
      };
  }
};

export function useObjetivos() {
  const [objetivos, setObjetivos] = useState([]);

  //
  // CORREÇÃO DA LÓGICA:
  // Adiciona o novo card ao FINAL da lista.
  //
  const addCard = (type) => {
    const novoCard = getInitialCardData(type);
    setObjetivos((prevObjetivos) => [...prevObjetivos, novoCard]);
  };

  const deleteCard = (id) => {
    setObjetivos((prevObjetivos) =>
      prevObjetivos.filter((objetivo) => objetivo.id !== id)
    );
  };

  const updateCard = (id, updatedData) => {
    setObjetivos((prevObjetivos) =>
      prevObjetivos.map((objetivo) =>
        objetivo.id === id ? { ...objetivo, ...updatedData } : objetivo
      )
    );
  };

  return { objetivos, addCard, deleteCard, updateCard };
}