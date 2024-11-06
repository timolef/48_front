<template>
  <v-app id="app" class="fill-height text-center">
    <v-container fluid>
      <v-row justify="center" align="center">
        <v-col cols="12" sm="6" md="6">
          <v-card elevation="1" light>
            <v-card-title>
              <h3 class="headline">48% - Inscription</h3>
            </v-card-title>
            <v-divider></v-divider>
            <v-card-text>
              <v-form @submit.prevent="submitForm">
                <v-row>
                  <v-col cols="12" sm="6">
                    <v-text-field label="Prénom" type="text" v-model="firstname" outlined></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6">
                    <v-text-field label="Nom" type="text" v-model="name" outlined></v-text-field>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="12" sm="12">
                    <v-text-field label="Pseudo" type="text" v-model="username" outlined></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="12">
                    <v-text-field label="Email" type="email" v-model="email" outlined></v-text-field>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="12" sm="6">
                    <v-text-field label="Mot de passe" type="password" v-model="password" outlined></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6">
                    <v-text-field label="Confirmez le mot de passe" type="password" v-model="confirmPassword" outlined ></v-text-field>
                  </v-col>
                </v-row>
                <!-- Ajout de la date de naissance avec un calendrier -->
                <v-row>
                  <v-col cols="12" sm="6">
                    <v-menu
                      ref="menu"
                      v-model="menu"
                      :close-on-content-click="false"
                      :nudge-right="40"
                      :return-value.sync="birthdate"
                      transition="scale-transition"
                      offset-y
                      min-width="290px"
                    >
                      <template v-slot:activator="{ on, attrs }">
                        <v-text-field
                          v-model="birthdate"
                          label="Date de naissance"
                          prepend-icon="mdi-calendar"
                          readonly
                          v-bind="attrs"
                          v-on="on"
                          outlined
                        ></v-text-field>
                      </template>
                      <v-date-picker v-model="birthdate" no-title scrollable>
                        <v-spacer></v-spacer>
                        <v-btn text color="primary" @click="$refs.menu.save(birthdate)">OK</v-btn>
                        <v-btn text color="primary" @click="$refs.menu.cancel()">Cancel</v-btn>
                      </v-date-picker>
                    </v-menu>
                  </v-col>
                  <v-col cols="12" sm="6">
                    <v-select
                      v-model="gender"
                      :items="genderOptions"
                      label="Genre"
                      outlined
                    ></v-select>
                  </v-col>
                </v-row>
                <v-alert v-if="error" type="error">{{ error }}</v-alert>
                <v-alert v-if="confirmMessage" type="success">{{ confirmMessage }}</v-alert>
                <v-divider></v-divider>
                <v-card-actions>
                  <v-btn color="#26AAAF" text to="/login">Se connecter ?</v-btn>
                  <v-spacer></v-spacer>
                  <v-btn color="#26AAAF" large type="submit" :disabled="isFormIncomplete">Inscription</v-btn>
                </v-card-actions>
              </v-form>
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
      firstname: '',
      name: "",
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
      birthdate: null, // Ajout de la propriété birthdate pour la date de naissance
      gender: null, // Ajout de la propriété gender pour le genre
      error: '', // Ajout de la propriété error pour le message d'erreur
      confirmMessage: '',
      menu: false,
      genderOptions: ['Homme', 'Femme', 'Autre']
    };
  },
  computed: {
    isFormIncomplete() {
      return !this.firstname || !this.name || !this.username || !this.email || !this.password || !this.confirmPassword || !this.birthdate || !this.gender;
    }
  },
  methods: {
    submitForm() {
      this.registerUser();
    },
    registerUser() {
      const formData = {
        name: this.name,
        firstname: this.firstname,
        pseudo: this.username,
        email: this.email,
        password: this.password,
        confirmPassword: this.confirmPassword,
        birthdate: this.birthdate,
        gender: this.gender
      };
      
      fetch('http://localhost:3000/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      })
      .then(response => {
        if (response.ok) {
          console.log('Inscription réussie');
          this.error = ''
          this.confirmMessage = 'Inscription confirmé !'
          // Rediriger l'utilisateur vers la page de connexion ou effectuer une autre action
        } else {
          console.error('Erreur lors de l\'inscription');
          this.confirmMessage = ''
          // Afficher un message d'erreur à l'utilisateur
          this.error = 'Erreur lors de l\'inscription. Veuillez réessayer.';
        }
      })
      .catch(error => {
        console.error('Erreur lors de l\'inscription :', error);
        // Afficher un message d'erreur à l'utilisateur
        this.error = 'Erreur lors de l\'inscription. Veuillez réessayer.';
      });
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
  margin-top: 5%;
  background-color: #FEF598;
}

.error-message {
  color: red;
  margin-top: 10px;
}
</style>