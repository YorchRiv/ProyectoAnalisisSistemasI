const db = require('../config/database');

class PreguntaModel {
  static async crear(encuestaId, pregunta, tipo) {
    const [result] = await db.execute(
      'INSERT INTO preguntas (encuesta_id, pregunta, tipo) VALUES (?, ?, ?)',
      [encuestaId, pregunta, tipo]
    );
    return { id: result.insertId, encuesta_id: encuestaId, pregunta, tipo };
  }

  static async obtenerPorEncuesta(encuestaId) {
    const [preguntas] = await db.execute(
      'SELECT * FROM preguntas WHERE encuesta_id = ?',
      [encuestaId]
    );
    return preguntas;
  }

  static async eliminarPorEncuesta(encuestaId) {
    await db.execute(
      'DELETE FROM preguntas WHERE encuesta_id = ?',
      [encuestaId]
    );
    return true;
  }
}

module.exports = PreguntaModel;
