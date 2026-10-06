// src/js/api.js - Cliente API con fallback automático para XAMPP/Vite

const API_BASE = '/api';
const DIRECT_XAMPP_BASE = 'http://localhost/GezrelMisaelRiveraMorenoU2/api';

export async function fetchApi(endpoint, options = {}) {
  const url = `${API_BASE}/${endpoint}`;

  const defaultHeaders = {
    'Content-Type': 'application/json',
  };

  const config = {
    ...options,
    headers: {
      ...defaultHeaders,
      ...options.headers,
    },
  };

  try {
    const response = await fetch(url, config);
    if (!response.ok) {
      const errData = await response.json().catch(() => ({}));
      throw new Error(errData.message || `Error HTTP: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    try {
      const fallbackUrl = `${DIRECT_XAMPP_BASE}/${endpoint}`;
      const fallbackResponse = await fetch(fallbackUrl, config);
      if (!fallbackResponse.ok) {
        const errData = await fallbackResponse.json().catch(() => ({}));
        throw new Error(errData.message || `Error HTTP: ${fallbackResponse.status}`);
      }
      return await fallbackResponse.json();
    } catch (fallbackError) {
      console.error('Error de comunicación API:', fallbackError);
      throw error;
    }
  }
}
