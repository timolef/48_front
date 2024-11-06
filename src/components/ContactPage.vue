<template>
    <v-app class="contact-page">
      <v-container>
        <v-row class="mt-4">
          <v-col cols="12" md="6">
            <v-card>
              <v-card-title class="headline">Formulaire de contact</v-card-title>
              <v-card-text>
                <v-form @submit.prevent="submitForm">
                  <v-text-field v-model="name" label="Nom" required></v-text-field>
                  <v-text-field v-model="email" label="Email" required></v-text-field>
                  <v-textarea  v-model="message" rows="5" class="messageZone" label="Message" required></v-textarea>
                  <v-btn color="#26AAAF" dark large type="submit">Envoyer</v-btn>
                </v-form>
              </v-card-text>
            </v-card>
          </v-col>
          <v-col cols="12" md="6">
            <v-card class="card-rs">
              <v-card-title class="headline">Nos Réseaux Sociaux</v-card-title>
              <v-card-text>
                <v-list>
                    
                  <v-list-item link href="https://form.dragnsurvey.com/survey/r/0d2527c9">
                    <v-list-item-icon>
                      <v-icon color="#26AAAF">mdi-account-plus</v-icon>
                    </v-list-item-icon>
                    <v-list-item-title>Vous souhaitez adhérer ? Alors cliquez !</v-list-item-title>
                  </v-list-item>
                  <v-list-item link href="https://www.facebook.com/association48pour100">
                    <v-list-item-icon>
                      <v-icon color="#26AAAF">mdi-facebook</v-icon>
                    </v-list-item-icon>
                    <v-list-item-title>Facebook</v-list-item-title>
                  </v-list-item>
                  <v-list-item link href="https://www.instagram.com/association48pour100?igsh=MWVicGJsZnM5OHRodQ==">
                    <v-list-item-icon>
                      <v-icon color="#26AAAF">mdi-instagram</v-icon>
                    </v-list-item-icon>
                    <v-list-item-title>Instagram</v-list-item-title>
                  </v-list-item>
                  <v-list-item link href="https://www.tiktok.com/@association48pour?_t=8hk1kncggkd&_r=1">
                    <v-list-item-icon>
                    <TikTokIcon class="tiktok" color="#26AAAF"/>
                  </v-list-item-icon>
                    <v-list-item-title>Tiktok</v-list-item-title>
                  </v-list-item>
                  <v-list-item link href="https://www.deezer.com/fr/show/1000853991">
                    <v-list-item-icon>
                      <v-icon color="#26AAAF">mdi-microphone-variant</v-icon>
                    </v-list-item-icon>
                    <v-list-item-title>Notre podcast Allô 48%</v-list-item-title>
                  </v-list-item>
                  <v-list-item>
                    <v-list-item-icon>
                      <v-icon color="#26AAAF">mdi-at</v-icon>
                    </v-list-item-icon>
                    <v-list-item-title>association48pour100@gmail.com</v-list-item-title>
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
  import TikTokIcon from './TikTokIcon.vue'
  export default {
    components: {
      TikTokIcon
    },
    data() {
      return {
        name: '',
        email: '',
        message: ''
      };
    },
    methods: {
      submitForm() {
        // Traitement du formulaire (envoi par e-mail, sauvegarde dans la base de données, etc.)
        console.log('Nom:', this.name);
        console.log('Email:', this.email);
        console.log('Message:', this.message);
        
        // Réinitialisation du formulaire
        this.name = '';
        this.email = '';
        this.message = '';
      }
    }
  };
  </script>
  
  <style scoped>
  #app{
    margin-top: 90px;
    background-color: #aedbdd;
  }
  .contact-page {
    background-color: #aedbdd;
  }
  
  .headline {
    color: #26AAAF;
    font-size: 24px;
    margin-bottom: 20px;
  }

  .card-rs{
    height: 457px;
  }
  .tiktok {
    height: 30px;
  }
  </style>