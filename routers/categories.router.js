const express = require('express');
const CategoriesService = require('../services/CategoriesService.service');
const categoriesService = new CategoriesService();
const router = express.Router();

router.get("/", async (req, res)=> {
    const categories = await categoriesService.find();
    return res.json(categories);
})

module.exports = router