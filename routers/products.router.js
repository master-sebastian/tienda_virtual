const express = require('express');
const router = express.Router();
const ProductsService = require('../services/ProductsService.service');
const productsService = new ProductsService();

router.get("/", async (req, res)=> {
    const products = await productsService.find();
    return res.json(products);
})

router.get("/by_id/:id", async (req, res)=> {
    const { id } = req.params
    try{
        const product = await productsService.findOne(id);
        return res.json(product);
    }catch(error){
        console.log(error)
        return res.status(500).json("Error en consulta");
    }
    
})

router.post("/", async (req, res)=> {
    const { nombre, codigo, imagen, descripcion, cantidad, categoria_id, talla_id, dirigido_a_id, conctato_whatsapp_id} = req.body
    try{
        const product = await productsService.create({ nombre, codigo, imagen, descripcion, cantidad, categoria_id, talla_id, dirigido_a_id, conctato_whatsapp_id});
        return res.json(product);
    }catch(error){
        console.log(error)
        return res.status(500).json("Error en consulta");
    }
    
})


router.put("/:id", async (req, res)=> {
    const { id } = req.params
    const { nombre, codigo, imagen, descripcion, cantidad, categoria_id, talla_id, dirigido_a_id, conctato_whatsapp_id} = req.body
    try{
        const product = await productsService.update(id,{ nombre, codigo, imagen, descripcion, cantidad, categoria_id, talla_id, dirigido_a_id, conctato_whatsapp_id});
        return res.json(product);
    }catch(error){
        console.log(error)
        return res.status(500).json("Error en consulta");
    }
    
})

router.delete("/:id", async (req, res)=> {
    const { id } = req.params
    try{
        const product = await productsService.delete(id);
        return res.json(product);
    }catch(error){
        return res.status(500).json("Error en consulta");
    }
    
})

module.exports = router