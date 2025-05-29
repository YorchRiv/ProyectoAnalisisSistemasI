const EncuestaModel = require('../models/encuesta.model');
const PreguntaModel = require('../models/pregunta.model');

class EncuestaController {
  static async crear(req, res) {
    try {
      const { nombre, preguntas } = req.body;
      const encuesta = await EncuestaModel.crear(nombre);
      
      for (const pregunta of preguntas) {
        await PreguntaModel.crear(encuesta.id, pregunta.texto, pregunta.tipo);
      }
      
      res.status(201).json(encuesta);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async obtenerTodas(req, res) {
    try {
      const encuestas = await EncuestaModel.obtenerTodas();
      res.json(encuestas);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async obtenerPorId(req, res) {
    try {
      const encuesta = await EncuestaModel.obtenerPorId(req.params.id);
      const preguntas = await PreguntaModel.obtenerPorEncuesta(req.params.id);
      res.json({ ...encuesta, preguntas });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

module.exports = EncuestaController;
