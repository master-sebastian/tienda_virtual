const express = require('express');
const app = express();
const port =  3000;
const routers = require("./routers");
routers(app);
app.listen(port, ()=>{
    console.log("Server, port"+port);
});