require('dotenv').config();

const accountSid = process.env.ACCOUNT_SID;
const authToken = process.env.AUTH_TOKEN;
const myPhoneNumber = process.env.MY_PHONE_NUMBER;

console.log(accountSid, authToken, myPhoneNumber)
const cliente = require("twilio")(accountSid, authToken);

cliente.messages.create({
  to: myPhoneNumber,
  from: "+12058610932",
  body:
    "KONECTA: Estimado postulante has sido seleccionado para una entrevista virtual, revisa tu correo electrónico donde encontratas el link y la información al respecto.",
})
.then((message) => console.log(message.sid))
.catch((error) => console.log(error));
