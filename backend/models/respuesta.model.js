const db = require('../config/database');

class RespuestaModel {
  static async guardar(encuestaId, respuestas) {
    const [result] = await db.execute(
      'INSERT INTO respuestas (encuesta_id, respuestas) VALUES (?, ?)',
      [encuestaId, JSON.stringify(respuestas)]
    );
    return { id: result.insertId, encuesta_id: encuestaId, respuestas };
  }

  static async obtenerPorEncuesta(encuestaId) {
    const [respuestas] = await db.execute(
      'SELECT * FROM respuestas WHERE encuesta_id = ?',
      [encuestaId]
    );
    return respuestas.map(r => ({...r, respuestas: JSON.parse(r.respuestas)}));
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
