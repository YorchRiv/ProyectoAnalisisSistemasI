const EncuestaModel = require('../models/encuesta.model');
const PreguntaModel = require('../models/pregunta.model');
const RespuestaModel = require('../models/respuesta.model');

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

  static async actualizar(req, res) {
    try {
      const { nombre, preguntas } = req.body;
      const id = req.params.id;

      const encuestaExistente = await EncuestaModel.obtenerPorId(id);
      if (!encuestaExistente) {
        return res.status(404).json({ error: 'Encuesta no encontrada' });
      }

      await EncuestaModel.actualizar(id, nombre);
      await PreguntaModel.eliminarPorEncuesta(id);

      for (const pregunta of preguntas) {
        await PreguntaModel.crear(id, pregunta.texto, pregunta.tipo);
      }

      const encuestaActualizada = await EncuestaModel.obtenerPorId(id);
      const preguntasActualizadas = await PreguntaModel.obtenerPorEncuesta(id);

      res.json({
        ...encuestaActualizada,
        preguntas: preguntasActualizadas,
        mensaje: 'Encuesta actualizada correctamente'
      });
    } catch (error) {
      console.error('Error en actualización:', error);
      res.status(500).json({ error: 'Error al actualizar la encuesta' });
    }
  }

  static async eliminar(req, res) {
    try {
      const id = req.params.id;
      await RespuestaModel.eliminarPorEncuesta(id);
      await PreguntaModel.eliminarPorEncuesta(id);
      await EncuestaModel.eliminar(id);
      res.json({ mensaje: 'Encuesta eliminada correctamente' });
    } catch (error) {
      console.error('Error al eliminar:', error);
      res.status(500).json({ error: 'Error al eliminar la encuesta' });
    }
  }

  // NUEVO MÉTODO 👇
  static async obtenerRespuestas(req, res) {
    try {
      const respuestas = await RespuestaModel.obtenerPorEncuesta(req.params.id);
      res.json(respuestas);
    } catch (error) {
      console.error('Error al obtener respuestas:', error);
      res.status(500).json({ error: 'Error al obtener respuestas' });
    }
  }
}

module.exports = EncuestaController;
