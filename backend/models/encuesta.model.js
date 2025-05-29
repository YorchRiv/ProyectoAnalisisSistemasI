const db = require('../config/database');
const { v4: uuidv4 } = require('uuid');

class EncuestaModel {
  static async crear(nombre) {
    const id = uuidv4();
    const [result] = await db.execute(
      'INSERT INTO encuestas (id, nombre) VALUES (?, ?)',
      [id, nombre]
    );
    return { id, nombre };
  }

  static async obtenerTodas() {
    const [encuestas] = await db.execute('SELECT * FROM encuestas');
    return encuestas;
  }

  static async obtenerPorId(id) {
    const [encuesta] = await db.execute(
      'SELECT * FROM encuestas WHERE id = ?',
      [id]
    );
    return encuesta[0];
  }
}

module.exports = EncuestaModel;
