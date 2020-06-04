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
            <v-col class="text-center">  <Meet/>
            </v-col>
          </v-row>
        </v-container>
      </v-content>
    </v-app>
  </v-app>
</template>

<script>
import firebase from "firebase";
import Meet from './Meet.vue';

export default {

  
  data() {
    return {
      drawer: null,
    };
  },
  components: {
    Meet
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
