const express = require('express');

const serviceExample = require('./service_example.router');

module.exports = (app) => {
    const router =  express.Router();
    app.use("/api/v1/", router);
    router.use("/elements", serviceExample);
    app.use("/service_example", serviceExample);
}