<template>
  <v-app class="nav2">
    <v-app-bar color="#26AAAF" class="nav" dark fixed height="90">
      <v-container fluid class="nav">
        <v-row align="center">
          <div class="logo" style="text-align: center;">
            <img style="height: 45px;" src="./../assets/logo.png"/>
          </div>
          <!-- Élément gauche -->
          <v-col cols="2" class="mr-auto">
            <p class="headline">Association 48 pour 100</p>
          </v-col>
          <!-- Élément central (onglets) -->
          <v-col class="text-center" cols="8">
            <v-tabs v-model="activeTab" background-color="transparent" grow>
              <v-tab v-for="(item, index) in tabs" :key="index" :to="item.link" class="white--text">{{ item.text }}</v-tab>
              <v-tab v-if="isAdmin == 1" to="/admin" class="white--text">Admin</v-tab>
            </v-tabs>
          </v-col>
          <!-- Élément droit (Menu déroulant) -->
          <v-col cols="auto">
            <v-menu offset-y>
              <template v-slot:activator="{ on }">
                <v-btn class="icon-btn" v-on="on" color="#FEF598" style="color:#26AAAF">
                  <v-icon>mdi-cog</v-icon>
                </v-btn>
              </template>
              <v-list>
                <v-list-item link>
                  <v-list-item-title @click="goToProfile">Profil</v-list-item-title>
                </v-list-item>
                <v-list-item link>
                  <v-list-item-title @click="logout">Déconnexion</v-list-item-title>
                </v-list-item>
              </v-list>
            </v-menu>
          </v-col>
        </v-row>
      </v-container>
    </v-app-bar>
  </v-app>
</template>

<script>
export default {
  data() {
    return {
      activeTab: null,
      isAdmin: false,
      tabs: [
        { text: 'Accueil', link: '/home' },
        { text: 'à propos', link: '/about' },
        { text: 'Publications', link: '/news' },
        { text: 'Nous contacter', link: '/contact' },
        { text: 'Ressources', link: '/ressources' },
        { text: 'Nos membres', link: '/members' },
      ]
    };
  },
  mounted() {
    this.isAdmin = localStorage.getItem("isAdmin")
  },
  methods: {
    logout() {
      // Supprimer le token et autres informations de l'utilisateur du local storage
      localStorage.removeItem('token');
      localStorage.removeItem('username');
      localStorage.removeItem('firstname');
      localStorage.removeItem('lastname');
      localStorage.removeItem('email');
      
      // Rediriger vers la page de connexion
      this.$router.push('/login');
    },
    goToProfile() {
      // Rediriger vers la page de profil
      this.$router.push('/profil');
    }
  }
};
</script>

<style scoped>
#app {
  color: black;
  height: 0px;
}

.logout {
  color: #FEF598;
}

.headline {
  color: #FFFFFF;
  text-align: center;
  font-size: 28px !important;
}

.icon-btn {
  color: #FEF598;
}


</style>