const db = require('../config/database');

class RespuestaModel {
static async guardar(encuestaId, respuestas) {
  const respuestasFinal = Array.isArray(respuestas) ? respuestas : [respuestas];

  const [result] = await db.execute(
    'INSERT INTO respuestas (encuesta_id, respuestas) VALUES (?, ?)',
    [encuestaId, JSON.stringify(respuestasFinal)]
  );

  return {
    id: result.insertId,
    encuesta_id: encuestaId,
    respuestas: respuestasFinal
  };
}


static async obtenerPorEncuesta(encuestaId) {
  const [respuestas] = await db.execute(
    'SELECT * FROM respuestas WHERE encuesta_id = ?',
    [encuestaId]
  );

  return respuestas.map(r => {
    let data = r.respuestas;

    // Si el motor devuelve como string, lo parseamos
    if (typeof data === 'string') {
      try {
        data = JSON.parse(data);
      } catch (e) {
        data = [];
      }
    }

    // Forzar que sea array
    if (!Array.isArray(data)) {
      data = [data];
    }

    return {
      ...r,
      respuestas: data
    };
  });
}
  static async eliminarPorEncuesta(encuestaId) {
    await db.execute(
      'DELETE FROM respuestas WHERE encuesta_id = ?',
      [encuestaId]
    );
    return true;
  }
}

module.exports = RespuestaModel;
