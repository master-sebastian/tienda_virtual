const express = require('express');

const faker = require("faker");

const router =express.Router();

router.get("/", (req, res)=> {
    res.send("Servicio inicial");
});

router.get("/json", (req, res)=> {
    res.json({msg:"Servicio inicial"});
});

router.get("/json/:id", (req, res)=> {
    //Parametros en ruta
    const { id } = req.params;
    res.json({
        msg:"Bienvenido", 
        id : id, 
        name: faker.commerce.productName(),
        price: parseFloat(faker.commerce.price(), 10),
        image: faker.image.imageUrl()
    });
});

router.get("/json/msg/:id", (req, res)=> {
    //Params en ruta
    const { id } = req.params;

    //Query params en ruta
    const { msg } = req.query;

    res.json({msg:msg, id : id});
});

module.exports = router