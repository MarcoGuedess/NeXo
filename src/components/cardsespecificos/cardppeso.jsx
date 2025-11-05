// src/components/cardsespecificos/cardppeso.jsx

import React, { useState } from 'react';

/*
 *
 * CORREÇÃO DE ESTILO:
 * Importa os dois arquivos CSS com o caminho relativo correto (../../)
 *
*/
import '../../styles/cardobjetivos.css'; 
import '../../styles/cardespecial.css';

function CardPerdaPeso({ objetivo, onDelete, onUpdate }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [novoPeso, setNovoPeso] = useState(''); // Estado para o input de novo peso

  // Lógica de cálculo de progresso
  // Pega o último peso adicionado, ou o inicial se não houver progresso
  const pesoAtual = objetivo.progresso[objetivo.progresso.length - 1]?.valor || objetivo.valorInicial;
  
  // Quanto o usuário já perdeu
  const progressoTotalPerdido = objetivo.valorInicial > 0 ? (objetivo.valorInicial - pesoAtual) : 0;
  // Meta total a perder
  const metaTotal = objetivo.valorInicial > 0 ? (objetivo.valorInicial - objetivo.valorAlvo) : 0;
  
  // Calcula a porcentagem
  const progressoPerc = metaTotal > 0 ? Math.max(0, Math.min(100, Math.round((progressoTotalPerdido / metaTotal) * 100))) : 0;

  // Função para adicionar um novo registro de peso ao histórico
  const handleAddProgresso = () => {
    if (novoPeso === '' || isNaN(parseFloat(novoPeso))) return;

    const novaEntrada = {
      data: new Date().toLocaleDateString('pt-BR'),
      valor: parseFloat(novoPeso),
    };

    // Atualiza o objetivo no hook pai (Home.jsx)
    onUpdate(objetivo.id, {
      progresso: [...objetivo.progresso, novaEntrada],
    });
    setNovoPeso(''); // Limpa o input
  };

  // Função para salvar mudanças em campos editáveis (título, metas)
  const handleUpdateField = (field, value) => {
    onUpdate(objetivo.id, { [field]: value });
  };
  
  const handleUpdateFieldNumeric = (field, value) => {
     // Garante que o valor é numérico antes de atualizar
    const numValue = parseFloat(value);
    if (!isNaN(numValue)) {
      onUpdate(objetivo.id, { [field]: numValue });
    }
  };


  return (
    /*
     *
     * CORREÇÃO DE ESTILO:
     * A div principal precisa ter a classe "card-objetivo" (base)
     * e a classe "card-perda-peso" (específica).
     *
    */
    <div className="card-objetivo card-perda-peso">
      <div className="card-header">
        <h3 
          contentEditable 
          suppressContentEditableWarning 
          onBlur={(e) => handleUpdateField('titulo', e.target.innerText)}
        >
          {objetivo.titulo}
        </h3>
        {/* Botão de expandir (seta) */}
        <button className="expand-button" onClick={() => setIsExpanded(!isExpanded)}>
          {isExpanded ? '▼' : '►'}
        </button>
      </div>
      
      <div className="progresso-info">
        <span>Progresso: {progressoPerc}%</span>
        <div className="progress-bar-container">
          <div className="progress-bar" style={{ width: `${progressoPerc}%` }}></div>
        </div>
        <span className="progresso-texto">
          {pesoAtual} {objetivo.unidade} (Meta: {objetivo.valorAlvo} {objetivo.unidade})
        </span>
      </div>

      {/* Conteúdo Expansível */}
      {isExpanded && (
        <div className="expanded-content">
          <div className="meta-fields">
            <label>
              Peso Inicial:
              <input 
                type="number" 
                value={objetivo.valorInicial} 
                onChange={(e) => handleUpdateFieldNumeric('valorInicial', e.target.value)}
              /> {objetivo.unidade}
            </label>
            <label>
              Meta de Peso:
              <input 
                type="number" 
                value={objetivo.valorAlvo} 
                onChange={(e) => handleUpdateFieldNumeric('valorAlvo', e.target.value)}
              /> {objetivo.unidade}
            </label>
          </div>

          <hr />

          <div className="add-progresso">
            <input
              type="number"
              placeholder="Adicionar peso atual..."
              value={novoPeso}
              onChange={(e) => setNovoPeso(e.target.value)}
            />
            <button onClick={handleAddProgresso}>Adicionar</button>
          </div>
          
          <div className="historico">
            <h4>Histórico de Peso:</h4>
            {objetivo.progresso.length > 0 ? (
              <ul>
                {/* .slice() cria uma cópia antes de reverter, para não alterar o estado original */}
                {objetivo.progresso.slice().reverse().map((item, index) => (
                  <li key={index}>
                    {item.data}: {item.valor} {objetivo.unidade}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="historico-vazio">Nenhum registro adicionado.</p>
            )}
          </div>
        </div>
      )}

      <div className="card-actions">
        <button onClick={() => onDelete(objetivo.id)} className="delete-button">
          Excluir
        </button>
      </div>
    </div>
  );
}

export default CardPerdaPeso;