// src/components/cards-especificos/CardFrequencia.jsx
import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css'; // Mantenha este
import '../../styles/cardobjetivos.css'; // CORRIGIDO
import '../../styles/cardespecial.css';  // CORRIGIDO

function CardFrequencia({ objetivo, onDelete, onUpdate }) {
  const [isExpanded, setIsExpanded] = useState(false);

  // Converte as strings de data em objetos Date para o calendário
  const diasMarcadosComoDate = objetivo.diasMarcados.map(dataStr => new Date(dataStr));

  const handleDayClick = (data) => {
    const dataString = data.toISOString().split('T')[0]; // Formato 'yyyy-mm-dd'
    
    let novosDiasMarcados;
    if (objetivo.diasMarcados.includes(dataString)) {
      // Se já marcou, desmarca
      novosDiasMarcados = objetivo.diasMarcados.filter(d => d !== dataString);
    } else {
      // Se não marcou, marca
      novosDiasMarcados = [...objetivo.diasMarcados, dataString];
    }
    onUpdate(objetivo.id, { diasMarcados: novosDiasMarcados });
  };

  const handleUpdateField = (field, value) => {
    onUpdate(objetivo.id, { [field]: value });
  };

  return (
    <div className="card-objetivo card-frequencia">
      <div className="card-header">
        <h3 
          contentEditable 
          suppressContentEditableWarning 
          onBlur={(e) => handleUpdateField('titulo', e.target.innerText)}
        >
          {objetivo.titulo}
        </h3>
        <button className="expand-button" onClick={() => setIsExpanded(!isExpanded)}>
          {isExpanded ? '▼' : '►'}
        </button>
      </div>
      
      <p>
        Meta de frequência: 
        <input 
          type="number" 
          className="frequencia-input"
          value={objetivo.frequenciaSemanal} 
          onChange={(e) => handleUpdateField('frequenciaSemanal', parseInt(e.target.value))}
        /> 
        vezes por semana.
      </p>

      {/* Conteúdo Expansível */}
      {isExpanded && (
        <div className="expanded-content calendar-container">
          <Calendar
            onClickDay={handleDayClick}
            tileClassName={({ date, view }) => {
              // Adiciona classe se o dia estiver no array de dias marcados
              if (view === 'month' && objetivo.diasMarcados.includes(date.toISOString().split('T')[0])) {
                return 'dia-marcado';
              }
            }}
          />
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

export default CardFrequencia;