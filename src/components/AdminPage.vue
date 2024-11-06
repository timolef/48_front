<template>
    <v-app class="admin-page">
      <v-container>
  
        <!-- Section pour afficher les utilisateurs -->
        <v-card class="section">
          <v-card-title class="section-title">Utilisateurs</v-card-title>
          <v-card-text>
            <!-- Affichage des utilisateurs -->
            <div v-if="users.length > 0">
              <v-data-table :headers="headers" :items="users" item-key="email">
                <template v-slot:[`item.isAdmin`]="{ item }">
                    <v-icon v-if="item.isAdmin" class="mr-2" color="green">
                        mdi-check-bold
                    </v-icon>
                    <v-icon v-else class="mr-2" color="red"> mdi-close-thick </v-icon>
                </template>
                <template v-slot:[`item.actions`]="{ item }">
                <v-icon @click="openEditDialog(item)" class="mr-2" color="blue">
                  mdi-pencil
                </v-icon>
                <v-icon @click="openConfirmModal(item)" class="mr-2" color="red">
                  mdi-delete
                </v-icon>
              </template>
              </v-data-table>
            </div>
            <div v-else>
              <p>Aucun utilisateur trouvé.</p>
            </div>
          </v-card-text>
        </v-card>
  

        <v-dialog v-model="confirmModal" max-width="400">
        <v-card>
          <v-card-title class="headline">Confirmer la suppression</v-card-title>
          <v-card-text>
            Êtes-vous sûr de vouloir supprimer cet utilisateur ?
          </v-card-text>
          <v-card-actions>
            <v-btn color="red darken-1" text @click="confirmDelete">Confirmer</v-btn>
            <v-btn color="blue darken-1" text @click="closeConfirmModal">Annuler</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
      <v-dialog v-model="editDialog" max-width="500">
        <v-card>
          <v-card-title class="headline">Modifier l'utilisateur</v-card-title>
          <v-card-text>
            <v-form @submit.prevent="saveUser">
              <v-text-field v-model="editedUser.firstname" label="Prénom"></v-text-field>
              <v-text-field v-model="editedUser.name" label="Nom"></v-text-field>
              <v-text-field v-model="editedUser.email" label="Email"></v-text-field>
              <v-checkbox v-model="editedUser.isAdmin" label="Admin ?"></v-checkbox>
              <!-- Ajoutez d'autres champs pour les informations de l'utilisateur -->
            </v-form>
          </v-card-text>
          <v-card-actions>
            <v-btn color="blue darken-1" text @click="editDialog = false">Annuler</v-btn>
            <v-btn color="primary" @click="saveUser">Enregistrer</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
      </v-container>
    </v-app>
  </template>
  
  <script>
export default {
  data() {
    return {
      users: [],
      headers: [
        { text: 'Prénom', value: 'firstname' },
        { text: 'Nom', value: 'name' },
        { text: 'Pseudo', value: 'pseudo' },
        { text: 'Email', value: 'email' },
        { text: 'Admin', value: 'isAdmin' },
        { text: 'Actions', value: 'actions' },
      ],
      confirmModal: false,
      userToDelete: null,
      editDialog: false,
      editedUser: {},
    };
  },
  methods: {
    async deleteUser(user) {
        try {
            const userId = user.id; // Suppose que l'ID de l'utilisateur est stocké dans la propriété 'id'

            const response = await fetch(`http://localhost:3000/users/${userId}`, {
                method: 'DELETE'
            });
            
            if (response.ok) {
                console.log('Utilisateur supprimé avec succès');
                // Mettez à jour la liste des utilisateurs après la suppression
                this.fetchUsers();
            } else {
                const errorData = await response.json();
                console.error('Erreur lors de la suppression de l\'utilisateur :', errorData.error);
                // Gérer l'erreur de suppression de l'utilisateur
            }
        } catch (error) {
            console.error('Erreur lors de la suppression de l\'utilisateur :', error);
            // Gérer l'erreur de suppression de l'utilisateur
        }
    },
    openConfirmModal(user) {
      // Ouvrir la modal de confirmation
      this.userToDelete = user;
      this.confirmModal = true;
    },
    closeConfirmModal() {
      this.confirmModal = false
    },
    saveUser() {
      
  const { id, firstname, name, email, pseudo, isAdmin } = this.editedUser;
  const url = `http://localhost:3000/users/${id}`;
  const userData = { firstname, name, email, pseudo, isAdmin };
  console.log(userData)
  fetch(url, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(userData)
  })
  .then(response => {
    if (!response.ok) {
      throw new Error('Erreur lors de la modification de l\'utilisateur');
    }
    this.editDialog = false;
    console.log('Utilisateur modifié avec succès');
    return response.json();
  })
  .then(
    
    this.fetchUsers()
  )
  .catch(error => {
    console.error('Erreur lors de la modification de l\'utilisateur :', error);
    // Afficher un message d'erreur à l'utilisateur
  });
},
    confirmDelete() {
      if (this.userToDelete) {
        this.deleteUser(this.userToDelete);
        this.closeConfirmModal();
        this.fetchUsers();
      }
    },
    openEditDialog(user) {
      // Ouvrir la boîte de dialogue de modification
      this.editedUser = { ...user };
      this.editDialog = true;
    },
    async confirmEdit() {

    },

    async fetchUsers() {
  try {
    const email = localStorage.getItem("email"); // Adresse e-mail à envoyer dans le corps de la requête
    const response = await fetch('http://localhost:3000/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email })
    }); // Envoi de la requête POST avec Fetch
    const data = await response.json(); // Conversion de la réponse en JSON
    this.users = data.users; // Mise à jour de la liste des utilisateurs dans les données de votre composant
  } catch (error) {
    console.error('Erreur lors de la récupération des utilisateurs :', error);
  }
}
  },
  mounted() {
    // Appel de la méthode fetchUsers lorsque le composant est monté
    this.fetchUsers();
  }
};
</script>

<style scoped>
#app {
  margin-top: 90px;
  background-color: #aedbdd;
}
.admin-page {
}

.headline {
  /* Couleur du titre principal */
  font-size: 24px;
  margin-bottom: 20px;
}

.section {
  margin-top: 30px;
  /* Marge en haut de chaque section */
}

.section-title {
  color: #333;
  /* Couleur du titre de section */
  font-size: 20px;
  margin-bottom: 10px;
}
</style>