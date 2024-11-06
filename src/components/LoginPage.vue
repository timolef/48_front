<template>
  <v-app id="app" class="fill-height text-center">
    <v-container fluid>
      <v-row justify="center" align="center">
        <v-col cols="12" sm="4" md="4">
          <v-card elevation="4" light>
            <v-card-title>
              <h3 class="headline">48% - Connexion</h3>
            </v-card-title>
            <v-divider></v-divider>
            <v-card-text>
              <v-form @submit.prevent="login">
                <v-text-field label="Email" type="text" v-model="email" outlined></v-text-field>
                <v-text-field label="Password" type="password" v-model="password" outlined hide-details></v-text-field>
              </v-form>
              <v-alert v-if="errorMessage" type="error">{{ errorMessage }}</v-alert>
            </v-card-text>
            <v-divider></v-divider>
            <v-card-actions>
              <v-btn color="#26AAAF" text @click="forgotPassword" to="/register">S'inscrire ?</v-btn>
              <v-spacer></v-spacer>
              <v-btn color="#26AAAF" large @click="login">Connexion</v-btn>
            </v-card-actions>
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
      password: null,

      username: null,
      errorMessage: null
    };
  },
  methods: {
    async login() {
      try {
        // Envoi des informations de connexion au serveur
        const response = await fetch('http://localhost:3000/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            email: this.email,
            password: this.password
          })
        });

        // Vérification du statut de la réponse
        if (!response.ok) {
          // Affichage du message d'erreur si la connexion a échoué
          const errorData = await response.json();
          this.errorMessage = errorData.message;
          return;
        }
        console.log(response.json)
        // Récupération du token d'authentification si la connexion est réussie
        const { userId, token, username, firstname, name, email, birthdate, gender, isAdmin } = await response.json();

        // Stockage du token dans le localStorage
        localStorage.setItem('token', token);

        // Stockage d'autres informations utilisateur dans le localStorage
        localStorage.setItem('userId', userId);
        localStorage.setItem('username', username);
        localStorage.setItem('firstname', firstname);
        localStorage.setItem('lastname', name);
        localStorage.setItem('email', email);
        localStorage.setItem('birthdate', birthdate);
        localStorage.setItem('gender', gender);
        localStorage.setItem('isAdmin', isAdmin);
        console.log(localStorage.getItem('email'))
        // Stockage du token dans le localStorage ou dans un cookie
        localStorage.setItem('token', token);
        this.$router.push('/home');

        // Redirection vers la page d'accueil ou une autre page
        // router.push('/home');
      } catch (error) {
        console.error('Erreur lors de la connexion :', error);
        this.errorMessage = 'Erreur lors de la connexion';
      }
    },
    forgotPassword() {
      // Logique pour la réinitialisation du mot de passe
    }
  }
};
</script>

<style scoped>
.headline {
  color: #26AAAF;
}
#app {
    background-color: #aedbdd;
  }
.v-card {
  background-color: #FEF598;
  margin-top: 30%;
}
</style>