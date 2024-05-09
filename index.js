const express = require('express');
const faker = require("faker");
const app = express();
const port =  3000;

app.get("/", (req, res)=> {
    res.send("Servicio inicial");
});

app.get("/json", (req, res)=> {
    res.json({msg:"Servicio inicial"});
});

app.get("/json/:id", (req, res)=> {
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

app.get("/json/msg/:id", (req, res)=> {
    //Params en ruta
    const { id } = req.params;

    //Query params en ruta
    const { msg } = req.query;

    res.json({msg:msg, id : id});
});

app.listen(port, ()=>{
    console.log("Server, port"+port);
});