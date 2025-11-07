// src/hooks/useObjetivos.jsx
import { useState } from 'react';

// FUNÇÃO AUXILIAR ATUALIZADA: Gera 4 metas de 25%
const gerarSubMetas = (inicial, alvo) => {
  const inicialNum = parseFloat(inicial);
  const alvoNum = parseFloat(alvo);
  
  const metaTotal = alvoNum - inicialNum; // Pode ser positivo (ganho) ou negativo (perda)
  
  // Arredonda para 2 casas decimais
  const arredondar = (num) => Math.round(num * 100) / 100;

  if (metaTotal === 0) return [];

  return [
    { id: 1, valor: arredondar(inicialNum + metaTotal * 0.25), concluida: false, regredida: false },
    { id: 2, valor: arredondar(inicialNum + metaTotal * 0.50), concluida: false, regredida: false },
    { id: 3, valor: arredondar(inicialNum + metaTotal * 0.75), concluida: false, regredida: false },
    { id: 4, valor: arredondar(alvoNum), concluida: false, regredida: false }, // A meta final
  ];
};

export function useObjetivos() {
  const [objetivos, setObjetivos] = useState([]);

  const addCard = (cardData) => {
    // cardData = { type, titulo, valorInicial, valorAlvo, porque }
    
    let subMetas = [];
    let unidade = '';

    const { type, valorInicial, valorAlvo } = cardData;

    // Gera sub-metas apenas para os tipos quantitativos
    switch (type) {
      case 'PERDA_PESO':
      case 'PERDA_GORDURA':
        unidade = 'kg (corporal)';
        subMetas = gerarSubMetas(valorInicial, valorAlvo);
        break;
      case 'GANHO_MASSA':
        unidade = 'kg (corporal)';
        subMetas = gerarSubMetas(valorInicial, valorAlvo);
        break;
      case 'PROGRESSAO_CARGA':
        unidade = 'kg (carga)';
        subMetas = gerarSubMetas(valorInicial, valorAlvo);
        break;
      default:
        break;
    }

    const novoCard = {
      id: Date.now(),
      status: 'Em Andamento',
      progresso: [],
      observacoes: [], // Array para observações
      ...cardData, // Inclui type, titulo, valorInicial, valorAlvo, porque
      unidade: unidade,
      subMetas: subMetas,
    };
    
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