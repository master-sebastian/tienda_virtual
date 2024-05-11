const express = require('express');
const router = express.Router();
const AimedAtService = require('../services/AimedAtService.service');
const aimedAtService = new AimedAtService();

router.get("/", async (req, res)=> {
    const aimedAt = await aimedAtService.find();
    return res.json(aimedAt);
})

module.exports = router