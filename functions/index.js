const functions = require('firebase-functions')
const admin=require('firebase-admin');
const nodemailer =require('nodemailer');
admin.initializeApp()
require('dotenv').config()

const {SENDER_EMAIL,SENDER_PASSWORD}= process.env;

exports.sendEmailNotification=functions.firestore.document('meets/{docId}')
.onCreate((snap,ctx)=>{
    const data=snap.data();
    let authData=nodemailer.createTransport({
        host:'smtp.gmail.com',
        port:465,
        secure:true,
        auth:{
            user:SENDER_EMAIL,
            pass:SENDER_PASSWORD
        }
    });
authData.sendMail({
from :'konectameet@gmail.com',
to:`${data.emailEntrevistador}${data.emailPostulante}`,
subject:'ENTREVISTA KONECTA',
text:`Estimado postulante nos emociona comunicarte que  has sido seleccionado para una entrevista virtual. Puedes revisar los detalles aqui: ${data.linkMeet}.`,
html:`<p>TALENTO KONECTA`,
})
.then(res=>console.log('Correo enviado exitosamente'))
.catch(err=>console.log(err));

});