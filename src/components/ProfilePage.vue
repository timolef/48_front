<template>
    <v-app id="app" class="fill-height">
      <v-container fluid class="container-max-height">
        <v-row justify="center" align="center">
          <v-col cols="12" sm="8" md="6">
            <v-card elevation="4" class="profile-card">
              <v-card-title class="profile-title">
                <h2 class="headline">PROFIL</h2>
              </v-card-title>
              <v-divider></v-divider>
              <v-card-text class="profile-content">
                <v-list>
                  <v-list-item>
                    <v-list-item-content>
                      <v-list-item-title>Prénom :</v-list-item-title>
                      <v-list-item-subtitle>{{ firstname }}</v-list-item-subtitle>
                    </v-list-item-content>
                    <v-list-item-content>
                      <v-list-item-title>Nom :</v-list-item-title>
                      <v-list-item-subtitle>{{ name }}</v-list-item-subtitle>
                    </v-list-item-content>
                  </v-list-item>
                  <v-list-item>
                    <v-list-item-content>
                      <v-list-item-title>Email :</v-list-item-title>
                      <v-list-item-subtitle>{{ email }}</v-list-item-subtitle>
                    </v-list-item-content>
                    <v-list-item-content>
                      <v-list-item-title>Pseudo :</v-list-item-title>
                      <v-list-item-subtitle>{{ username }}</v-list-item-subtitle>
                    </v-list-item-content>
                  </v-list-item>
                <v-list-item>
                  <v-list-item-content>
                      <v-list-item-title>Date de naissance :</v-list-item-title>
                      <v-list-item-subtitle>{{ birthdate }}</v-list-item-subtitle>
                    </v-list-item-content>
                    <v-list-item-content>
                      <v-list-item-title>Genre :</v-list-item-title>
                      <v-list-item-subtitle>{{ gender }}</v-list-item-subtitle>
                    </v-list-item-content>
                </v-list-item>
                </v-list>
                
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-app>
  </template>
  
  <script>

  export default {
    data() {
      return {
        username: '',
        fullName: '',
        email: '',
        gender:'',
        birthdate: ''
      };
    },
    mounted() {
      this.fetchUserData();
    },
    methods: {
      async fetchUserData() {
        // Récupérer les informations de l'utilisateur depuis le local storage ou une API
        // Exemple de récupération à partir du local storage
        this.username = localStorage.getItem('username') || '';
        this.firstname = localStorage.getItem('firstname') || ''
        this.name = localStorage.getItem('lastname') || ''
        this.fullName = localStorage.getItem('firstname') + ' ' + localStorage.getItem('lastname') || '';
        this.email = localStorage.getItem('email') || '';
        this.gender = localStorage.getItem('gender')
        this.birthdate = localStorage.getItem('birthdate')
        const date = new Date(this.birthdate); // Convertir la chaîne de date en objet Date
        const day = String(date.getDate()).padStart(2, '0'); // Jour avec un zéro en tête si nécessaire
        const month = String(date.getMonth() + 1).padStart(2, '0'); // Mois avec un zéro en tête si nécessaire
        const year = date.getFullYear(); // Année
        this.birthdate = `${day}/${month}/${year}`;
        console.log("name : ", this.birthdate)
      },
      logout() {
        // Supprimer le token et les informations utilisateur du local storage
        localStorage.removeItem('token');
        localStorage.removeItem('username');
        localStorage.removeItem('firstname');
        localStorage.removeItem('lastname');
        localStorage.removeItem('email');
        localStorage.removeItem('birthdate');
        localStorage.removeItem('gender');
        
        // Redirection vers la page de connexion
        this.$router.push('/login');
      }
    }
  };
  </script>
  
  <style scoped>
  #app {
    height: 100vh;
    margin-top: 90px;
    background-color: #aedbdd;
}
  .headline {
    text-align: center;
    margin: 0;
  }
  
  .profile-card {
    margin-top: 20%;
    height: 350px;
    text-align: center;
    padding-bottom: 50px;
  }
  
  .profile-title {
    background-color: #FEF598;
    padding: 20px;
    text-align: center;
    color: #26AAAF;
  }
  .profile-content{
    margin-top: 25px;
  }
  .v-card-actions {
    justify-content: center;
  }
  </style>