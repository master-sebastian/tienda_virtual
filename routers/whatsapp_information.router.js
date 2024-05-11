const express = require('express');
const router = express.Router();
const WhatsappInformacionService = require('../services/WhatsappInformacionService.service');
const whatsappInformacionService = new WhatsappInformacionService();

router.get("/", async (req, res)=> {
    const whatsappInformacion = await whatsappInformacionService.find();
    return res.json(whatsappInformacion);
})

module.exports = router