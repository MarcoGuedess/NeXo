import React, { useState } from 'react';
import '../styles/academia.css';
import { FaUpload, FaSpinner, FaCheckCircle, FaImage, FaExclamationTriangle } from 'react-icons/fa';

function Academia() {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [result, setResult] = useState(null);

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
    // Por enquanto, simulação
    setTimeout(() => {
      setResult({
        titulo: 'Treino A - Peito e Tríceps',
        exercicios: [
          { nome: 'Supino Reto', series: 4, reps: '10-12', peso: '60kg' },
          { nome: 'Supino Inclinado', series: 4, reps: '10-12', peso: '50kg' },
          { nome: 'Crucifixo', series: 3, reps: '12-15', peso: '14kg' },
          { nome: 'Tríceps Pulley', series: 4, reps: '10-12', peso: '25kg' },
          { nome: 'Tríceps Testa', series: 3, reps: '10-12', peso: '20kg' },
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

  return (
    <div className="academia-container">
      <h1 className="academia-titulo">🏋️ Academia - Ficha de Treino</h1>
      
      <div className="academia-content">
        {/* Card de Upload */}
        <div className="card-ficha">
          <h2>📋 Sua Ficha de Treino</h2>
          <p className="card-descricao">
            Tire uma foto ou faça upload da sua ficha de treino. 
            Nossa IA vai extrair os exercícios automaticamente!
          </p>
          
          <div 
            className={`upload-area ${preview ? 'has-image' : ''}`}
            onDrop={handleDrop}
            onDragOver={handleDragOver}
          >
            {preview ? (
              <img src={preview} alt="Preview da ficha" className="ficha-preview" />
            ) : (
              <>
                <FaImage className="upload-icon" />
                <p>Arraste uma imagem da sua ficha aqui</p>
                <span>ou</span>
              </>
            )}
            
            <label className="upload-button">
              <FaUpload /> Selecionar Arquivo
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
                <>
                  <FaSpinner className="spin" /> Processando com IA...
                </>
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
        </div>

        {/* Card de Resultado da IA */}
        {result && (
          <div className="card-resultado">
            <div className="resultado-header">
              <FaCheckCircle className="success-icon" />
              <h2>{result.titulo || 'Ficha de Treino'}</h2>
            </div>

            {result.exercicios && result.exercicios.length > 0 ? (
              <div className="exercicios-list">
                <table>
                  <thead>
                    <tr>
                      <th>Exercício</th>
                      <th>Séries</th>
                      <th>Reps</th>
                      <th>Peso</th>
                    </tr>
                  </thead>
                  <tbody>
                    {result.exercicios.map((ex, index) => (
                      <tr key={index}>
                        <td>{ex.nome}</td>
                        <td>{ex.series}</td>
                        <td>{ex.reps}</td>
                        <td>{ex.peso || '-'}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <p className="sem-exercicios">Nenhum exercício identificado</p>
            )}

            {result.observacoes && (
              <div className="observacoes">
                <strong>Observações:</strong> {result.observacoes}
              </div>
            )}

            <div className="resultado-actions">
              <button className="btn-salvar">💾 Salvar Ficha</button>
              <button className="btn-editar">✏️ Editar</button>
              <button className="btn-nova" onClick={handleNovaFicha}>
                🔄 Nova Ficha
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Academia;