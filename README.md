# KONECTA MEET 
>  Aplicación web usando VueJS, VuetifyJS, NodeJs, Firestore , Cloud Functions, Nodemailer y Twilio

## Contexto

Por diferentes razones: educación, intermitencia del servicio, etc. La aplicación actual no está enviando las agendas a los postulantes y evaluadores de nivel 2.

## Investigación

Antes de establecer mis propuestas de posibles soluciones, quize indagar un poco
más en la herremienta utilizada actualmente para generar los eventos : **Google Calendar API**, realizé pruebas con la ayuda de su documentación para entender su funcionamiento y experimenté el mismo problema con respecto al envío de la notificación a los participantes al crear un evento. Pero también pude notar que se puede utilizar data importante que se genera al crear una cita como : la fecha/hora de la entrevista y el link generado para la reunión virtual ( Google Meet ).


##  Propuestas

 Utilizar la data generada en la creación de la cita y la información de los partipantes para enviarla a cada uno de ellos : **Postulante y Entrevistador 2** al mismo tiempo en que esta se crea a través de :

**ENVIO DE NOTIFICACIÓN DE LA CITA A TRAVÉS DE CORREO**
 
Se utilizarían las siguiente herramientas: 
 
 -  **Nodemailer** : es un módulo para aplicaciones Node.js que permite el envío de correos electrónicos de forma sencilla.
 - **Cloud Functions** : permiten que los cambios en los registros de bases de datos (Firestore) se ejecutén y gestionen de manera automática.

**ENVIO DE NOTIFICACIÓN DE LA CITA A TRAVÉS DE SMS**
 
Se utilizarían las siguiente herramientas: 
**Twilio** : Api que permite el envío y recepción mensajes de texto programables.


El avance de ambas propuestas fueron implementadas y se pueden visualizar aquí:  [KONECTA MEEET CHALLENGE ](https://konectameet.web.app/)

![img-project](https://github.com/omairapalacios/konecta-challenge/blob/master/src/assets/project.png)
