// src/components/cardsespecificos/cardgenerico.jsx

import React from 'react';

/*
 *
 * CORREÇÃO DE ESTILO:
 * Importa o CSS base do card com o caminho relativo correto (../../)
 *
*/
import '../../styles/cardobjetivos.css';
// Opcional: pode importar o cardespecial.css se quiser usar algum estilo dele
// import '../../styles/cardespecial.css'; 

// Recebe as mesmas props que os outros cards
function CardGenerico({ objetivo, onDelete, onUpdate }) {
  
  // Função para salvar o conteúdo editável quando o usuário sai do campo
  const handleSave = (e) => {
    // Pega o elemento 'card-objetivo' mais próximo
    const cardElement = e.target.closest('.card-objetivo');
    if (!cardElement) return;

    // Pega o conteúdo do h3 e do p
    const novoTitulo = cardElement.querySelector('h3').innerText;
    const novoTexto = cardElement.querySelector('p').innerText;

    // Atualiza o card no hook pai (Home.jsx)
    onUpdate(objetivo.id, { 
      titulo: novoTitulo, 
      texto: novoTexto 
    });
  };

  return (
    /*
     *
     * CORREÇÃO DE ESTILO:
     * A div principal precisa ter a classe "card-objetivo"
     * para herdar todo o estilo que você já tinha feito.
     *
    */
    <div className="card-objetivo" style={{ borderColor: '#ccc' }}>
      
      <h3 
        contentEditable 
        suppressContentEditableWarning
        onBlur={handleSave} // Salva ao perder o foco
      >
        {objetivo.titulo}
      </h3>
      
      <p 
        contentEditable 
        suppressContentEditableWarning
        onBlur={handleSave} // Salva ao perder o foco
      >
        {objetivo.texto}
      </p>
      
      {/* Você pode re-adicionar seu seletor de status aqui se quiser */}
      <div className="card-status">
        {/* <select ... > ... </select> */}
      </div>

      <div className="card-actions">
        <button onClick={() => onDelete(objetivo.id)} className="delete-button">
          Excluir
        </button>
      </div>
    </div>
  );
}

export default CardGenerico;