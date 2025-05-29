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
    let parsed;
    try {
      parsed = JSON.parse(r.respuestas);
      // ✅ Si no es array, convertirlo en uno
      if (!Array.isArray(parsed)) {
        parsed = [parsed];
      }
    } catch (e) {
      parsed = [];
    }

    return {
      ...r,
      respuestas: parsed
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
