<template>
  <v-app>
    <v-container>
      <!-- Bouton pour créer une nouvelle publication (visible pour les administrateurs) -->
      <v-btn v-if="isAdmin == 1" @click="showCreatePostDialog" class="mb-5 mt-4" style="color:white;" color="#26AAAF">Créer une publication</v-btn>
  
      <!-- Modale pour ajouter une publication -->
      <v-dialog v-model="showAddPostDialog" max-width="600px">
        <v-card>
          <v-card-title>Ajouter une nouvelle publication</v-card-title>
          <v-card-text>
            <v-form @submit.prevent="submitNewPost">
              <v-text-field v-model="newPost.title" label="Titre de la publication"></v-text-field>
              <v-textarea v-model="newPost.content" label="Contenu de la publication" auto-grow></v-textarea>
              <v-btn type="submit" color="primary">Ajouter</v-btn>
            </v-form>
          </v-card-text>
        </v-card>
      </v-dialog>
  
      <!-- Modale pour mettre à jour une publication -->
      <v-dialog v-model="showEditPostModal" max-width="600px">
        <v-card>
          <v-card-title>Mettre à jour la publication</v-card-title>
          <v-card-text>
            <v-form @submit.prevent="submitEditPost">
              <v-text-field v-model="editPost.title" label="Titre de la publication"></v-text-field>
              <v-textarea v-model="editPost.content" label="Contenu de la publication" auto-grow></v-textarea>
              <v-btn type="submit" color="primary">Mettre à jour</v-btn>
            </v-form>
          </v-card-text>
        </v-card>
      </v-dialog>
  
      <!-- Liste des publications -->
      <v-row v-if="posts && posts.length > 0">
        <v-col v-for="(post, index) in posts" :key="index" cols="12">
          <v-card>
            <v-card-title>{{ post.title }}</v-card-title>
            <v-card-text class="post-content">{{ shortenText(post.content) }}</v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer> <!-- Ajout d'un espaceur pour pousser les éléments à droite -->
              <v-btn icon @click="showFullPost(post)"><v-icon>mdi-eye</v-icon></v-btn>
              <v-btn class="ml-8" v-if="isAdmin == 1" icon @click="showEditPostDialog(post)">
                      <v-icon color="blue">
                        mdi-pencil
                      </v-icon>
                    </v-btn>
              <v-icon v-if="isAdmin == 1" class="ml-10 mr-3" color="error" @click="confirmDeletePost(post)">mdi-delete</v-icon>
              <v-card-subtitle>{{ formatDate(post.created_at) }}</v-card-subtitle>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
      <v-row v-else>
      <v-col>
          <!-- Afficher une card si la liste des posts est vide -->
          <v-card class="empty-card">
            <v-card-text>Il n'y a pas de posts d'actualités</v-card-text>
          </v-card>
        </v-col>
      </v-row>
  
      <!-- Modal pour afficher une publication complète -->
      <v-dialog v-model="showPostDialog" max-width="1200px">
        <v-card>
          <v-card-title>{{ selectedPost.title }}</v-card-title>
          <v-card-text class="post-content">{{ selectedPost.content }}</v-card-text>
          <v-card-actions>
            <v-btn color="primary" @click="showPostDialog = false">Fermer</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>

      <!-- Modal de confirmation de suppression -->
      <v-dialog v-model="showDeleteConfirmation" max-width="500px">
        <v-card>
          <v-card-title class="headline">Confirmation de suppression</v-card-title>
          <v-card-text>
            Êtes-vous sûr de vouloir supprimer cette publication ?
          </v-card-text>
          <v-card-actions>
            <v-btn color="primary" @click="deletePost(selectedPost)">Oui</v-btn>
            <v-btn color="error" @click="showDeleteConfirmation = false">Non</v-btn>
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
    </v-container>
  </v-app>
</template>

<script>
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';

export default {
  data() {
    return {
      isAdmin: false, // Indique si l'utilisateur est administrateur
      posts: [], // Liste des publications 
      alertMessage: '',
      showAlert: false,
      showPostDialog: false, // Contrôle l'affichage de la modal pour afficher une publication complète
      selectedPost: {
        content: null,
        title: null,
        id: null
      }, // Contient la publication sélectionnée pour affichage dans la modal
      showAddPostDialog: false, // Contrôle l'affichage de la modal pour ajouter une nouvelle publication
      showEditPostModal: false, // Contrôle l'affichage de la modal pour mettre à jour une publication
      newPost: {
        title: '',
        content: '',
        authorId: localStorage.getItem("userId")
      }, // Nouvelle publication à ajouter
      editPost: {
        id: null,
        title: '',
        content: '',
        authorId:''
      }, // Publication à mettre à jour
      showDeleteConfirmation: false // Contrôle l'affichage de la modal de confirmation de suppression
    };
  },
  created() {
    this.fetchPosts();
    // Appeler la méthode pour charger les publications lors de la création du composant
  },
  methods: {
    async fetchPosts() {
      this.isAdmin = localStorage.getItem("isAdmin");
      console.log(this.isAdmin);
      try {
        const response = await fetch('http://localhost:3000/posts');
        if (!response.ok) {
          throw new Error('Erreur lors de la récupération des posts');
        }
        const posts = await response.json();
        console.log('Posts récupérés avec succès : ', posts);
        this.posts = posts; // Assignez les données récupérées à la propriété posts
      } catch (error) {
        console.error('Erreur : ', error);
        // Gérer l'erreur, par exemple afficher un message à l'utilisateur ou journaliser l'erreur
      }
    },
    formatDate(date) {
      return format(new Date(date), 'dd/MM/yyyy', { locale: fr });
    },
    showCreatePostDialog() {
      // Cette méthode est appelée lors du clic sur le bouton "Créer une publication"
      // Afficher la modale pour ajouter une nouvelle publication
      this.showAddPostDialog = true;
    },
    async submitNewPost() {
      try {
        const response = await fetch('http://localhost:3000/posts', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(this.newPost)
        });
        if (!response.ok) {
          throw new Error('Erreur lors de l\'ajout de la publication');
        }
        console.log('Publication ajoutée avec succès');
        // Actualiser la liste des publications après l'ajout
        this.fetchPosts();
        // Fermer la modale d'ajout de publication
        this.showAddPostDialog = false;
        this.showAlert = true;
        this.alertMessage = 'Publication crée avec succès';
        console.log('Publication crée avec succès');
      } catch (error) {
        console.error('Erreur : ', error);
        // Gérer l'erreur, par exemple afficher un message à l'utilisateur ou journaliser l'erreur
      }
    },
    showFullPost(post) {
      // Cette méthode est appelée lors du clic sur le bouton "Voir" d'une publication
      // Elle ouvre la modal pour afficher la publication complète
      this.selectedPost = post;
      this.showPostDialog = true;
    },
    showEditPostDialog(post) {
      // Cette méthode est appelée lors du clic sur l'icône de crayon pour modifier une publication
      // Elle ouvre la modal pour éditer la publication
      this.editPost = { ...post };
      this.editPost.authorId = this.editPost.author_id
      console.log("oui : ", this.editPost)
      this.showEditPostModal = true;
    },
    async submitEditPost() {
      console.log("post : ", this.editPost)
      try {
        const response = await fetch(`http://localhost:3000/posts/${this.editPost.id}`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(this.editPost)
        });
        if (!response.ok) {
          throw new Error('Erreur lors de la mise à jour de la publication');
        }
        
        console.log('Publication mise à jour avec succès');
        // Actualiser la liste des publications après la mise à jour
        this.fetchPosts();

        // Fermer la modale de mise à jour de publication
        this.showEditPostModal = false;
        this.showAlert = true;
        this.alertMessage = 'Publication mise à jour avec succès';
      } catch (error) {
        console.error('Erreur : ', error);
        // Gérer l'erreur, par exemple afficher un message à l'utilisateur ou journaliser l'erreur
      }
    },
    shortenText(text) {
      // Cette méthode raccourcit le texte pour l'affichage initial dans les cartes de publication
      const maxLength = 200; // Nombre maximum de caractères à afficher
      if (text.length > maxLength) {
        return text.substring(0, maxLength) + '...'; // Tronquer le texte et ajouter des points de suspension
      }
      return text;
    },
    confirmDeletePost(post) {
      // Cette méthode est appelée lors du clic sur l'icône de corbeille pour supprimer une publication
      // Elle affiche la modal de confirmation de suppression
      this.selectedPost = post;
      this.showDeleteConfirmation = true;
    },
    async deletePost(post) {
      try {
        const response = await fetch(`http://localhost:3000/posts/${post.id}`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json'
          }
        });
        if (!response.ok) {
          throw new Error('Erreur lors de la suppression de la publication');
        }
        console.log('Publication supprimée avec succès');
        // Actualiser la liste des publications après la suppression
        this.fetchPosts();
        // Fermer la modal de confirmation de suppression
        this.showDeleteConfirmation = false;
        this.showAlert = true;
        this.alertMessage = 'Publication Supprimée avec succès';
      } catch (error) {
        console.error('Erreur : ', error);
        // Gérer l'erreur, par exemple afficher un message à l'utilisateur ou journaliser l'erreur
      }
    }
  }
};
</script>

<style scoped>
#app {
  margin-top: 90px;
  background-color: #aedbdd;
}
.post-content {
  white-space: pre-line; /* Permet de conserver les retours à la ligne */
}
.fixed-bottom {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 9999; /* Assurez-vous que l'alerte est au-dessus du reste du contenu */
}
</style>