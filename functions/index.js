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
to:`${data.email}`,
subject:'ENTREVISTA KONECTA',
text:`${data.linkMeet}`,
html:`${data.linkMeet}`,
})
.then(res=>console.log('Correo enviado exitosamente'))
.catch(err=>console.log(err));

});