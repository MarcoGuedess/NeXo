// src/components/modalobjetivos.jsx
import React, { useState } from 'react';
import Modal from 'react-modal';
import '../styles/modalobjetivos.css'; 

Modal.setAppElement('#root');

const goalTypes = [
  { type: 'PERDA_PESO', label: 'Perda de Peso' },
  { type: 'PERDA_GORDURA', label: 'Perda de Gordura' },
  { type: 'GANHO_MASSA', label: 'Ganho de Massa Magra' },
  { type: 'PROGRESSAO_CARGA', label: 'Progressão de Carga' },
  { type: 'FREQUENCIA', label: 'Frequência Batida' },
];
const tiposQuantitativos = ['PERDA_PESO', 'PERDA_GORDURA', 'GANHO_MASSA', 'PROGRESSAO_CARGA'];

function ModalObjetivos({ isOpen, onClose, onCreateCard }) {
  const [step, setStep] = useState('selectType'); 
  const [selectedType, setSelectedType] = useState(null);
  
  const [formData, setFormData] = useState({
    titulo: '',
    valorInicial: '',
    valorAlvo: '',
    porque: '',
    tipoDeMeta: 'semanal', // NOVO: Padrão para frequência
    valorDaMeta: 3,      // NOVO: Padrão para frequência
  });

  const handleTypeSelect = (type) => {
    setSelectedType(type);
    setFormData({ 
      titulo: type.label.replace('_', ' '),
      valorInicial: '',
      valorAlvo: '',
      porque: '',
      tipoDeMeta: 'semanal',
      valorDaMeta: 3,
    });
    setStep('fillDetails');
  };

  const handleBack = () => {
    setStep('selectType');
    setSelectedType(null);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    const cardData = {
      type: selectedType.type,
      titulo: formData.titulo,
      valorInicial: parseFloat(formData.valorInicial) || 0,
      valorAlvo: parseFloat(formData.valorAlvo) || 0,
      porque: formData.porque,
      // NOVO: Passa os dados da meta de frequência
      tipoDeMeta: formData.tipoDeMeta,
      valorDaMeta: parseFloat(formData.valorDaMeta) || 0,
    };
    
    if (tiposQuantitativos.includes(cardData.type) && cardData.valorInicial === cardData.valorAlvo) {
      alert('O valor inicial e a meta final não podem ser iguais.');
      return;
    }
    onCreateCard(cardData);
    handleClose(); 
  };

  const handleClose = () => {
    setStep('selectType');
    setSelectedType(null);
    onClose(); 
  };

  // --- PASSO 1: Seleção de Tipo (Sem mudança) ---
  const renderSelectType = () => (
    <>
      <h2 className="modal-title-light">Escolha o Tipo de Meta</h2>
      <div className="goal-type-list">
        {goalTypes.map((goal) => (
          <button
            key={goal.type}
            className="goal-type-button"
            onClick={() => handleTypeSelect(goal)}
          >
            {goal.label}
          </button>
        ))}
      </div>
      <button className="modal-close-button" onClick={handleClose}>
        Cancelar
      </button>
    </>
  );

  // --- PASSO 2: Pré-visualização (COM NOVOS CAMPOS) ---
  const renderFillDetails = () => {
    const isQuantitativo = tiposQuantitativos.includes(selectedType.type);
    const isFrequencia = selectedType.type === 'FREQUENCIA';
    const { titulo, valorInicial, valorAlvo, porque, tipoDeMeta, valorDaMeta } = formData;

    return (
      <>
        <h2 className="modal-title-light">Criar Meta: {selectedType.label}</h2>
        
        <div className="modal-layout-twocol">
          
          {/* Coluna da Esquerda: Formulário */}
          <div className="modal-form-details">
            <label>
              Título da Meta:
              <input type="text" name="titulo" className="form-input" value={titulo} onChange={handleChange} />
            </label>
            
            {/* CAMPOS DE PERDA DE PESO */}
            {isQuantitativo && (
              <>
                <label>
                  Valor Inicial (ex: 90):
                  <input type="number" name="valorInicial" className="form-input" value={valorInicial} onChange={handleChange} placeholder="0" />
                </label>
                <label>
                  Meta Final (ex: 75):
                  <input type="number" name="valorAlvo" className="form-input" value={valorAlvo} onChange={handleChange} placeholder="0" />
                </label>
              </>
            )}

            {/* NOVOS CAMPOS DE FREQUÊNCIA */}
            {isFrequencia && (
              <div className="form-row">
                <label className="form-label-half">
                  Tipo de Meta:
                  <select name="tipoDeMeta" className="form-input" value={tipoDeMeta} onChange={handleChange}>
                    <option value="semanal">Semanal</option>
                    <option value="mensal">Mensal</option>
                  </select>
                </label>
                <label className="form-label-half">
                  Valor (Nº de vezes):
                  <input type="number" name="valorDaMeta" className="form-input" value={valorDaMeta} onChange={handleChange} />
                </label>
              </div>
            )}

            <label>
              Meu "Porquê" (Sua motivação):
              <textarea name="porque" className="form-textarea" value={porque} onChange={handleChange} placeholder="Ex: Quero ter mais energia para..." rows="4"></textarea>
            </label>
          </div>
          
          {/* Coluna da Direita: Pré-visualização */}
          <div className="modal-preview">
            <h4>Pré-visualização do Card:</h4>
            
            <div className="preview-card">
              <div className="preview-card-header">
                <h3>{titulo || "Seu Título Aqui"}</h3>
              </div>
              
              <div className="preview-main-content">
                {/* Preview de Frequência */}
                {isFrequencia && (
                  <div className="preview-freq-meta">
                    Meta: {valorDaMeta}x {tipoDeMeta}
                  </div>
                )}
                
                {/* Preview de Perda de Peso */}
                {isQuantitativo && (
                  <div className="preview-progress-info">
                    <span>Progresso: 0%</span>
                    <div className="preview-progress-bar-container">
                      <div className="preview-progress-bar" style={{ width: `0%` }}></div>
                    </div>
                  </div>
                )}

                <div className="preview-porque-section">
                  <h4>Meu "Porquê":</h4>
                  <p>{porque || "Sua motivação aparecerá aqui..."}</p>
                </div>
              </div>
            </div>
          </div>

        </div>
        
        {/* Botões de Ação */}
        <div className="form-actions">
          <button className="form-button-back" onClick={handleBack}>
            Voltar
          </button>
          <button className="form-button-create" onClick={handleSubmit}>
            Aceitar e Criar Card
          </button>
        </div>
      </>
    );
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={handleClose}
      className="modal-content"
      overlayClassName="modal-overlay"
    >
      {step === 'selectType' ? renderSelectType() : renderFillDetails()}
    </Modal>
  );
}

export default ModalObjetivos;