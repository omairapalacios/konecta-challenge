const functions = require("firebase-functions");
const admin = require("firebase-admin");
const nodemailer = require("nodemailer");
admin.initializeApp();
require("dotenv").config();

const { SENDER_EMAIL, SENDER_PASSWORD } = process.env;

exports.sendEmailNotification = functions.firestore
    .document("meets/{docId}")
    .onCreate((snap, ctx) => {
        const data = snap.data();
        console.log(data);
        let authData = nodemailer.createTransport({
            service: "gmail", //smtp.gmail.com  //in place of service use host...
            secure: false, //true
            port: 25, //465
            auth: {
                user: SENDER_EMAIL,
                pass: SENDER_PASSWORD,
            },
            tls: {
                rejectUnauthorized: false,
            },
        });
        authData
            .sendMail({
                from: "konectameet@gmail.com",
                to: `${data.emailPostulante},${data.emailEntrevistador}`,
                subject: "ENTREVISTA KONECTA",
                html: `<html>
                        <p>Estimado postulante nos emociona comunicarte que  has sido seleccionado para una entrevista virtual. El dia : ${data.dateAndTime}:</p>
                        <a href="${data.linkMeet}"> LINK DE LA VIDEOLLAMADA </a>
                        </html>`,
            })
            .then((res) => console.log("Correo enviado exitosamente"))
            .catch((err) => console.log(err));
    });
