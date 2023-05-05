const express = require('express');
const router = express.Router();
const ColorsController = require('./controllers/ColorsController');

router.get('/colors', ColorsController.getColors);
router.get('/color', ColorsController.getColorByHex);
router.post('/color', ColorsController.createColor);
router.put('/color', ColorsController.updateColor);
router.delete('/color', ColorsController.deleteColor);

module.exports = router;