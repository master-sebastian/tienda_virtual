const express = require('express');

const faker = require("faker");


const ElementsService = require('./../services/ElementsServices.service');
const elementService = new ElementsService();

const router = express.Router();

//Estados http: https://http.cat/

router.get("/msg/:id/:code", (req, res)=> {
    //Params en ruta
    const { id, code } = req.params;

    //Query params en ruta
    const { msg } = req.query;
    
    res.status(200).json({
        msg: msg, 
        id : id,
        code: code,
        name: faker.commerce.productName(),
        price: parseFloat(faker.commerce.price(), 10),
        image: faker.image.imageUrl(),
        action: "Read",
        list: elementService.find()
    });
});


router.post("/msg/", (req, res)=> {
    const {id, msg, code } = req.body;
    res.status(201).json({
        msg: msg, 
        id : id,
        code: code,
        name: faker.commerce.productName(),
        price: parseFloat(faker.commerce.price(), 10),
        image: faker.image.imageUrl(),
        action: "Created"
    });
});


router.put("/msg/:id", (req, res)=> {
    const { id } = req.params;
    const { code } = req.query;
    const { msg } = req.body;
    res.status(200).json({
        msg: msg, 
        id : id,
        code: code,
        name: faker.commerce.productName(),
        price: parseFloat(faker.commerce.price(), 10),
        image: faker.image.imageUrl(),
        action: "Updated put"
    });
});

router.patch("/msg/:id", (req, res)=> {
    const { id } = req.params;
    const { code } = req.query;
    const { msg } = req.body;
    res.status(201).json({
        msg: msg, 
        id : id,
        code: code,
        name: faker.commerce.productName(),
        price: parseFloat(faker.commerce.price(), 10),
        image: faker.image.imageUrl(),
        action: "Updated patch"
    });
});


router.delete("/msg/:id", (req, res)=> {
    const { id } = req.params;
    res.status(200).json({
        id : id,
        action: "Deleted"
    });
});

module.exports = router