import { useState, useCallback } from 'react';

// initial pode ser: null | 'ok' | 'atrasado'
export function useButton(initial = null) {
  const [status, setStatus] = useState(initial);

  const toggleOk = useCallback(() => {
    setStatus(prev => (prev === 'ok' ? null : 'ok'));
  }, []);

  const toggleAtrasado = useCallback(() => {
    setStatus(prev => (prev === 'atrasado' ? null : 'atrasado'));
  }, []);

  const set = useCallback((value) => {
    setStatus(value);
  }, []);

  return { status, toggleOk, toggleAtrasado, setStatus: set };
}