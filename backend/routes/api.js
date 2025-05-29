const express = require('express');
const router = express.Router();
const EncuestaController = require('../controllers/encuesta.controller');
const RespuestaModel = require('../models/respuesta.model');

router.post('/encuestas', EncuestaController.crear);
router.get('/encuestas', EncuestaController.obtenerTodas);
router.get('/encuestas/:id', EncuestaController.obtenerPorId);
router.put('/encuestas/:id', EncuestaController.actualizar);
router.delete('/encuestas/:id', EncuestaController.eliminar);

router.post('/encuestas/:id/respuestas', async (req, res) => {
  try {
    const respuesta = await RespuestaModel.guardar(req.params.id, req.body.respuestas);
    res.status(201).json(respuesta);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/encuestas/:id/respuestas', async (req, res) => {
  try {
    const respuestas = await RespuestaModel.obtenerPorEncuesta(req.params.id);
    res.json(respuestas);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
