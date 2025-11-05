// src/components/cardobjetivos.jsx
import React from 'react';

// Importar os novos componentes de card (que vamos criar)
import CardGenerico from './cardsespecificos/cardgenerico.jsx';
import CardPerdaPeso from './cardsespecificos/cardppeso.jsx'; // Nome do arquivo é 'cardppeso'
import CardFrequencia from './cardsespecificos/cardfrequencia.jsx';


function CardObjetivos({ objetivo, onDelete, onUpdate }) {
  
  // Passa todas as props para o componente filho
  const props = { objetivo, onDelete, onUpdate };

  // Decide qual componente renderizar com base no tipo
  switch (objetivo.type) {
    case 'PERDA_PESO':
      return <CardPerdaPeso {...props} />;
    
    // Por enquanto, vamos agrupar os 4 tipos quantitativos
    case 'PERDA_GORDURA':
    case 'GANHO_MASSA':
    case 'PROGRESSAO_CARGA':
      // Você pode criar componentes separados ou um
      // componente reutilizável 'CardQuantitativo'
      return <CardPerdaPeso {...props} />; // Reutilizando o de Perda de Peso

    case 'FREQUENCIA':
      return <CardFrequencia {...props} />;
    
    default:
      // Este é o seu card antigo
      return <CardGenerico {...props} />;
  }
}

export default CardObjetivos;