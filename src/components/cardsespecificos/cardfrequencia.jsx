// src/components/cardsespecificos/cardfrequencia.jsx
import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css'; // Estilo padrão
import '../../styles/cardobjetivos.css';
import '../../styles/cardespecial.css'; // O CSS será atualizado

// --- FUNÇÕES HELPER (Para cálculo da barra de progresso) ---

// Pega o início (Domingo) da semana de uma data
function getStartOfWeek(date) {
  const newDate = new Date(date);
  const day = newDate.getDay();
  const diff = newDate.getDate() - day;
  return new Date(newDate.setDate(diff));
}

// Calcula o progresso (semanal ou mensal)
function calculateProgress(diasMarcados, tipoDeMeta, valorDaMeta, dataAtiva) {
  const meta = parseFloat(valorDaMeta) || 1; // Evita divisão por zero
  let diasCompletos = 0;

  // Filtra apenas os dias 'foi'
  const datasMarcadas = Object.keys(diasMarcados).filter(
    (key) => diasMarcados[key] === 'foi'
  );

  if (tipoDeMeta === 'semanal') {
    const inicioSemana = getStartOfWeek(dataAtiva);
    const fimSemana = new Date(inicioSemana);
    fimSemana.setDate(inicioSemana.getDate() + 6);

    diasCompletos = datasMarcadas.filter(dateStr => {
      const d = new Date(dateStr + 'T00:00:00'); // Corrige fuso horário
      return d >= inicioSemana && d <= fimSemana;
    }).length;

  } else if (tipoDeMeta === 'mensal') {
    diasCompletos = datasMarcadas.filter(dateStr => {
      return dateStr.startsWith(dataAtiva.toISOString().slice(0, 7)); // 'YYYY-MM'
    }).length;
  }

  return Math.min(100, Math.round((diasCompletos / meta) * 100));
}

// ---------------------------------------------------------------

function CardFrequencia({ objetivo, onDelete, onUpdate }) {
  // Estado 1: Calendário expandido (default: true)
  const [isExpanded, setIsExpanded] = useState(true);
  // Estado 2: Modo de Edição (default: false)
  const [isEditing, setIsEditing] = useState(false);
  // Estado 3: Mês/Semana sendo visualizado
  const [activeDate, setActiveDate] = useState(new Date());

  // Guarda os dados de edição temporariamente
  const [editData, setEditData] = useState({
    tipoDeMeta: objetivo.tipoDeMeta,
    valorDaMeta: objetivo.valorDaMeta,
  });

  // --- LÓGICA DE CLIQUE (1-clique, 2-cliques, 3-cliques) ---
  const handleDayClick = (date) => {
    // A data é armazenada como 'YYYY-MM-DD'
    const dateKey = date.toISOString().split('T')[0];
    const currentStatus = objetivo.diasMarcados[dateKey];
    let newStatus;

    if (currentStatus === 'foi') {
      newStatus = 'naofoi'; // 2º clique: "Não Foi" (Vermelho)
    } else if (currentStatus === 'naofoi') {
      newStatus = undefined; // 3º clique: Limpar (Volta ao normal)
    } else {
      newStatus = 'foi'; // 1º clique: "Foi" (Azul)
    }

    const newDiasMarcados = { ...objetivo.diasMarcados };
    if (newStatus === undefined) {
      delete newDiasMarcados[dateKey]; // Limpa a chave se for 'undefined'
    } else {
      newDiasMarcados[dateKey] = newStatus;
    }

    onUpdate(objetivo.id, { diasMarcados: newDiasMarcados });
  };

  // --- LÓGICA DA BARRA DE PROGRESSO ---
  const progressoPerc = calculateProgress(
    objetivo.diasMarcados,
    objetivo.tipoDeMeta,
    objetivo.valorDaMeta,
    activeDate
  );

  // --- LÓGICA DE ESTILO DO CALENDÁRIO ---
  const getTileClassName = ({ date, view }) => {
    if (view === 'month') {
      const dateKey = date.toISOString().split('T')[0];
      const status = objetivo.diasMarcados[dateKey];
      if (status === 'foi') return 'dia-foi';
      if (status === 'naofoi') return 'dia-naofoi';
    }
  };

  // --- LÓGICA DE EDIÇÃO ---
  const handleEdit = () => {
    setIsEditing(true);
  };
  const handleCancel = () => {
    setIsEditing(false);
    // Restaura os dados originais
    setEditData({
      tipoDeMeta: objetivo.tipoDeMeta,
      valorDaMeta: objetivo.valorDaMeta,
    });
  };
  const handleSave = () => {
    onUpdate(objetivo.id, {
      tipoDeMeta: editData.tipoDeMeta,
      valorDaMeta: parseFloat(editData.valorDaMeta) || 0,
    });
    setIsEditing(false);
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="card-objetivo card-frequencia">
      
      {/* --- CABEÇALHO --- */}
      <div className="card-header">
        <h3 contentEditable>{objetivo.titulo}</h3>
        <button onClick={() => onDelete(objetivo.id)} className="delete-button-header">X</button>
      </div>
      
      {/* --- SEÇÃO DE META E PROGRESSO --- */}
      <div className="freq-meta-container">
        {isEditing ? (
          // MODO DE EDIÇÃO
          <div className="freq-edit-mode">
            <select name="tipoDeMeta" className="form-input" value={editData.tipoDeMeta} onChange={handleChange}>
              <option value="semanal">Semanal</option>
              <option value="mensal">Mensal</option>
            </select>
            <input
              type="number"
              name="valorDaMeta"
              className="form-input"
              value={editData.valorDaMeta}
              onChange={handleChange}
            />
            <button className="freq-save-btn" onClick={handleSave}>Salvar</button>
            <button className="freq-cancel-btn" onClick={handleCancel}>X</button>
          </div>
        ) : (
          // MODO DE VISUALIZAÇÃO
          <div className="freq-view-mode">
            <span>Meta: {objetivo.valorDaMeta}x {objetivo.tipoDeMeta}</span>
            <button className="edit-meta-btn" onClick={handleEdit}>Editar</button>
          </div>
        )}
      </div>

      {/* Barra de Progresso */}
      <div className="progresso-info">
        <span>Progresso: {progressoPerc}%</span>
        <div className="progress-bar-container">
          {/* A cor aqui será o azul (definido no cardespecial.css) */}
          <div className="progress-bar" style={{ width: `${progressoPerc}%` }}></div>
        </div>
      </div>

      {/* Botão de Expandir Calendário */}
      <button className="expand-details-button" onClick={() => setIsExpanded(!isExpanded)}>
        <span className={`arrow ${isExpanded ? 'down' : 'right'}`}>►</span>
        {isExpanded ? 'Esconder Calendário' : 'Mostrar Calendário'}
      </button>
      
      {/* --- CALENDÁRIO EXPANSÍVEL --- */}
      {isExpanded && (
        <div className="expandable-view-container calendar-container">
          <Calendar
            onClickDay={handleDayClick}
            tileClassName={getTileClassName}
            onActiveStartDateChange={({ activeStartDate }) => setActiveDate(activeStartDate)}
            value={activeDate}
          />
        </div>
      )}

    </div>
  );
}

export default CardFrequencia;