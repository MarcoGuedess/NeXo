import { useState, useCallback } from 'react';

/**
 * Hook para processar imagens com Google Gemini API (gratuito)
 * 
 * Para obter a API Key gratuita:
 * 1. Acesse: https://makersuite.google.com/app/apikey
 * 2. Clique em "Create API Key"
 * 3. Copie a chave e coloque na variável GEMINI_API_KEY
 * 
 * Limites gratuitos (Gemini 1.5 Flash):
 * - 15 requisições por minuto
 * - 1500 requisições por dia
 * - Grátis!
 */

// TODO: Mover para variável de ambiente (.env)
const GEMINI_API_KEY = 'SUA_API_KEY_AQUI';
const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent';

export function useOCR() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [result, setResult] = useState(null);

  // Converte arquivo para base64
  const fileToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        // Remove o prefixo "data:image/...;base64,"
        const base64 = reader.result.split(',')[1];
        resolve(base64);
      };
      reader.onerror = (error) => reject(error);
    });
  };

  const processImage = useCallback(async (imageFile) => {
    setLoading(true);
    setError(null);

    try {
      const base64Image = await fileToBase64(imageFile);
      
      const prompt = `Analise esta imagem de uma ficha de treino de academia.
      
Extraia as informações e retorne APENAS um JSON válido no seguinte formato (sem markdown, sem texto extra):
{
  "titulo": "Nome do treino (ex: Treino A - Peito)",
  "exercicios": [
    {
      "nome": "Nome do exercício",
      "series": 4,
      "reps": "10-12",
      "peso": "60kg"
    }
  ],
  "observacoes": "Qualquer observação adicional"
}

Se não conseguir identificar algum campo, deixe como string vazia ou null.
Retorne APENAS o JSON, nada mais.`;

      const response = await fetch(`${GEMINI_API_URL}?key=${GEMINI_API_KEY}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [{
            parts: [
              { text: prompt },
              {
                inline_data: {
                  mime_type: imageFile.type,
                  data: base64Image
                }
              }
            ]
          }],
          generationConfig: {
            temperature: 0.1,
            topK: 32,
            topP: 1,
            maxOutputTokens: 4096,
          }
        })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error?.message || 'Erro na API do Gemini');
      }

      const data = await response.json();
      
      // Extrai o texto da resposta
      const responseText = data.candidates?.[0]?.content?.parts?.[0]?.text;
      
      if (!responseText) {
        throw new Error('Resposta vazia da IA');
      }

      // Tenta fazer parse do JSON
      // Remove possíveis marcadores de código markdown
      const cleanJson = responseText
        .replace(/```json\n?/g, '')
        .replace(/```\n?/g, '')
        .trim();
      
      const parsedResult = JSON.parse(cleanJson);
      
      setResult(parsedResult);
      return parsedResult;

    } catch (err) {
      console.error('Erro no OCR:', err);
      setError(err.message);
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  const reset = useCallback(() => {
    setResult(null);
    setError(null);
  }, []);

  return { processImage, loading, error, result, reset };
}