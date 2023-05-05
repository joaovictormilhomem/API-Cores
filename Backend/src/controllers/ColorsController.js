const ColorsService = require('../services/ColorsService');

module.exports = {
  getColors: async (req, res) => {
    const json = { error: '', result: [] };
    const colors = await ColorsService.getColors();
    colors.forEach(color => {
      json.result.push({
        pKey: color.pKey,
        hexCode: color.hexCode,
        colorName: color.colorName,
      })
    });
    res.json(json);
  },
  getColorByHex: async (req, res) => {
    const json = { error: '', result: {} };
    const { hexCode } = req.query;
    const color = await ColorsService.getColorByHex(hexCode);
    if (color) {
      json.result = color;
    }
    res.json(json);
  },
  createColor: async (req, res) => {
    const json = { error: '', result: {} };
    const { hexCode, colorName } = req.body;
    if (hexCode && colorName) {
      const pKey = await ColorsService.createColor(hexCode, colorName);
      json.result = { pKey, hexCode, colorName };
    } else {
      json.error = "Dados incorretos";
    }
    res.json(json);
  },
  updateColor: async (req, res) => {
    const json = { error: '', result: {} };
    const { pKey, hexCode, colorName } = req.body;
    if (pKey && hexCode && colorName) {
      await ColorsService.updateColor(pKey, hexCode, colorName);
      json.result = { pKey, hexCode, colorName };
    } else {
      json.error = "Dados incorretos";
    }
    res.json(json);
  },
  deleteColor: async (req, res) => {
    const json = { error: '', result: {} };
    const { pKey } = req.body;
    if (pKey) {
      await ColorsService.deleteColor(pKey);
      json.result = { pKey };
    } else {
      json.error = "Dados incorretos";
    }
    res.json(json);
  },
}