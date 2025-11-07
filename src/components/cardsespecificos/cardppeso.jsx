// src/components/cardsespecificos/cardppeso.jsx
import React, { useState } from 'react';
import '../../styles/cardobjetivos.css';
import '../../styles/cardespecial.css';

function CardPerdaPeso({ objetivo, onDelete, onUpdate }) {
  // Estados para as duas views (mutuamente exclusivas)
  const [isDetailsOpen, setIsDetailsOpen] = useState(false); // Seta de baixo (Detalhes)
  const [isMetasViewOpen, setIsMetasViewOpen] = useState(false); // Seta lateral (Metas)

  const [novoPeso, setNovoPeso] = useState('');
  const [novaObservacao, setNovaObservacao] = useState('');

  // LÓGICA DE PROGESSO (Correta, 25%)
  const pesoAtual = objetivo.progresso.length > 0 
    ? objetivo.progresso[objetivo.progresso.length - 1].valor 
    : objetivo.valorInicial;
  
  const isPerda = objetivo.valorAlvo < objetivo.valorInicial;
  let progressoNumerador = 0;
  let progressoDenominador = 0;

  if (isPerda) {
    progressoNumerador = Math.max(0, objetivo.valorInicial - pesoAtual);
    progressoDenominador = Math.max(0, objetivo.valorInicial - objetivo.valorAlvo);
  } else {
    progressoNumerador = Math.max(0, pesoAtual - objetivo.valorInicial);
    progressoDenominador = Math.max(0, objetivo.valorAlvo - objetivo.valorInicial);
  }
  
  const progressoPerc = progressoDenominador > 0 
    ? Math.min(100, Math.round((progressoNumerador / progressoDenominador) * 100)) 
    : 0;

  // --- LÓGICA DE ADICIONAR PROGRESSO (COM CHECK DE SUB-METAS E REGRESSÃO) ---
  const handleAddProgresso = () => {
    if (novoPeso === '' || isNaN(parseFloat(novoPeso))) return;
    const novoValorPeso = parseFloat(novoPeso);
    const novaEntrada = {
      data: new Date().toLocaleDateString('pt-BR'),
      valor: novoValorPeso,
    };
    
    const isPerda = objetivo.valorAlvo < objetivo.valorInicial;
    
    const novasSubMetas = objetivo.subMetas.map(meta => {
      // Se já estava concluída, verifica se regrediu
      if (meta.concluida) {
        // Verifica se houve regressão
        const regrediu = isPerda 
          ? novoValorPeso > meta.valor  // Para perda: peso voltou a subir acima da meta
          : novoValorPeso < meta.valor; // Para ganho: peso caiu abaixo da meta
        
        if (regrediu) {
          return { ...meta, concluida: false, regredida: true };
        }
        return meta; // Mantém concluída
      }
      
      // Se não estava concluída, verifica se atingiu agora
      const atingiu = isPerda 
        ? novoValorPeso <= meta.valor 
        : novoValorPeso >= meta.valor;
      
      if (atingiu) {
        return { ...meta, concluida: true, regredida: false };
      }
      
      return { ...meta, regredida: false };
    });

    onUpdate(objetivo.id, {
      progresso: [...objetivo.progresso, novaEntrada],
      subMetas: novasSubMetas,
    });
    setNovoPeso('');
  };

  // --- LÓGICA PARA ADICIONAR OBSERVAÇÕES ---
  const handleAddObservacao = () => {
    if (novaObservacao.trim() === '') return;
    const novaNota = {
      data: new Date().toLocaleDateString('pt-BR'),
      texto: novaObservacao,
    };
    onUpdate(objetivo.id, {
      observacoes: [...(objetivo.observacoes || []), novaNota]
    });
    setNovaObservacao('');
  };

  // Apenas para o TÍTULO
  const handleUpdateTitulo = (e) => {
    onUpdate(objetivo.id, { titulo: e.target.innerText });
  };

  // --- MANIPULADORES DE VIEW (COM EXCLUSÃO MÚTUA) ---
  
  // Abre/Fecha a "View de Detalhes" (de baixo)
  const toggleDetailsView = () => {
    setIsDetailsOpen(!isDetailsOpen); // Alterna o estado de detalhes
    setIsMetasViewOpen(false); // Força o fechamento da view de metas
  };

  // Abre/Fecha a "View de Metas" (lateral)
  const toggleMetasView = () => {
    setIsMetasViewOpen(!isMetasViewOpen); // Alterna o estado de metas
    setIsDetailsOpen(false); // Força o fechamento da view de detalhes
  };


  return (
    // O .card-objetivo já tem position: relative (do cardobjetivos.css)
    <div className="card-objetivo card-perda-peso">
      
      {/* --- CABEÇALHO (Título e Botão de Excluir) --- */}
      <div className="card-header">
        <h3 
          contentEditable 
          suppressContentEditableWarning 
          onBlur={handleUpdateTitulo}
        >
          {objetivo.titulo}
        </h3>
        <button onClick={() => onDelete(objetivo.id)} className="delete-button-header">
          X
        </button>
      </div>

      {/* --- CONTEÚDO PRINCIPAL (Sempre visível) --- */}
      <div className="default-view-container">
        
        {/* Barra de Progresso */}
        <div className="progresso-info">
          <span>Progresso: {progressoPerc}%</span>
          <div className="progress-bar-container">
            <div className="progress-bar" style={{ width: `${progressoPerc}%` }}></div>
          </div>
        </div>
        
        {/* Campo "Porquê" */}
        <div className="porque-section">
          <h4>Meu "Porquê":</h4>
          <p>{objetivo.porque || "Nenhuma motivação definida."}</p>
        </div>
        
        {/* Campos de Meta (Inicial e Final) */}
        <div className="meta-fields-readonly stacked">
          <div className="meta-field">
            <span>Peso Inicial:</span>
            <span>{objetivo.valorInicial} {objetivo.unidade}</span>
          </div>
          <div className="meta-field final">
            <span>Meta de Peso:</span>
            <span>{objetivo.valorAlvo} {objetivo.unidade}</span>
          </div>
        </div>

        {/* Adicionar Progresso (Input) */}
        <div className="add-progresso">
          <input
            type="number"
            placeholder={`Adicionar ${isPerda ? 'peso' : 'carga'} atual...`}
            value={novoPeso}
            onChange={(e) => setNovoPeso(e.target.value)}
          />
          <button onClick={handleAddProgresso}>Atualizar</button>
        </div>

        {/* Botão de Expandir "Detalhes" (Seta de baixo) */}
        <button className="expand-details-button" onClick={toggleDetailsView}>
          <span className={`arrow ${isDetailsOpen ? 'down' : 'right'}`}>►</span>
          Detalhes (Histórico e Notas)
        </button>

        {/* --- CONTEÚDO EXPANSÍVEL (Detalhes) --- */}
        {/* Este é o painel que expande para BAIXO */}
        {isDetailsOpen && (
          <div className="expandable-view-container details-view-container">
            
            {/* Histórico de Peso */}
            <div className="historico">
              <h4>Histórico de Peso:</h4>
              {objetivo.progresso.length > 0 ? (
                <ul>
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

            {/* Seção de Observações */}
            <div className="observacoes-section">
              <h4>Observações:</h4>
              {(objetivo.observacoes || []).length > 0 ? (
                <ul className="obs-list">
                  {objetivo.observacoes.slice().reverse().map((item, index) => (
                    <li key={index} className="obs-item">
                      <strong>{item.data}:</strong> {item.texto}
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="historico-vazio">Nenhuma observação.</p>
              )}
              
              <div className="add-observacao">
                <textarea
                  placeholder="Adicionar observação..."
                  value={novaObservacao}
                  onChange={(e) => setNovaObservacao(e.target.value)}
                  rows="2"
                ></textarea>
                <button onClick={handleAddObservacao}>Salvar Nota</button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* --- BOTÃO DA SETA LATERAL (Posicionado absolutamente) --- */}
      <button className="expand-metas-button" onClick={toggleMetasView}>
        {isMetasViewOpen ? '‹' : '›'}
      </button>

      {/* --- SUBMENU "FLYOUT" DE METAS (Posicionado absolutamente) --- */}
      {/* Este é o painel que "flutua" à DIREITA */}
      {isMetasViewOpen && (
        <div className="metas-flyout-panel">
          <h4>Sub-Metas:</h4>
          <ul className="sub-metas-list">
            {objetivo.subMetas.map((meta) => (
              <li key={meta.id} className={`sub-meta-item ${meta.concluida ? 'concluida' : ''} ${meta.regredida ? 'regredida' : ''}`}>
                {meta.regredida ? '😢' : meta.concluida ? '✅' : '🎯'}
                <span>
                  {meta.valor} {objetivo.unidade}
                </span>
              </li>
            ))}
          </ul>
        </div>
      )}
      
    </div>
  );
}

export default CardPerdaPeso;