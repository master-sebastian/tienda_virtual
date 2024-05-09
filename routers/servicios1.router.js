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
        image: faker.image.imageUrl(),
        action: "Read"
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
        image: faker.image.imageUrl(),
        action: "Created"
    });
});


router.put("/msg/:id", (req, res)=> {
    const { id } = req.params;
    const { code } = req.query;
    const { msg } = req.body;
    res.json({
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
    res.json({
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
    res.json({
        id : id,
        action: "Deleted"
    });
});

module.exports = router