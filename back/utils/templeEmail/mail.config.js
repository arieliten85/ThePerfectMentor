
const nodemailer = require("nodemailer");

const mail = {
    user:"proyectoTPM01@gmail.com",
    pass: "kfjnowtfbafxbqgc"
}

let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    auth: {
    user: mail.user, // generated ethereal user
    pass: mail.pass, // generated ethereal password
    },
  });

  const sendEmail = async (email,subject,html) =>{

    try{
      await transporter.sendMail({
        from: `The Perfect Mentor < ${mail.user}>`,
        to: email,
        subject,
        text: "Hola, por favor acepte este mail para que su vuenta sea verificada", // plain text body
        html,
      });
    }
    catch(error){
      console.log("Algo no va bien con el email",error)
    }
  }
 
const getTemplate = (name,token)=>{
    return `
    <head>
        <link rel="stylesheet" href="./style.css">
    </head>

    <div id="email___content">
        <img src="https://user-images.githubusercontent.com/88351452/209997328-e7eef747-e5b6-465f-ac24-64c8d287b29e.png" alt="">
        <h2>Hola ${name}</h2>
        <p>Para confirmar tu cuenta, ingresa al siguiente enlace</p>
        <a
            href="http://localhost:3030/api/user/confirm ${token}"
            target="_blank"
        >Confirmar Cuenta</a>
    </div>
    `
}

module.exports={ sendEmail, getTemplate }