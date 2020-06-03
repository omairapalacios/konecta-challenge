<template>
  <v-app id="inspire">
    <v-app id="inspire">
      <v-content>
        <v-container class="fill-height" fluid>
          <v-row align="center" justify="center">
            <v-col cols="12" sm="8" md="4">
              <v-card class="elevation-12">
                <v-toolbar color="teal" dark flat>
                  <v-img
                    src="../assets/logokonecta.png"
                    aspect-ratio="20"
                    contain
                  ></v-img>
                </v-toolbar>
                 <v-form @submit.prevent="login">
                <v-card-text>
                    <v-text-field
                      label="Usuario"
                      name="user"
                      prepend-icon="mdi-account"
                      type="text"
                      required
                      v-model="user"
                    />

                    <v-text-field
                      id="password"
                      label="Contraseña"
                      name="password"
                      prepend-icon="mdi-lock"
                      type="password"
                      required
                      v-model="password"
                    />
                    <v-alert dense outlined type="error" v-if="msgError">{{msgError}}</v-alert>
                  
                </v-card-text>
                <v-card-actions class="justify-center">
                  <v-btn
                    color="teal"
                    class="white--text"
                    width="200"
                    type="submit"
                    >Ingresar</v-btn
                  >
                </v-card-actions>
                </v-form>
              </v-card>
            </v-col>
          </v-row>
        </v-container>
      </v-content>
    </v-app>
  </v-app>
</template>

<script>
import firebase from 'firebase';
export default {
  data() {
    return {
      user: "",
      password: "",
      msgError: "",
    };
  },
  methods: {
    login() {
      firebase
        .auth()
        .signInWithEmailAndPassword(this.user, this.password)
        .then((user) => {
          console.log(user);
          
        })
        .catch((err) => {
          console.log(err);
          
          switch (err.code) {
            case "auth/user-not-found":
              this.msgError = "El usuario no esta registrado";
              break;
            case "auth/wrong-password":
              this.msgError = "La contraseña es incorrecta";
              break;
            case "auth/invalid-email":
              this.msgError = "El correo electrónico no es válido";
              break;
            default:
              this.msgError = "Error";
          }
          
        });
    },
  },
};
</script>
