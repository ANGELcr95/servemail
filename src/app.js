const { urlencoded } = require("express");
const express = require("express");
const sendEmail = require("./utils/nodemailer");
const cors = require("cors");
const fs = require("fs/promises");
const path = require("path");
const ejs = require("ejs");

const app = express();
app.use(cors());
app.use(express.json());
app.use(urlencoded({extended: true}));


app.post("/enviar-correo", async(req, res, next) => {
    try{
        const { to, contacto, valor_total, direccion, forma_pago_id, ciudad_corres_desc, items} = req.body;
        console.log(req.body)
        const pathTemplate = path.resolve("src", "views/email_templates", "mailBuy.ejs");
        const template = await ejs.renderFile(pathTemplate, {contacto: contacto, valor_total: valor_total, direccion: direccion, forma_pago_id:forma_pago_id,ciudad_corres_desc:ciudad_corres_desc, items:items});
        const options = {
            subject:"Distribuidora_negociemos <distribuidora_negociemos@distribuidora.co>",
            html: template,
            to,
            from: "distribuidora_negociemos <distribuidora@negociemos.com>"
        };
    
        const response = await sendEmail(options);
    
        res.json(response);
    }catch(error){

        console.log(error);
    }   
});

app.post("/auth-login", async(req, res, next) => {
    try{
        const { to ,token} = req.body;
        const urlToken = token.split("//")

        console.log(urlToken[1])

        const scrt_var = urlToken[1];
        const strLink = "http://localhost:3000/#/verificacion/"+  scrt_var;
        console.log(strLink)
        const pathTemplate = path.resolve("src", "views/email_templates", "authLogin.ejs");
        const template = await ejs.renderFile(pathTemplate, {link: strLink});
        const options = {
            subject:"link negociemos",
            html: template,
            to,
            from: "Distribuidora_negociemos <distribuidora_negociemos@distribuidora.co>"
        };
    
        const response = await sendEmail(options);
    
        res.json(response);
    }catch(error){
        console.log(error);
    }   
});

module.exports = app;