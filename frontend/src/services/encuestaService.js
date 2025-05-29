const API_URL = 'http://localhost:3000/api';

export const encuestaService = {
  crearEncuesta: async (nombre, preguntas) => {
    const response = await fetch(`${API_URL}/encuestas`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ nombre, preguntas }),
    });
    return response.json();
  },

  obtenerEncuestas: async () => {
    const response = await fetch(`${API_URL}/encuestas`);
    return response.json();
  },

  obtenerEncuesta: async (id) => {
    const response = await fetch(`${API_URL}/encuestas/${id}`);
    return response.json();
  },

  guardarRespuestas: async (encuestaId, respuestas) => {
    const response = await fetch(`${API_URL}/encuestas/${encuestaId}/respuestas`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ respuestas }),
    });
    return response.json();
  }
};
