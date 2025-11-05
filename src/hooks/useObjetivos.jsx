// src/hooks/useObjetivos.jsx
import { useState } from 'react';

// Função para criar a estrutura inicial de cada tipo de card
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
        valorAlvo: 10, // Exemplo
        progresso: [], // Array de { data: 'dd/mm/aaaa', valor: X }
        subMetas: [], // Array de { id: 1, valor: 2, concluida: false }
      };
    case 'FREQUENCIA':
      return {
        ...baseData,
        frequenciaSemanal: 3, // Meta de 3x por semana
        diasMarcados: [], // Array de datas 'yyyy-mm-dd'
      };
    default:
      // Seu card genérico antigo como fallback
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

  // addCard agora recebe um TIPO
  const addCard = (type) => {
    const novoCard = getInitialCardData(type);
    setObjetivos((prevObjetivos) => [...prevObjetivos, novoCard]);
  };

  const deleteCard = (id) => {
    setObjetivos((prevObjetivos) =>
      prevObjetivos.filter((objetivo) => objetivo.id !== id)
    );
  };

  // Esta função será MUITO importante agora
  const updateCard = (id, updatedData) => {
    setObjetivos((prevObjetivos) =>
      prevObjetivos.map((objetivo) =>
        objetivo.id === id ? { ...objetivo, ...updatedData } : objetivo
      )
    );
  };

  return { objetivos, addCard, deleteCard, updateCard };
}