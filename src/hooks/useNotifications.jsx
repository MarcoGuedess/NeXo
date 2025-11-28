// src/hooks/useNotifications.jsx
import toast from 'react-hot-toast';

// Este é o seu hook reutilizável!
export function useNotifications() {

  /**
   * Mostra uma notificação de sucesso (verde)
   * @param {string} message - A mensagem para exibir
   */
  const notifySuccess = (message) => {
    toast.success(message, {
      style: {
        background: '#a3af8c', // Seu verde musgo
        color: 'white',
      },
      iconTheme: {
        primary: 'white',
        secondary: '#a3af8c',
      },
    });
  };

  /**
   * Mostra uma notificação de erro (vermelho)
   * @param {string} message - A mensagem para exibir
   */
  const notifyError = (message) => {
    toast.error(message, {
      style: {
        background: '#dc2626', // Vermelho
        color: 'white',
      },
      iconTheme: {
        primary: 'white',
        secondary: '#dc2626',
      },
    });
  };

  /**
   * Mostra uma notificação de informação (azul)
   * @param {string} message - A mensagem para exibir
   */
  const notifyInfo = (message) => {
    toast(message, {
      icon: 'ℹ️',
      style: {
        background: '#2563eb', // Seu azul forte
        color: 'white',
      }
    });
  };

  // Exporta as funções para que os componentes possam usá-las
  return { notifySuccess, notifyError, notifyInfo };
}