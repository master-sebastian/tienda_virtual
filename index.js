const express = require('express');
const app = express();
const port =  3000;
app.use(express.json());
const routers = require("./routers");
const { logErrors, errorHandler, boomErrorHandler } = require('./middlewares/error.handler');
routers(app);
app.use(logErrors);
app.use(boomErrorHandler);
app.use(errorHandler);

app.listen(port, ()=>{
    console.log("Server, port"+port);
});