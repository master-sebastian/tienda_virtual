const express = require('express');

const servicios1 = require('./servicios1.router');

module.exports = (app) => {
    const router =  express.Router();
    app.use("api/v1", router);
    router.use("servicios1", servicios1);
    app.use("servicios1", servicios1);
}