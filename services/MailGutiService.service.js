const boom = require("@hapi/boom")

class MailGutiService {
    
    constructor() {}

    async send(options) { 

        const {from, to, subject, text, html} = options;

        const nodemailer = require("nodemailer");

        const transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST,
            port: process.env.SMTP_PORT,
            secure: process.env.SMTP_SECURE, // Use `true` for port 465, `false` for all other ports
            auth: {
                user: process.env.SMTP_AUTH_USER,
                pass: process.env.SMTP_AUTH_PASS,
            },
        });

        const info = await transporter.sendMail({from, to, subject, text, html});
        
        return info.messageId;
    }

}
module.exports = MailGutiService;