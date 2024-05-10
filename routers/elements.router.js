const express = require('express');

const faker = require("faker");


const ElementsService = require('../services/ElementsService.service');
const elementService = new ElementsService();

const validatorHandler = require('./../middlewares/validator.handler');
const{createElementSchema, getElementSchema, updateElementSchema, updateElementSchemaName } = require('./../schemas/elements.schema');

const router = express.Router();

//Estados http: https://http.cat/

router.get("/", async (req, res)=> {
    let elements = await elementService.find();
    res.status(200).json(elements);
});

router.get("/:id", validatorHandler(getElementSchema,'params'), async (req, res, next)=> {
    const { id } = req.params;
    try{
        let elements = await elementService.findOne(id);
        res.status(200).json(elements);
    }catch(error){
        next(error)
    }
});

router.post("/", validatorHandler(createElementSchema, 'body'), async (req, res)=> {
    
        const { name, price, image, isBlock} = req.body;
        const element = await elementService.create({ name, price, image, isBlock});
        res.status(201).json(element);
});

router.put("/:id", validatorHandler(updateElementSchema, 'body'), async (req, res, next)=> {
    const { id } = req.params;
    const { name, price, image, isBlock} = req.body;
    try{
        const element = await elementService.update(id, { name, price, image, isBlock});
        res.status(200).json(element);
    }catch(error){
        next(error)
    }
});

router.patch("/:id/name", validatorHandler(getElementSchema,'params'), validatorHandler(updateElementSchemaName, 'body'), async (req, res, next)=> {
    const { id } = req.params;
    const { name } = req.body;
    try{
        const element = await elementService.update(id, { name });
        res.status(200).json(element);
    }catch(error){
        next(error)
    }
});

router.delete("/", validatorHandler(getElementSchema,'query'), async (req, res, next)=> {
    const { id } = req.query;
    try{
        const element = await elementService.delete(id);
        res.status(200).json(element);
    }catch(error){
        next(error)
    }
});

module.exports = router