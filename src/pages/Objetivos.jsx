import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import CardObjetivos from '../components/cardobjetivos.jsx';
import CardAdicionar from '../components/cardadicionar.jsx';
import ModalObjetivos from '../components/modalobjetivos.jsx';
import { useObjetivos } from '../hooks/useObjetivos.jsx';
import { FaUpload, FaSpinner, FaCheckCircle, FaImage, FaExclamationTriangle } from 'react-icons/fa';
import '../styles/cardobjetivos.css';

function Objetivos({ categoria }) {
  const { objetivos, addCard, deleteCard, updateCard } = useObjetivos();
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  // Estados para o card de IA (Academia)
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [result, setResult] = useState(null);
  
  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  const handleCreateCard = (cardData) => {
    addCard(cardData);
    handleCloseModal();
  };

  // Verifica se existe algum card de frequência para mostrar o calendário
  const hasFrequenciaCard = objetivos.some(obj => obj.type === 'FREQUENCIA');
  
  // Pega todos os dias marcados de todos os cards de frequência
  const getAllMarkedDays = () => {
    const allDays = {};
    objetivos
      .filter(obj => obj.type === 'FREQUENCIA')
      .forEach(obj => {
        if (obj.diasMarcados) {
          Object.entries(obj.diasMarcados).forEach(([date, status]) => {
            allDays[date] = status;
          });
        }
      });
    return allDays;
  };

  const markedDays = getAllMarkedDays();

  const tileClassName = ({ date, view }) => {
    if (view === 'month') {
      const dateStr = date.toISOString().split('T')[0];
      if (markedDays[dateStr] === 'foi') return 'dia-foi';
      if (markedDays[dateStr] === 'naofoi') return 'dia-naofoi';
    }
    return null;
  };

  // Funções do card de IA
  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      setPreview(URL.createObjectURL(selectedFile));
      setResult(null);
      setError(null);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile && droppedFile.type.startsWith('image/')) {
      setFile(droppedFile);
      setPreview(URL.createObjectURL(droppedFile));
      setResult(null);
      setError(null);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const processarFicha = async () => {
    if (!file) return;
    setLoading(true);
    setError(null);
    
    // TODO: Integrar com Gemini API
    setTimeout(() => {
      setResult({
        titulo: 'Treino A - Peito e Tríceps',
        exercicios: [
          { nome: 'Supino Reto', series: 4, reps: '10-12', peso: '60kg' },
          { nome: 'Supino Inclinado', series: 4, reps: '10-12', peso: '50kg' },
          { nome: 'Crucifixo', series: 3, reps: '12-15', peso: '14kg' },
        ],
        observacoes: 'Descanso de 60-90s entre séries'
      });
      setLoading(false);
    }, 2000);
  };

  const handleNovaFicha = () => {
    setFile(null);
    setPreview(null);
    setResult(null);
    setError(null);
  };

  // Define o título baseado na categoria
  const getTitulo = () => {
    switch(categoria) {
      case 'academia': return '🏋️ Academia';
      case 'equipamento': return '🏃 Equipamento';
      case 'viagem': return '✈️ Viagem';
      default: return '🎯 Objetivos';
    }
  };

  return (
    <div className="objetivos-page">
      {/* Coluna Esquerda - Cards de Objetivos */}
      <div className="objetivos-coluna-esquerda">
        <h2 className="objetivos-titulo">{getTitulo()}</h2>
        
        <div className="objetivos-lista">
          {objetivos.map((objetivo) => (
            <CardObjetivos
              key={objetivo.id}
              objetivo={objetivo}
              onDelete={deleteCard}
              onUpdate={updateCard}
            />
          ))}

          <CardAdicionar onAddCard={handleOpenModal} />
        </div>
      </div>

      {/* Coluna Central - Card de IA (só na categoria academia) */}
      {categoria === 'academia' && (
        <div className="objetivos-coluna-central">
          <div className="card-ficha">
            <h2>📋 Ficha de Treino</h2>
            <p className="card-descricao">
              Faça upload da sua ficha e a IA extrai os exercícios!
            </p>
            
            <div 
              className={`upload-area ${preview ? 'has-image' : ''}`}
              onDrop={handleDrop}
              onDragOver={handleDragOver}
            >
              {preview ? (
                <img src={preview} alt="Preview" className="ficha-preview" />
              ) : (
                <>
                  <FaImage className="upload-icon" />
                  <p>Arraste uma imagem aqui</p>
                  <span>ou</span>
                </>
              )}
              
              <label className="upload-button">
                <FaUpload /> Selecionar
                <input 
                  type="file" 
                  accept="image/*" 
                  onChange={handleFileChange}
                  hidden 
                />
              </label>
            </div>

            {file && !result && (
              <button 
                className="processar-button"
                onClick={processarFicha}
                disabled={loading}
              >
                {loading ? (
                  <><FaSpinner className="spin" /> Processando...</>
                ) : (
                  '🤖 Processar com IA'
                )}
              </button>
            )}

            {error && (
              <div className="error-message">
                <FaExclamationTriangle /> {error}
              </div>
            )}

            {result && (
              <div className="resultado-inline">
                <div className="resultado-header-inline">
                  <FaCheckCircle className="success-icon" />
                  <h3>{result.titulo}</h3>
                </div>
                <ul className="exercicios-inline">
                  {result.exercicios.map((ex, i) => (
                    <li key={i}>{ex.nome} - {ex.series}x{ex.reps}</li>
                  ))}
                </ul>
                <button className="btn-nova-inline" onClick={handleNovaFicha}>
                  🔄 Nova
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Coluna Direita - Calendário (aparece se tiver card de frequência) */}
      {hasFrequenciaCard && (
        <div className="objetivos-coluna-direita">
          <div className="calendario-container">
            <h2>📅 Frequência</h2>
            <Calendar
              tileClassName={tileClassName}
              locale="pt-BR"
            />
            <div className="calendario-legenda">
              <span className="legenda-item">
                <span className="legenda-cor foi"></span> Compareceu
              </span>
              <span className="legenda-item">
                <span className="legenda-cor naofoi"></span> Não Compareceu
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Modal */}
      <ModalObjetivos
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onCreateCard={handleCreateCard} 
      />
    </div>
  );
}

export default Objetivos;