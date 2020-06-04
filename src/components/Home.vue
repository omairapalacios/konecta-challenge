<template>
  <v-app id="inspire">
    <v-app id="inspire">
      <v-navigation-drawer v-model="drawer" app>
        <v-list dense>
          <v-list-item link>
            <v-list-item-action>
              <v-icon>mdi-home</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>Inicio</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item link>
            <v-list-item-action>
              <v-icon>mdi-logout</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title link @click.prevent="logOut">Cerrar Sesión</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-navigation-drawer>

      <v-app-bar app color="teal" dark>
        <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
        <v-img
          src="../assets/logokonecta.png"
          aspect-ratio="40"
          contain
        ></v-img>
      </v-app-bar>

      <v-content>
        <v-container class="fill-height" fluid>
          <v-row align="center" justify="center">
            <v-col class="text-center">
              <v-tooltip left>
                <template v-slot:activator="{ on }">
                  <v-btn :href="source" icon large target="_blank" v-on="on">
                    <v-icon large>mdi-code-tags</v-icon>
                  </v-btn>
                </template>
                <span>Source</span>
              </v-tooltip>
            </v-col>
          </v-row>
        </v-container>
      </v-content>
      <v-footer color="teal" class="justify-center" app>
        <span class="white--text">&copy; Omaira Palacios 2019</span>
      </v-footer>
    </v-app>
  </v-app>
</template>

<script>
import firebase from "firebase";
export default {
  data() {
    return {
      drawer: null,
    };
  },
  methods: {
    logOut() {
      firebase
        .auth()
        .signOut()
        .then(() => {
          this.$router.replace({ path: "/login" });
        })
        .catch(() => {
          // An error happened.
        });
    },
  },
};
</script>
