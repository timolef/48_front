<template>
  <v-app>
    <v-container>
      <v-row>
        <v-col cols="6">
          <v-card class="resource-card">
            <v-card-title class="subheadline">Articles, Vidéos, Infographies</v-card-title>
            <v-divider></v-divider>
            <v-card-actions>
  <v-btn v-if="isAdmin == 1" class="buttonCreate" color="#26AAAF" @click="openModal('article')">Créer un article</v-btn>
</v-card-actions>
            <v-card-text>
              <v-list>
                <v-list-item v-for="(resource, index) in educationalResources" :key="index">
                  <v-list-item-content class="content1">
                    <v-list-item-title>
                      {{ resource.title }}
                    </v-list-item-title>
                    <v-list-item-subtitle>{{ resource.type }}</v-list-item-subtitle>
                    <v-list-item-subtitle>{{ resource.description }}</v-list-item-subtitle>
                  </v-list-item-content>
                  <v-list-item-action>
                    <v-btn icon @click="redirectToLink(resource.link)">
                      <v-icon>mdi-eye</v-icon>
                    </v-btn>
                    
                    <v-btn icon v-if="isAdmin ==1">
                      <v-icon class="mr-2" color="blue" @click="openEditModal('article', resource)">
                        mdi-pencil
                      </v-icon>
                    </v-btn>
                    <v-btn @click="openDeleteDialog(resource)" v-if="isAdmin ==1" icon><v-icon class="mr-2" color="red">
                  mdi-delete
                </v-icon></v-btn>
                  </v-list-item-action>
                </v-list-item>
              </v-list>
            </v-card-text>
          </v-card>
        </v-col>
        <v-col cols="6">
          <v-card class="resource-card">
            <v-card-title class="subheadline">Guides de Prévention et de Soutien</v-card-title>
            <v-divider></v-divider>
            <v-card-actions>
  <v-btn v-if="isAdmin == 1" class="buttonCreate" color="#26AAAF" @click="openModal('guide')">Créer un guide de prévention</v-btn>
</v-card-actions>
            <v-card-text>
              <v-list>
                <v-list-item v-for="(guide, index) in preventionSupportGuides" :key="index">
                  <v-list-item-content>
                    <v-list-item-title>
                      {{ guide.title }}
                    </v-list-item-title>
                    <v-list-item-subtitle>{{ guide.description }}</v-list-item-subtitle>
                  </v-list-item-content>
                  <v-list-item-action>
                    <v-btn icon @click="redirectToLink(guide.link)">
                      <v-icon>mdi-eye</v-icon>
                    </v-btn>
                    
                    <v-btn v-if="isAdmin ==1" icon>
                      <v-icon class="mr-2" color="blue" @click="openEditModal('guide', guide)">
                        mdi-pencil
                      </v-icon>
                    </v-btn>
                    <v-btn @click="openDeleteDialog(guide)" v-if="isAdmin ==1" icon><v-icon class="mr-2" color="red">
                  mdi-delete
                </v-icon></v-btn>
                  </v-list-item-action>
                </v-list-item>
              </v-list>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
      <!-- Section des articles, vidéos, infographies, etc. -->
      
      
      <!-- Section des guides de prévention et de soutien -->
      <v-row>
        <v-col cols="12">
          <v-card class="resource-card">
            <v-card-title class="subheadline">Numéros d'Assistance et Organismes de Soutien</v-card-title>
            <v-divider></v-divider>
            <v-card-actions>
  <v-btn v-if="isAdmin == 1" class="buttonCreate" color="#26AAAF" @click="openModal('organization')">Créer une organisation d'assistance</v-btn>
</v-card-actions>
            <v-card-text>
              <v-list>
                <v-list-item v-for="(assistance, index) in assistanceOrganizations" :key="index">
                  <v-list-item-content>
                    <v-list-item-title>
                      {{ assistance.phone }}
                    </v-list-item-title>
                    <v-list-item-subtitle>{{ assistance.name }}</v-list-item-subtitle>
                  </v-list-item-content>
                  
                  <v-btn icon v-if="isAdmin ==1" @click="openEditModal('organization', assistance)">
                      <v-icon class="mr-2" color="blue">
                        mdi-pencil
                      </v-icon>
                    </v-btn>
                  <v-btn @click="openDeleteDialog(assistance)" v-if="isAdmin ==1" icon><v-icon class="mr-2" color="red">
                  mdi-delete
                </v-icon></v-btn>
                </v-list-item>
              </v-list>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
      <v-dialog v-model="modalArticle" max-width="500">
  <v-card>
    <v-card-title>{{ isEditing ? 'Éditer' : 'Créer' }}</v-card-title>
    <v-card-text>
      <v-form ref="articleForm">
        <v-text-field v-model="articleForm.title" label="Titre de l'article"></v-text-field>
        <v-textarea v-model="articleForm.description" label="Description de l'article"></v-textarea>
        <v-text-field v-model="articleForm.link" label="Lien de l'article"></v-text-field>
      </v-form>
    </v-card-text>
    <v-card-actions>
      <v-btn color="primary" @click="isEditing ? updateArticle() : createArticle()">{{ isEditing ? 'Mettre à jour' : 'Créer' }}</v-btn>
      <v-btn @click="modalArticle = false">Annuler</v-btn>
    </v-card-actions>
  </v-card>
</v-dialog>

<v-dialog v-model="modalGuide" max-width="500">
  <v-card>
    <v-card-title>Créer un guide de prévention</v-card-title>
    <v-card-text>
      <v-form ref="guideForm">
        <v-text-field v-model="guideForm.title" label="Titre du guide"></v-text-field>
        <v-textarea v-model="guideForm.description" label="Description du guide"></v-textarea>
        <v-text-field v-model="guideForm.link" label="Lien du guide"></v-text-field>
      </v-form>
    </v-card-text>
    <v-card-actions>
      <v-btn color="primary" @click="isEditing ? updateGuide() : createGuide()">{{ isEditing ? 'Mettre à jour' : 'Créer' }}</v-btn>
      <v-btn @click="modalGuide = false">Annuler</v-btn>
    </v-card-actions>
  </v-card>
</v-dialog>

<v-dialog v-model="deleteDialog" max-width="400">
      <v-card>
        <v-card-title class="headline">Confirmation de suppression</v-card-title>
        <v-card-text>
          Êtes-vous sûr de vouloir supprimer cette ressource ?
        </v-card-text>
        <v-card-actions>
          <v-btn color="error" @click="deleteConfirmed">Confirmer</v-btn>
          <v-btn @click="deleteDialog = false">Annuler</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog v-model="modalOrganization" max-width="500">
        <v-card>
          <v-card-title>{{ isEditing ? 'Éditer' : 'Créer' }} une organisation d'assistance</v-card-title>
          <v-card-text>
            <v-form ref="organizationForm">
              <v-text-field v-model="organizationForm.name" label="Nom de l'organisation"></v-text-field>
              <v-text-field v-model="organizationForm.phone" label="Numéro de téléphone"></v-text-field>
              <v-textarea v-model="organizationForm.description" label="Description de l'organisation"></v-textarea>
              <v-text-field v-model="organizationForm.link" label="Lien de l'organisation"></v-text-field>
            </v-form>
          </v-card-text>
          <v-card-actions>
            <v-btn color="primary" @click="isEditing ? updateOrganization() : createOrganization()">{{ isEditing ? 'Mettre à jour' : 'Créer' }}</v-btn>
            <v-btn @click="modalOrganization = false">Annuler</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
      <!-- Section des numéros d'assistance et des organismes de soutien -->
    
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
export default {
  data() {
    return {
      showAlert: false, // Pour afficher ou masquer l'alerte
      alertMessage: '',
      isAdmin : false,
      educationalResources: [],
      preventionSupportGuides: [],
      assistanceOrganizations: [],
      modalArticle: false,
    modalGuide: false,
    modalOrganization: false,
    deleteDialog: false,
      resourceToDelete: null,
      isEditing: false,
    articleForm: {
      title: '',
      description: '',
      link: '',
      type: 'Article'
    },
    guideForm: {
      title: '',
      description: '',
      link: ''
    },
    organizationForm: {
      name: '',
      phone: '',
      description: '',
      link: ''
    },
    };
  },
  mounted() {
    this.fetchResources();
    this.isAdmin = localStorage.getItem("isAdmin")
  },
  methods: {
    openDeleteDialog(resource) {
      console.log("ressource : ", resource)
      this.resourceToDelete = resource;
      this.deleteDialog = true;
    },
    // Fonction pour confirmer la suppression
    deleteConfirmed() {
      if (this.resourceToDelete) {
        // Appelez votre fonction de suppression appropriée en fonction du type de ressource
        console.log(this.resourceToDelete)
        switch (this.resourceToDelete.resource_type) {
          case 'Education':
            this.deleteArticle(this.resourceToDelete.id);
            break;
          case 'Guide':
            this.deleteGuide(this.resourceToDelete.id);
            break;
          case 'Organization':
            this.deleteOrganization(this.resourceToDelete.id);
            break;
          default:
            console.error('Type de ressource non reconnu');
            break;
        }
        this.deleteDialog = false; // Fermez la modale après la suppression
      }
    },
    openEditModal(type, resource) {
      this.isEditing = true;
      this.currentResource = resource;
      if (type === 'article') {
        this.articleForm = { ...resource };
        this.modalArticle = true;
      } else if (type === 'guide') {
        this.guideForm = { ...resource };
        this.modalGuide = true;
      } else if (type === 'organization') {
        this.organizationForm = { ...resource };
        this.modalOrganization = true;
      }
    },
    deleteArticle(id) {
      fetch(`http://localhost:3000/educative-resources/${id}`, {
        method: 'DELETE',
      })
      .then(response => {
        if (!response.ok) {
          throw new Error('Erreur lors de la suppression de l\'article');
        }
        return response.text();
      })
      .then(data => {
        console.log('Réponse du serveur :', data);
        console.log('Article supprimé avec succès');
        // Mettez à jour vos données après la suppression si nécessaire
        this.alertMessage = 'Article supprimé avec succès';
        this.showAlert = true;
        this.fetchEducationalResources();
      })
      .catch(error => {
        console.error(error);
      });
    },
    deleteOrganization(id) {
      fetch(`http://localhost:3000/assistance-organizations/${id}`, {
        method: 'DELETE',
      })
      .then(response => {
        if (!response.ok) {
          throw new Error('Erreur lors de la suppression de l\'organization');
        }
        return response.text();
      })
      .then(data => {
        console.log('Réponse du serveur :', data);
        console.log('Organization supprimé avec succès');
        // Mettez à jour vos données après la suppression si nécessaire
        this.alertMessage = 'Organisation supprimée avec succès';
        this.showAlert = true;
        this.fetchAssistanceOrganizations();
      })
      .catch(error => {
        console.error(error);
      });
    },
    deleteGuide(id) {
      fetch(`http://localhost:3000/prevention-support-guides/${id}`, {
        method: 'DELETE',
      })
      .then(response => {
        if (!response.ok) {
          throw new Error('Erreur lors de la suppression du guide');
        }
        return response.text();
      })
      .then(data => {
        console.log('Réponse du serveur :', data);
        console.log('Guide supprimé avec succès');
        this.alertMessage = 'Guide supprimé avec succès';
        this.showAlert = true;
        // Mettez à jour vos données après la suppression si nécessaire
        this.fetchPreventionSupportGuides();
      })
      .catch(error => {
        console.error(error);
      });
    },
    createArticle() {
      console.log(JSON.stringify(this.articleForm))
  fetch('http://localhost:3000/educative-resources', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(this.articleForm),
  })
  .then(response => {
    if (!response.ok) {
      throw new Error('Erreur lors de la création de l\'article');
    }
    return response.text();
  })
  .then(data => {
    // Traitez la réponse si nécessaire
    console.log('Réponse du serveur :', data);
    console.log('Article créé avec succès', data);
    // Réinitialisez le formulaire après la création
    this.articleForm = {
      title: '',
      description: '',
      link: '',
      type: 'Article'
    };
    this.fetchEducationalResources()
    // Fermez la modale après la création
      this.modalArticle = false;
      this.showAlert = true;
      this.alertMessage = 'Article crée avec succès';
    })
    .catch(error => {
      console.error(error);
    });
  },
  createGuide() {
    fetch('http://localhost:3000/prevention-support-guides', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(this.guideForm),
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Erreur lors de la création du guide de prévention');
      }
      return response.text();
    })
    .then(data => {
      // Traitez la réponse si nécessaire
      console.log('Guide de prévention créé avec succès', data);
      // Réinitialisez le formulaire après la création
      this.guideForm = {
        title: '',
        description: '',
        link: ''
      };
      // Fermez la modale après la création
      this.modalGuide = false;
      this.fetchPreventionSupportGuides()
      this.showAlert = true;
      this.alertMessage = 'Guide crée avec succès';
    })
    .catch(error => {
      console.error(error);
    });
  },
  createOrganization() {
    fetch('http://localhost:3000/assistance-organizations', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(this.organizationForm),
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Erreur lors de la création de l\'organisation d\'assistance');
      }
      return response.text();
    })
    .then(data => {
      // Traitez la réponse si nécessaire
      console.log('Organisation d\'assistance créée avec succès', data);
      // Réinitialisez le formulaire après la création
      this.organizationForm = {
        name: '',
        phone: '',
        description: '',
        link: ''
      };
      // Fermez la modale après la création
      this.modalOrganization = false;
      this.fetchAssistanceOrganizations()
      this.showAlert = true;
      this.alertMessage = 'Organization crée avec succès';
    })
    .catch(error => {
      console.error(error);
    });
  },
  updateGuide() {
    console.log(this.currentResource)
    fetch(`http://localhost:3000/prevention-support-guides/${this.currentResource.id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(this.guideForm),
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Erreur lors de la mise à jour de l\'organisation');
      }
      return response.text();
    })
    .then(data => {
      this.fetchPreventionSupportGuides()
      // Mettez à jour l'organisation dans la liste avec les données mises à jour
      const index = this.assistanceOrganizations.findIndex(org => org.id === this.currentResource.id);
      if (index !== -1) {
        this.$set(this.assistanceOrganizations, index, data);
      }
      this.modalGuide = false;
      this.showAlert = true;
      this.alertMessage = 'Guide mis à jour avec succès';
    })
    .catch(error => {
      console.error(error);
    });
    },
      openModal(resourceType) {
        this.isEditing = false;
      switch (resourceType) {
        case 'article':
          this.articleForm = {
            title: '',
            description: '',
            link: '',
            type: 'Article'
          }
          this.modalArticle = true;
          break;
        case 'guide':
          this.guideForm = {
            title: '',
            description: '',
            link: ''
          }
          this.modalGuide = true;
          break;
        case 'organization':
          this.organizationForm = {
            name: '',
            phone: '',
            description: '',
            link: ''
          }
          this.modalOrganization = true;
          break;
        default:
          break;
      }
    },
      fetchResources() {
        this.fetchEducationalResources();
        this.fetchPreventionSupportGuides();
        this.fetchAssistanceOrganizations();
      },
      fetchEducationalResources() {
        fetch('http://localhost:3000/educative-resources')
          .then(response => {
            if (!response.ok) {
              throw new Error('Erreur lors de la récupération des ressources éducatives');
            }
            return response.json();
          })
          .then(data => {
            data.forEach(resource => {
              resource.resource_type = 'Education';
            });
            // Assigner les données modifiées à votre variable
            this.educationalResources = data;
          })
          .catch(error => {
            console.error(error);
          });
      },
      fetchPreventionSupportGuides() {
        fetch('http://localhost:3000/prevention-support-guides')
          .then(response => {
            if (!response.ok) {
              throw new Error('Erreur lors de la récupération des guides de prévention');
            }
            return response.json();
          })
          .then(data => {
            data.forEach(resource => {
              resource.resource_type = 'Guide';
            });
            this.preventionSupportGuides = data;
          })
          .catch(error => {
            console.error(error);
          });
      },
      updateOrganization() {
        console.log(this.currentResource)
    fetch(`http://localhost:3000/assistance-organizations/${this.currentResource.id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(this.organizationForm),
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Erreur lors de la mise à jour de l\'organisation');
      }
      return response.text();
    })
    .then(data => {
      this.fetchAssistanceOrganizations()
      // Mettez à jour l'organisation dans la liste avec les données mises à jour
      const index = this.assistanceOrganizations.findIndex(org => org.id === this.currentResource.id);
      if (index !== -1) {
        this.$set(this.assistanceOrganizations, index, data);
      }
      this.modalOrganization = false;
      this.showAlert = true;
      this.alertMessage = 'Organization mise à jour avec succès';
    })
    .catch(error => {
      console.error(error);
    });
      },
      updateArticle() {
        console.log(this.currentResource)
    fetch(`http://localhost:3000/educative-resources/${this.currentResource.id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(this.articleForm),
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Erreur lors de la mise à jour de la ressource');
      }
      return response.text();
    })
    .then(data => {
      this.fetchEducationalResources()
      // Mettez à jour l'organisation dans la liste avec les données mises à jour
      const index = this.assistanceOrganizations.findIndex(org => org.id === this.currentResource.id);
      if (index !== -1) {
        this.$set(this.assistanceOrganizations, index, data);
      }
      this.modalArticle = false;
      this.showAlert = true;
      this.alertMessage = 'Ressource mise à jour avec succès';
    })
    .catch(error => {
      console.error(error);
    });
      },
      fetchAssistanceOrganizations() {
        fetch('http://localhost:3000/assistance-organizations')
          .then(response => {
            if (!response.ok) {
              throw new Error('Erreur lors de la récupération des organisations d\'assistance');
            }
            return response.json();
          })
          .then(data => {
            data.forEach(resource => {
              resource.resource_type = 'Organization';
            });
            this.assistanceOrganizations = data;
          })
          .catch(error => {
            console.error(error);
          });
      },
      redirectToLink(link) {
        window.open(link, '_blank');
      }
    }
  };
</script>

<style scoped>
.headline {
  font-size: 24px;
  margin-bottom: 20px;
}

.buttonCreate {
  color: white;
}

.subheadline {
  font-size: 20px;
  margin-top: 30px;
  margin-bottom: 10px;
}
#app {
  margin-top: 90px;
  background-color: #aedbdd;
}

.resource-card {
  margin-top: 20px;
}

.fixed-bottom {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 9999; /* Assurez-vous que l'alerte est au-dessus du reste du contenu */
}
.content1 {
  width: 50% !important
}

</style>