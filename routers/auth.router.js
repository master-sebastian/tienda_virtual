const express = require('express');
const router = express.Router();
const jwt = require("jsonwebtoken");
const AuthService = require("./../services/AuthService.service")
const authService = new AuthService();
const { verifyTokeyJWT } = require("./../middlewares/verifyTokeyJWT");

router.post("/login", async (req, res)=> {
    
    const { user, password} = req.body;
    try{
        const flag = await authService.verify({user, password})
        if(flag){
            jwt.sign({user, password}, process.env.SECRET_KEY_JWT,{expiresIn: process.env.SECRET_KEY_JWT_EXPERIRES_IN}, (err, token) => {
                res.json({token})
            })
        }else{
            res.status(400).json({msg: "El usuario o contraseña no son validas."});
        }
        
    }catch(error){
        res.status(500).json({msg: "No se puedo procesar su petición, intentelo en unos minutos."});
    }
})

router.post("/verify", verifyTokeyJWT, async (req, res) => {
    res.json({msg:"ok"});
})

module.exports = router  