const express = require('express');
const router = express.Router();
const SizesService = require('../services/SizesService.service');
const sizesService = new SizesService();

router.get("/", async (req, res)=> {
    const sizes = await sizesService.find();
    return res.json(sizes);
})

module.exports = router