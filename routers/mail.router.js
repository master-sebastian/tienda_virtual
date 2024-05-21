const express = require('express');
const MailService = require('../services/MailService.service');
const mailService = new MailService();

const router = express.Router();

router.post("/", async (req, res)=> { 
    
    const { numberPhone, msg, email } = req.body;
    
    const html = `  <h1>Información de contacto</h1>
                    <br>
                    <b>Correo de contacto:</b> ${email} 
                    <br>
                    <b>Mensaje:</b> ${msg}
                    <br>
                    <b>Numero de celular/telefono:</b> ${numberPhone}`; 
    const subject = "Información del formulario de contactanos";


    try{
        const response1 = await mailService.send({from: process.env.SMTP_AUTH_USER, subject, to: process.env.SMTP_AUTH_USER, subject, text: "", html});
        const response = await mailService.send({from: process.env.SMTP_AUTH_USER, subject, to: email, subject, text: "", html});

        if(response === undefined){
            res.status(201).json({msg: "Se no se puedo enviar la información, espero unos segundos y vuelta a intentarlo"});
        }
        res.status(201).json({msg: "Se envio la información"});
    }catch(error){
        res.status(201).json({msg: "Se no se puedo enviar la información, espero unos segundos y vuelta a intentarlo"});
    }

});

module.exports = router