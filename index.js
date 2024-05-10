require('dotenv').config()

const express = require('express');
const cors = require('cors')
const whitelist = require("./whitelist");
const app = express();
const port =  process.env.PORT || 3000;
const path = require('path');

app.use(express.static(path.join(__dirname, "public")));
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.json());

const routers = require("./routers");
const { logErrors, errorHandler, boomErrorHandler } = require('./middlewares/error.handler');

routers(app);

app.use(cors({
    origin:(origin,callback)=>{
        if(whitelist.includes(origin) || !origin){
            callback(null,true);
        }else{
            callback(new Error('no permitido'));
        }
    }
}));

app.use(logErrors);
app.use(boomErrorHandler);
app.use(errorHandler);

app.listen(port, ()=>{
    console.log("Server, port: "+port);
});

module.exports = app;