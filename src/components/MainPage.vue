<template>
  <v-app>
    <v-container>
      
      <!-- Slogan -->
      <v-row class="my-10 mt-4">
        <v-col cols="12" class="text-center">
          <v-card class="card-main">
            <!-- Image en fond -->
            <div class="card-background"></div>
            <!-- Contenu texte -->
            <div class="card-content">
              <h1 class="yellow1 mt-12 display-1">Pas besoin de souffrir pour grandir !</h1>
              <v-card-actions>
                <v-row justify="center" class="my-5">
                  <v-btn color="#FEF598" class="mr-5" href="https://form.dragnsurvey.com/survey/r/0d2527c9" @click="getInvolved">Rejoignez-nous</v-btn>
                  <v-btn color="#FEF598" class="don" href="https://www.helloasso.com/associations/association-48-pour-100/formulaires/1" @click="makeDonation">Faire un don</v-btn>
                </v-row>
              </v-card-actions>
            </div>
          </v-card>
        </v-col>
      </v-row>

      <!-- Boutons d'appel à l'action -->
      
  
      <!-- Dernières actualités et événements -->
      <v-row>
        <v-col cols="12" md="6">
          <h2 class="headline">Dernières actualités</h2>
          <v-btn v-if="isAdmin == 1" class="buttonCreate mb-4 mt-4" color="#26AAAF" @click="openModal('news')">Créer une actualité</v-btn>
          <v-card v-if="latestNews.length === 0" class="mb-3">
            <v-card-text>Aucune news...</v-card-text>
          </v-card>
          <!-- Sinon, affichez les actualités -->
          <v-card v-else v-for="(news, index) in latestNews" :key="index" class="mb-3">
            <v-card-title>{{ news.title }}</v-card-title>
            <v-card-subtitle>{{ formatDate(news.date) }}</v-card-subtitle>
            <v-card-text>{{ news.description }}</v-card-text>
            <v-icon v-if="isAdmin == 1" @click="openEditDialog(news)" class="ml-8 mb-4 mr-2" color="blue">
  mdi-pencil
</v-icon>
            <v-btn icon v-if="isAdmin == 1" class="buttonCreate ml-3 mb-3 mt-3" @click="deleteEvent('news', news.id)"><v-icon class="mr-2" color="red">
                  mdi-delete
                </v-icon></v-btn>
          </v-card>
        </v-col>

        <v-col cols="12" md="6">
          <h2 class="headline">Événements à venir</h2>
          <v-btn v-if="isAdmin == 1" class="buttonCreate mb-4 mt-4" color="#26AAAF" @click="openModal('event')">Créer un événement à venir</v-btn>
          <v-card v-if="upcomingEvents.length === 0" class="mb-3">
            <v-card-text>Aucun évènement à venir...</v-card-text>
          </v-card>
          <v-card v-else v-for="(event, index) in upcomingEvents" :key="index" class="mb-3">
            <v-card-title>{{ event.title }}</v-card-title>
            <v-card-subtitle>{{ formatDate(event.date) }}</v-card-subtitle>
            <v-card-text>{{ event.description }}</v-card-text>
            <v-icon v-if="isAdmin == 1" @click="openEditDialog(item)" class="ml-8 mb-4 mr-2" color="blue">
                  mdi-pencil
                </v-icon>
                <v-btn icon v-if="isAdmin == 1" class="buttonCreate ml-3 mb-3 mt-3" @click="deleteEvent('upcoming', event.id)"><v-icon class="mr-2" color="red">
                  mdi-delete
                </v-icon></v-btn>
          </v-card>
        </v-col>
      </v-row>
    </v-container>

    <!-- Modal de création -->
    <v-dialog v-model="modal" max-width="600">
      <v-card>
        <v-card-title>
          {{ title }}
        </v-card-title>
        <v-card-text>
          <!-- Contenu de la modal -->
          <v-text-field label="Titre" v-model="newEvent.title"></v-text-field>
          <v-text-field label="Date" type="date" v-model="newEvent.date"></v-text-field>
          <v-textarea label="Description" v-model="newEvent.description"></v-textarea>
        </v-card-text>
        <v-card-actions>
          <v-btn color="blue darken-1" text @click="saveNewItem">Enregistrer</v-btn>
          <v-btn color="blue darken-1" text @click="closeModal">Annuler</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog v-model="confirmDeleteModal" max-width="400">
    <v-card>
      <v-card-title class="headline">Confirmation de suppression</v-card-title>
      <v-card-text>
        Êtes-vous sûr de vouloir supprimer cet élément ?
      </v-card-text>
      <v-card-actions>
        <v-btn color="red darken-1" @click="confirmDelete">Oui</v-btn>
        <v-btn @click="cancelDelete">Annuler</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
  <v-dialog v-model="editNewsModal" max-width="600">
    <v-card>
      <v-card-title>
        Modifier l'actualité
      </v-card-title>
      <v-card-text>
        <!-- Contenu de la modale de modification -->
        <v-text-field label="Titre" v-model="editNews.title"></v-text-field>
        <v-text-field label="Date" type="date" v-model="editNews.date"></v-text-field>
        <v-textarea label="Description" v-model="editNews.description"></v-textarea>
      </v-card-text>
      <v-card-actions>
        <v-btn color="blue darken-1" text @click="updateNews">Enregistrer</v-btn>
        <v-btn color="blue darken-1" text @click="closeEditModal">Annuler</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
  <v-alert
        v-model="showAlert"
        type="success"
        density=“compact”
        dismissible
        class="fixed-bottom"
        style="width: 50%;
        margin: auto;"
      >
        {{ alertMessage }}
      </v-alert>
  </v-app>
</template>

<script>
export default {
  data() {
    return {
      showAlert: false, // Pour afficher ou masquer l'alerte
      alertMessage: '',
      title: "",
      editNewsModal: false,
      editNews: { // Pour stocker les données de l'actualité à modifier
        id: null,
        title: '',
        date: '',
        description: ''
      },
      saveNewItem: null,
      isAdmin : false,
      latestNews: [],
      upcomingEvents: [],
      modal: false,
      newEvent: {
        title: '',
        date: '',
        description: ''
      },
      confirmDeleteModal: false,
      deleteItemId: null,
      deleteItemType: null
    };
  },
  created() {
    this.fetchLatestNews();
    this.fetchUpcomingEvents();
    this.isAdmin = localStorage.getItem("isAdmin")
  },
  methods: {
    getInvolved() {
      // Logique pour impliquer les visiteurs
    },
    formatDate(dateString) {
      const date = new Date(dateString);
      const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
      return date.toLocaleDateString('fr-FR', options);
    },
    makeDonation() {
      // Logique pour permettre aux visiteurs de faire un don
    },
    deleteEvent(type, id) {
      this.deleteItemId = id;
      this.deleteItemType = type;
      this.confirmDeleteModal = true;
    },
    confirmDelete() {
      
      let baseURL = null;
            if (process.env.VUE_APP_NODE_ENV === "development") {
                baseURL = process.env.VUE_APP_API_URL_LOCAL;
            } else {
                baseURL = process.env.VUE_APP_API_URL_PROD;
            }
      const endpoint = this.deleteItemType === 'news' ? `${baseURL}/news/${this.deleteItemId}` : `${baseURL}/upcoming-events/${this.deleteItemId}`;

      fetch(endpoint, { method: 'DELETE' })
        .then(response => {
          if (!response.ok) {
            throw new Error('Erreur lors de la suppression');
          }
          return response.text();
        })
        .then(data => {
          console.log('Suppression réussie :', data);
          // Actualisez les données si nécessaire
          if (this.deleteItemType === 'news') {
            this.fetchLatestNews();
            this.showAlert = true;
            this.alertMessage = 'Actualité Supprimée avec succès';
          } else {
            this.showAlert = true;
            this.alertMessage = 'Evenement Supprimé avec succès';
            this.fetchUpcomingEvents();
          }
        })
        .catch(error => {
          console.error('Erreur lors de la suppression :', error);
          // Gérez les erreurs de suppression
          alert('Erreur lors de la suppression');
        })
        .finally(() => {
          this.confirmDeleteModal = false;
        });
    },

    cancelDelete() {
      this.confirmDeleteModal = false;
    }
  ,
    
  fetchLatestNews() {
            let baseURL = null;
            if (process.env.VUE_APP_NODE_ENV === "development") {
                baseURL = process.env.VUE_APP_API_URL_LOCAL;
            } else {
                baseURL = process.env.VUE_APP_API_URL_PROD;
            }
  fetch(`${baseURL}/latest-news`)
    .then(response => response.json())
    .then(data => {
      // Triez les actualités par date décroissante
      this.latestNews = data.sort((a, b) => new Date(b.date) - new Date(a.date));
    })
    .catch(error => {
      console.error('Erreur lors de la récupération des dernières actualités : ', error);
    });
},
    fetchUpcomingEvents() {
            let baseURL = null;
            if (process.env.VUE_APP_NODE_ENV === "development") {
                baseURL = process.env.VUE_APP_API_URL_LOCAL;
            } else {
                baseURL = process.env.VUE_APP_API_URL_PROD;
            }
      fetch(`${baseURL}/upcoming-events`)
        .then(response => response.json())
        .then(data => {
          this.upcomingEvents = data.sort((a, b) => new Date(a.date) - new Date(b.date));
        })
        .catch(error => {
          console.error('Erreur lors de la récupération des événements à venir : ', error);
        });
    },
    updateNews() {
      console.log(this.editNews)
      if (this.editNews.title && this.editNews.date && this.editNews.description) {
        const requestOptions = {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            title: this.editNews.title,
            date: this.editNews.date,
            description: this.editNews.description
          })
        };
        
        let baseURL = null;
            if (process.env.VUE_APP_NODE_ENV === "development") {
                baseURL = process.env.VUE_APP_API_URL_LOCAL;
            } else {
                baseURL = process.env.VUE_APP_API_URL_PROD;
            }
        fetch(`${baseURL}/news/${this.editNews.id}`, requestOptions)
          .then(response => {
            if (!response.ok) {
              throw new Error('Erreur lors de la mise à jour de l\'actualité');
            }
            return response.text();
          })
          .then(data => {
            console.log(data);
            this.fetchLatestNews();
            this.editNews = {
              id: null,
              title: '',
              date: '',
              description: ''
            };
            this.editNewsModal = false;
            this.showAlert = true;
            this.alertMessage = 'Actualité mise à jour avec succès';
          })
          .catch(error => {
            console.error('Erreur lors de la mise à jour de l\'actualité : ', error);
            alert('Erreur lors de la mise à jour de l\'actualité');
          });
      } else {
        alert('Veuillez remplir tous les champs');
      }
    },
    openEditDialog(news) {
      this.editNews = { ...news }; // Clone l'actualité à modifier
      this.editNewsModal = true;
    },
    closeEditModal() {
      this.editNewsModal = false;
    },
    openModal(type) {
      console.log(type)
      switch (type) {
        case "news":
          this.title = 'Création d\'une actualité';
          this.saveNewItem = this.saveNews; // Utilise saveNews pour les actualités
          break;
        case "event":
          this.title = 'Création d\'un évènement à venir';
          this.saveNewItem = this.saveEvent; // Utilise saveEvent pour les événements
          break;
      
        default:
          break;
      }
      // Ouvre la modal de création en fonction du type (event ou news)
      this.modal = true;
    },
    closeModal() {
      // Ferme la modal de création
      this.modal = false;
    },
    saveNews() {
      // Enregistre la nouvelle actualité
      if (this.newEvent.title && this.newEvent.date && this.newEvent.description) {
        const requestOptions = {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(this.newEvent)
        };
        
        let baseURL = null;
            if (process.env.VUE_APP_NODE_ENV === "development") {
                baseURL = process.env.VUE_APP_API_URL_LOCAL;
            } else {
                baseURL = process.env.VUE_APP_API_URL_PROD;
            }
        fetch(`${baseURL}http://localhost:3000/news`, requestOptions)
          .then(response => response.json())
          .then(data => {
            console.log(data)
            this.fetchLatestNews()
            this.newEvent = {
              title: '',
              date: '',
              description: ''
            };
            this.modal = false;
            this.showAlert = true;
            this.alertMessage = 'Actualité crée avec succès';
          })
          .catch(error => {
            console.error('Erreur lors de la création de l\'actualité : ', error);
            alert('Erreur lors de la création de l\'actualité');
          });
      } else {
        alert('Veuillez remplir tous les champs');
      }
    },

    saveEvent() {
      // Enregistre le nouvel événement
      if (this.newEvent.title && this.newEvent.date && this.newEvent.description) {
        const requestOptions = {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(this.newEvent)
        };
        
        let baseURL = null;
            if (process.env.VUE_APP_NODE_ENV === "development") {
                baseURL = process.env.VUE_APP_API_URL_LOCAL;
            } else {
                baseURL = process.env.VUE_APP_API_URL_PROD;
            }
        fetch(`${baseURL}/upcoming-events`, requestOptions)
          .then(response => response.json())
          .then(data => {
            this.upcomingEvents.push(data);
            this.newEvent = {
              title: '',
              date: '',
              description: ''
            };
            this.modal = false;
            this.showAlert = true;
            this.alertMessage = 'Evenement crée avec succès';
          })
          .catch(error => {
            console.error('Erreur lors de la création de l\'événement : ', error);
            alert('Erreur lors de la création de l\'événement');
          });
      } else {
        alert('Veuillez remplir tous les champs');
      }
    },
  }
};
</script>

<style scoped>
#app {
  margin-top: 90px;
  background-color: #aedbdd;
}
.card-background {
  position: absolute; /* Position absolue par rapport à la carte */
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: url('../assets/back.png'); /* Image en fond */
  background-size: cover; /* Redimensionne l'image pour couvrir toute la carte */
  background-position: center; /* Centre l'image horizontalement et verticalement */
  opacity: 0.7; /* Opacité de l'image de fond (ajustable selon vos besoins) */
}
.card-main {
  padding: 20px;
}
.my-10 {
  margin-top: 80px;
  margin-bottom: 80px;
}
.my-5 {
  margin-top: 40px;
  margin-bottom: 40px;
}
.img-back {
  width: 100%;
  background-size: cover; /* Redimensionne l'image pour couvrir toute la carte */
  background-position: center;
  position: relative;
}
.display-1,
.subtitle-1 {
  position: relative; /* Positionnement relatif pour placer le texte par-dessus l'image */
  z-index: 1; /* Assurez-vous que le texte est au-dessus de la superposition */
}
.don{
  font-size: 17px;
}
.yellow1 {
  color: #FEF598;
}
.buttonCreate {
  color: white;
}
.fixed-bottom {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 9999; /* Assurez-vous que l'alerte est au-dessus du reste du contenu */
}
</style>