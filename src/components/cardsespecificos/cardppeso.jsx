// src/components/cards-especificos/CardPerdaPeso.jsx
import React, { useState } from 'react';
import './../../styles/cardobjetivos.css'; // Reutilize seu CSS
import './../../styles/CardEspecial.css'; // CSS novo para partes especiais

function CardPerdaPeso({ objetivo, onDelete, onUpdate }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [novoPeso, setNovoPeso] = useState('');

  // Lógica de cálculo de progresso
  const progressoAtual = (objetivo.valorInicial - objetivo.progresso[objetivo.progresso.length - 1]?.valor) || 0;
  const metaTotal = objetivo.valorInicial - objetivo.valorAlvo;
  const progressoPerc = metaTotal > 0 ? Math.round((progressoAtual / metaTotal) * 100) : 0;

  const handleAddProgresso = () => {
    if (novoPeso === '' || isNaN(parseFloat(novoPeso))) return;

    const novaEntrada = {
      data: new Date().toLocaleDateString('pt-BR'),
      valor: parseFloat(novoPeso),
    };

    // Atualiza o objetivo no hook pai
    onUpdate(objetivo.id, {
      progresso: [...objetivo.progresso, novaEntrada],
    });
    setNovoPeso('');
  };

  // Salvar mudanças no título, meta inicial, meta final, etc.
  const handleUpdateField = (field, value) => {
    onUpdate(objetivo.id, { [field]: value });
  };

  return (
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
                onChange={(e) => handleUpdateField('valorInicial', parseFloat(e.target.value))}
              /> {objetivo.unidade}
            </label>
            <label>
              Meta de Peso:
              <input 
                type="number" 
                value={objetivo.valorAlvo} 
                onChange={(e) => handleUpdateField('valorAlvo', parseFloat(e.target.value))}
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
            <ul>
              {objetivo.progresso.map((item, index) => (
                <li key={index}>
                  {item.data}: {item.valor} {objetivo.unidade}
                </li>
              )).reverse()} {/* .reverse() para mostrar o mais novo primeiro */}
            </ul>
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