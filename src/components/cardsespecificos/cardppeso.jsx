// src/components/cardsespecificos/cardppeso.jsx
import React, { useState } from 'react';
import '../../styles/cardobjetivos.css';
import '../../styles/cardespecial.css';
// Importa o hook de notificações
import { useNotifications } from '../../hooks/useNotifications'; 

function CardPerdaPeso({ objetivo, onDelete, onUpdate }) {
  // Hooks de Notificação
  const { notifySuccess, notifyError } = useNotifications();

  // Estados de View (Exclusão Mútua)
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [isMetasViewOpen, setIsMetasViewOpen] = useState(false);

  const [novoPeso, setNovoPeso] = useState('');
  const [novaObservacao, setNovaObservacao] = useState('');

  // --- LÓGICA DE CÁLCULO (Porcentagem) ---
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

  // --- LÓGICA DE ATUALIZAR PESO (Com Notificações) ---
  const handleAddProgresso = () => {
    if (novoPeso === '' || isNaN(parseFloat(novoPeso))) return;
    const novoValorPeso = parseFloat(novoPeso);
    const novaEntrada = {
      data: new Date().toLocaleDateString('pt-BR'),
      valor: novoValorPeso,
    };
    
    const novasSubMetas = objetivo.subMetas.map(meta => {
      const metaAntiga = meta; // Estado anterior
      // Mantém o histórico se já foi atingida alguma vez
      let foiAtingida = metaAntiga.foiAtingidaAlgumaVez || false;
      
      const isPerda = objetivo.valorAlvo < objetivo.valorInicial;
      let agoraEstaAtingida = false;
      
      // Verifica se atingiu a meta AGORA
      if (isPerda && novoValorPeso <= meta.valor) {
        agoraEstaAtingida = true;
      }
      if (!isPerda && novoValorPeso >= meta.valor) {
        agoraEstaAtingida = true;
      }

      // Lógica de Notificação (Toast)
      if (agoraEstaAtingida) {
        foiAtingida = true; // Marca histórico
        if (!metaAntiga.concluida) {
          // Se não estava concluída e agora está: Sucesso!
          notifySuccess(`Meta de ${meta.valor}kg atingida! 🎉`);
        }
      } else if (metaAntiga.concluida) {
        // Se estava concluída e agora NÃO está mais: Regressão.
        notifyError(`Você saiu da faixa de ${meta.valor}kg... Foco! 😢`);
      }

      return { 
        ...meta, 
        concluida: agoraEstaAtingida, 
        foiAtingidaAlgumaVez: foiAtingida 
      };
    });

    onUpdate(objetivo.id, {
      progresso: [...objetivo.progresso, novaEntrada],
      subMetas: novasSubMetas,
    });
    setNovoPeso('');
  };

  // --- LÓGICA DE OBSERVAÇÕES ---
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

  const handleUpdateTitulo = (e) => {
    onUpdate(objetivo.id, { titulo: e.target.innerText });
  };

  // --- TOGGLES ---
  const toggleDetailsView = () => {
    setIsDetailsOpen(!isDetailsOpen);
    setIsMetasViewOpen(false);
  };
  const toggleMetasView = () => {
    setIsMetasViewOpen(!isMetasViewOpen);
    setIsDetailsOpen(false);
  };

  return (
    <div className="card-objetivo card-perda-peso">
      
      <div className="card-header">
        <h3 contentEditable suppressContentEditableWarning onBlur={handleUpdateTitulo}>
          {objetivo.titulo}
        </h3>
        <button onClick={() => onDelete(objetivo.id)} className="delete-button-header">X</button>
      </div>

      <div className="default-view-container">
        <div className="progresso-info">
          <span>Progresso: {progressoPerc}%</span>
          <div className="progress-bar-container">
            <div className="progress-bar" style={{ width: `${progressoPerc}%` }}></div>
          </div>
        </div>
        
        <div className="porque-section">
          <h4>Meu "Porquê":</h4>
          <p>{objetivo.porque || "Nenhuma motivação definida."}</p>
        </div>
        
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

        <div className="add-progresso">
          <input
            type="number"
            placeholder={`Adicionar ${isPerda ? 'peso' : 'carga'} atual...`}
            value={novoPeso}
            onChange={(e) => setNovoPeso(e.target.value)}
          />
          <button onClick={handleAddProgresso}>Atualizar</button>
        </div>

        <button className="expand-details-button" onClick={toggleDetailsView}>
          <span className={`arrow ${isDetailsOpen ? 'down' : 'right'}`}>►</span>
          Detalhes (Histórico e Notas)
        </button>

        {isDetailsOpen && (
          <div className="expandable-view-container details-view-container">
            <div className="historico">
              <h4>Histórico de Peso:</h4>
              {objetivo.progresso.length > 0 ? (
                <ul>
                  {objetivo.progresso.slice().reverse().map((item, index) => (
                    <li key={index}>{item.data}: {item.valor} {objetivo.unidade}</li>
                  ))}
                </ul>
              ) : <p className="historico-vazio">Vazio.</p>}
            </div>

            <div className="observacoes-section">
              <h4>Observações:</h4>
              {(objetivo.observacoes || []).length > 0 ? (
                <ul className="obs-list">
                  {objetivo.observacoes.slice().reverse().map((item, index) => (
                    <li key={index} className="obs-item"><strong>{item.data}:</strong> {item.texto}</li>
                  ))}
                </ul>
              ) : <p className="historico-vazio">Nenhuma observação.</p>}
              
              <div className="add-observacao">
                <textarea
                  placeholder="Nova observação..."
                  value={novaObservacao}
                  onChange={(e) => setNovaObservacao(e.target.value)}
                  rows="2"
                ></textarea>
                <button onClick={handleAddObservacao}>Salvar</button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Seta Lateral */}
      <button className="expand-metas-button" onClick={toggleMetasView}>
        {isMetasViewOpen ? '‹' : '›'}
      </button>

      {/* Flyout de Metas */}
      {isMetasViewOpen && (
        <div className="metas-flyout-panel">
          <h4>Sub-Metas:</h4>
          <ul className="sub-metas-list">
            {objetivo.subMetas.map((meta) => (
              <li key={meta.id} className={`sub-meta-item ${meta.concluida ? 'concluida' : ''}`}>
                {/* Lógica Visual do Emoji */}
                {meta.concluida ? '✅' : (meta.foiAtingidaAlgumaVez ? '😢' : '🎯')}
                <span>{meta.valor} {objetivo.unidade}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
      
    </div>
  );
}

export default CardPerdaPeso;