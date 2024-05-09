const express = require('express');

const faker = require("faker");

const router = express.Router();

router.get("/msg/:id/:code", (req, res)=> {
    //Params en ruta
    const { id, code } = req.params;

    //Query params en ruta
    const { msg } = req.query;

    res.json({
        msg: msg, 
        id : id,
        code: code,
        name: faker.commerce.productName(),
        price: parseFloat(faker.commerce.price(), 10),
        image: faker.image.imageUrl()
    });
});


router.post("/msg/", (req, res)=> {
    const {id, msg, code } = req.body;

    res.json({
        msg: msg, 
        id : id,
        code: code,
        name: faker.commerce.productName(),
        price: parseFloat(faker.commerce.price(), 10),
        image: faker.image.imageUrl()
    });
});

module.exports = router