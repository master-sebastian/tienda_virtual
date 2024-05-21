const express = require('express');

//const elements = require('./elements.router');
const mail = require('./mail.router');
const categories = require('./categories.router');
const aimed_at = require('./aimed_at.router');
const whatsapp_information = require("./whatsapp_information.router");
const sizes = require('./sizes.router');
const products = require('./products.router');
const auth = require("./auth.router");

module.exports = (app) => {
    const router =  express.Router();
    app.use("/api/v1/", router);

    //router.use("/elements", elements);
    router.use("/categories", categories);
    router.use("/aimed_at", aimed_at);
    router.use("/whatsapp_information", whatsapp_information);
    router.use("/sizes", sizes);
    router.use("/products", products);
    router.use("/mail", mail);
    router.use("/auth", auth);


    app.get("/login", (req, res)=>{
        res.render("login/index")
    })

    app.get("/product", (req, res)=>{
        res.render("product/create")
    })
    app.get("/product_edit", (req, res)=>{
        res.render("product/edit")
    })

    app.get("/", (req, res)=>{
        res.render("index")
    })
}