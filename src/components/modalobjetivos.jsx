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

function ModalObjetivos({ isOpen, onClose, onCreateCard }) { // Recebe onCreateCard
  const [step, setStep] = useState('selectType'); 
  const [selectedType, setSelectedType] = useState(null);
  
  const [formData, setFormData] = useState({
    titulo: '',
    valorInicial: '',
    valorAlvo: '',
    porque: '',
  });

  const handleTypeSelect = (type) => {
    setSelectedType(type);
    setFormData({ 
      titulo: type.label.replace('_', ' '),
      valorInicial: '',
      valorAlvo: '',
      porque: '',
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

  // 3. CORREÇÃO: Esta função CHAMA a prop 'onCreateCard'
  const handleSubmit = () => {
    const cardData = {
      type: selectedType.type,
      titulo: formData.titulo,
      valorInicial: parseFloat(formData.valorInicial) || 0,
      valorAlvo: parseFloat(formData.valorAlvo) || 0,
      porque: formData.porque,
    };
    if (tiposQuantitativos.includes(cardData.type) && cardData.valorInicial === cardData.valorAlvo) {
      alert('O valor inicial e a meta final não podem ser iguais.');
      return;
    }
    
    onCreateCard(cardData); // Chama a função da Home.jsx
    
    handleClose(); 
  };

  const handleClose = () => {
    setStep('selectType');
    setSelectedType(null);
    onClose(); 
  };

  // PASSO 1: Seleção de Tipo
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

  // PASSO 2: Pré-visualização Interativa
  const renderFillDetails = () => {
    const isQuantitativo = tiposQuantitativos.includes(selectedType.type);
    const { titulo, valorInicial, valorAlvo, porque } = formData;

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

            <label>
              Meu "Porquê" (Sua motivação):
              <textarea name="porque" className="form-textarea" value={porque} onChange={handleChange} placeholder="Ex: Quero ter mais energia para..." rows="4"></textarea>
            </label>
          </div>
          
          {/* Coluna da Direita: Pré-visualização Interativa */}
          <div className="modal-preview">
            <h4>Pré-visualização do Card:</h4>
            
            <div className="preview-card">
              <div className="preview-card-header">
                <h3>{titulo || "Seu Título Aqui"}</h3>
              </div>
              
              <div className="preview-card-layout">
                <div className="preview-main-content">
                  <div className="preview-progress-info">
                    <span>Progresso: 0%</span>
                    <div className="preview-progress-bar-container">
                      <div className="preview-progress-bar" style={{ width: `0%` }}></div>
                    </div>
                  </div>
                  
                  <div className="preview-porque-section">
                    <h4>Meu "Porquê":</h4>
                    <p>{porque || "Sua motivação aparecerá aqui..."}</p>
                  </div>
                </div>

                <div className="preview-sidebar">
                  <h4>Metas</h4>
                  <div className="preview-meta-fields">
                    <div className="preview-meta-field">
                      <span>Inicial:</span>
                      <span>{valorInicial || 0} kg</span>
                    </div>
                    <div className="preview-meta-field final">
                      <span>Final:</span>
                      <span>{valorAlvo || 0} kg</span>
                    </div>
                  </div>
                  <ul className="preview-sub-metas-list">
                    <li className="preview-sub-meta-item">🎯 <span>...</span></li>
                  </ul>
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
          {/* 3. CORREÇÃO: O onClick está ligado ao handleSubmit */}
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