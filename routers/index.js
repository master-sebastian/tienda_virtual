const express = require('express');

const serviceExample = require('./elements.router');
const mailGuti = require('./mail_guti.router');

module.exports = (app) => {
    const router =  express.Router();
    app.use("/api/v1/", router);

    router.use("/elements", serviceExample);
    router.use("/mail", mailGuti);

    app.use("/todos", (req, res)=>{
        res.render("service_example/index")
    })

}