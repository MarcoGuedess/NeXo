// src/hooks/useObjetivos.jsx
import { useState } from 'react';

// FUNÇÃO AUXILIAR (Metas 25%) - Sem mudança
const gerarSubMetas = (inicial, alvo) => {
  const inicialNum = parseFloat(inicial);
  const alvoNum = parseFloat(alvo);
  const metaTotal = alvoNum - inicialNum;
  const arredondar = (num) => Math.round(num * 100) / 100;
  if (metaTotal === 0) return [];
  return [
    { id: 1, valor: arredondar(inicialNum + metaTotal * 0.25), concluida: false },
    { id: 2, valor: arredondar(inicialNum + metaTotal * 0.50), concluida: false },
    { id: 3, valor: arredondar(inicialNum + metaTotal * 0.75), concluida: false },
    { id: 4, valor: arredondar(alvoNum), concluida: false },
  ];
};

export function useObjetivos() {
  const [objetivos, setObjetivos] = useState([]);

  // --- FUNÇÃO addCard (COM A CORREÇÃO) ---
  const addCard = (cardData) => {
    // cardData = { type, titulo, valorInicial, valorAlvo, porque, tipoDeMeta, valorDaMeta }
    
    let dadosExtras = {}; // Um objeto para dados específicos do tipo
    const { type, valorInicial, valorAlvo } = cardData;

    // Gera dados extras baseado no tipo
    switch (type) {
      case 'PERDA_PESO':
      case 'PERDA_GORDURA':
        dadosExtras = {
          unidade: 'kg (corporal)',
          subMetas: gerarSubMetas(valorInicial, valorAlvo),
        };
        break;
      case 'GANHO_MASSA':
      case 'PROGRESSAO_CARGA':
        dadosExtras = {
          unidade: 'kg (carga)',
          subMetas: gerarSubMetas(valorInicial, valorAlvo),
        };
        break;
      
      case 'FREQUENCIA':
        dadosExtras = {
          /* * =============================================================
           * A CORREÇÃO DO BUG ESTÁ AQUI
           * =============================================================
           * Antigo (ERRADO): diasMarcados: [],
           * Novo (CORRETO):  diasMarcados: {}, (Um objeto)
          */
          diasMarcados: {}, 
          tipoDeMeta: cardData.tipoDeMeta || 'semanal', 
          valorDaMeta: cardData.valorDaMeta || 3,
          subMetas: [], 
        };
        break;
      
      default:
        dadosExtras = { subMetas: [] };
        break;
    }

    const novoCard = {
      id: Date.now(),
      status: 'Em Andamento',
      progresso: [],
      observacoes: [],
      ...cardData, 
      ...dadosExtras, 
    };
    
    setObjetivos((prevObjetivos) => [...prevObjetivos, novoCard]);
  };

  // --- Funções deleteCard e updateCard (Sem mudança) ---
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