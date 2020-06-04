<template>
  <v-card class="mb-5">
    <v-card-title class="justify-center">
      <h3>AGENDAR ENTREVISTA</h3>
    </v-card-title>
    <v-divider></v-divider>
    <v-form ref="form">
      <v-card-text>
        <v-container>
          <p><strong>DATOS DEL POSTULANTE</strong></p>

          <v-row class="mt-4 mb-5">
            <v-col cols="6" sm="6" md="6" class="py-0">
              <v-text-field
                label="Nombre Postulante"
                v-model="dataMeet.namePostulante"
                :rules="[rules.required]"
                :error-messages="msgError"
                required
              ></v-text-field>
            </v-col>
            <v-col cols="6" sm="6" md="6" class="py-0">
              <v-text-field
                v-model="dataMeet.emailPostulante"
                :rules="[rules.required, rules.email]"
                :error-messages="msgError"
                label="E-mail"
              ></v-text-field>
            </v-col>
            <v-col cols="6" sm="6" md="6" class="py-0">
              <v-text-field
                v-model="dataMeet.cellphonePostulante"
                :rules="[rules.required, rules.cellphone]"
                :error-messages="msgError"
                label="Celular"
                placeholder="920753323"
                counter="9"
                required
              ></v-text-field>
            </v-col>
          </v-row>
          <p><strong>DATOS DEL ENTREVISTADOR</strong></p>
          <v-row class="mt-4 mb-5">
            <v-col cols="6" sm="6" md="6" class="py-0">
              <v-text-field
                label="Nombre Entrevistador"
                v-model="dataMeet.nameEntrevistador"
                :rules="[rules.required]"
                :error-messages="msgError"
                required
              ></v-text-field>
            </v-col>
            <v-col cols="6" sm="6" md="6" class="py-0">
              <v-text-field
                v-model="dataMeet.emailEntrevistador"
                :rules="[rules.required, rules.email]"
                :error-messages="msgError"
                label="E-mail"
              ></v-text-field>
            </v-col>
            <v-col cols="6" sm="6" md="6" class="py-0">
              <v-text-field
                v-model="dataMeet.cellphoneEntrevistador"
                :rules="[rules.required, rules.cellphone]"
                label="Celular"
                placeholder="920753323"
                counter="9"
                required
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row class="mt-4 mb-5 justify-center">
            <v-col cols="6" sm="6" md="6" class="py-0">
              <v-icon>mdi-calendar</v-icon>
              <label class="font-weight-bold" for="startDate" slot="before">
                FECHA Y HORA ENTREVISTA</label
              >
              <datetime
                v-model="dataMeet.dateAndTime"
                placeholder="Seleccione"
                type="datetime"
                required
                :rules="[rules.required]"
                :error-messages="msgError"
                input-class="startDate"
                value-zone="America/Lima"
                zone="America/Lima"
                :format="{
                  year: 'numeric',
                  month: 'numeric',
                  day: 'numeric',
                  hour: 'numeric',
                  minute: '2-digit',
                }"
                :phrases="{ ok: 'Continuar', cancel: 'Cerrar' }"
                :hour-step="2"
                :minute-step="15"
                use12-hour
                auto
              >
              </datetime>
            </v-col>
          </v-row>
          <v-row justify="center">
            <v-dialog v-model="dialog" max-width="290">
              <v-card>
                <v-card-title class="headline">INFO KONECTA</v-card-title>

                <v-card-text>
                  La entrevista a sido agendada exitosamente. Se notificó 
                  a los participantes por mensaje de texto.
                </v-card-text>

                <v-card-actions>
                  <v-spacer></v-spacer>

                  <v-btn color="teal" text @click="dialog = false">
                    ACEPTAR
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
          </v-row>
        </v-container>
      </v-card-text>

      <v-card-actions class="justify-center pb-5">
        <v-icon>mdi-video</v-icon>
        <v-btn color="teal" class="white--text" @click="handleAuthClick()"
          >AUTENTICARSE</v-btn
        >
        <v-btn color="teal" class="white--text" @click="createMeet()"
          >crear entrevista</v-btn
        >
      </v-card-actions>
    </v-form>
  </v-card>
</template>

<script>
import { Datetime } from "vue-datetime";
import gapi from "gapi-client";

const CLIENT_ID =
  "316561941861-0vv84j8uid9urt0r2mktj2k9c41llg32.apps.googleusercontent.com";
const API_KEY = "AIzaSyCfwKokz0DE10qz5nJs2sM9A_i5rxahSV4";
const DISCOVERY_DOCS = [
  "https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest",
];

const SCOPES =
  "https://www.googleapis.com/auth/calendar https://www.googleapis.com/auth/calendar.events";

export default {
  data() {
    return {
      dialog: false,
      api: undefined,
      authorized: false,
      datetimeEmpty: "",
      msgError: "",
      dataMeet: [
        {
          namePostulante: "",
          nameEntrevistador: "",
          cellphonePostulante: "",
          cellphoneEntrevistador: "",
          emailPostulante: "",
          emailEntrevistador: "",
          dateAndTime: "",
        },
      ],
      rules: {
        required: (value) => !!value || "el campo es requerido",
        email: (value) => {
          const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
          return pattern.test(value) || "el correo eléctronico es inválido";
        },
        cellphone: (value) =>
          (!!value && value.length <= 25) || "El celular debe tener 9 digitos",
      },
    };
  },
  created() {
    this.handleClientLoad();
  },
  components: {
    datetime: Datetime,
  },
  methods: {
    handleClientLoad() {
      gapi.load("client:auth2", this.initClient);
    },
    initClient() {
      gapi.client
        .init({
          apiKey: API_KEY,
          clientId: CLIENT_ID,
          discoveryDocs: DISCOVERY_DOCS,
          scope: SCOPES,
        })
        .then(() => {
          gapi.auth2.getAuthInstance().isSignedIn.listen(this.authorized);
        });
    },

    handleAuthClick() {
      Promise.resolve(gapi.auth2.getAuthInstance().signIn()).then(() => {
        this.authorized = true;
      });
    },

    handleSignoutClick() {
      Promise.resolve(gapi.auth2.getAuthInstance().signOut()).then(() => {
        this.authorized = false;
      });
    },

    createMeet() {
      const meet = {
        summary: "Konecta Challenge",
        location: "Lima-Perú",
        description: "Reto Frontend",
        start: {
          dateTime: this.dataMeet.dateAndTime,
        },
        end: {
          dateTime: this.dataMeet.dateAndTime,
        },
        attendees: [
          { email: this.dataMeet.emailPostulante },
          { email: this.dataMeet.emailEntrevistador },
        ],
        conferenceData: {
          createRequest: {
            requestId: "hangoutsMeet",
          },
          reminders: {
            useDefault: false,
            overrides: [
              { method: "email", minutes: 24 * 60 },
              { method: "popup", minutes: 10 },
            ],
          },
          sendNotifications: true,
        },
      };

      return gapi.client.calendar.events
        .insert({
          calendarId: "omairapalacios95@gmail.com",
          resource: meet,
        })
        .then((res) => {
          this.dialog = true;
          console.log(res.result.htmlLink);
          console.log(res.result.htmlLink);
          console.log(res.result.attendees[0].email)
          console.log(res.result.attendees[1].email)
        })

        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>
