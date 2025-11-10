<template>
  <v-app id="app" class="fill-height">
    <v-container fluid class="d-flex align-center justify-center profile-container">
      <v-card elevation="6" class="profile-card rounded-xl">
        
        <!-- En-tête avec avatar -->
        <v-card-title class="d-flex flex-column align-center profile-header">
          <v-avatar size="100" class="mb-3">
            <v-img src="https://cdn-icons-png.flaticon.com/512/149/149071.png" />
          </v-avatar>
          <h2 class="profile-name">{{ fullName || username }}</h2>
          <span class="profile-username">@{{ username }}</span>
        </v-card-title>

        <v-divider class="my-2"></v-divider>

        <!-- Contenu profil -->
        <v-card-text>
          <v-row>
            <v-col cols="12" sm="6" class="info-item">
              <v-icon color="primary" class="mr-2">mdi-account</v-icon>
              <strong>Prénom : </strong> {{ firstname }}
            </v-col>
            <v-col cols="12" sm="6" class="info-item">
              <v-icon color="primary" class="mr-2">mdi-account-outline</v-icon>
              <strong>Nom :</strong> {{ name }}
            </v-col>
            <v-col cols="12" sm="6" class="info-item">
              <v-icon color="primary" class="mr-2">mdi-email</v-icon>
              <strong>Email :</strong> {{ email }}
            </v-col>
            <v-col cols="12" sm="6" class="info-item">
              <v-icon color="primary" class="mr-2">mdi-cake-variant</v-icon>
              <strong>Date de naissance : </strong> {{ birthdate }}
            </v-col>
            <v-col cols="12" sm="6" class="info-item">
              <v-icon color="primary" class="mr-2">mdi-gender-male-female</v-icon>
              <strong>Genre :</strong> {{ gender }}
            </v-col>
          </v-row>
        </v-card-text>

        <!-- Boutons -->
        <v-card-actions class="d-flex justify-center">
          <v-btn color="red-darken-1" variant="tonal" @click="logout">
            <v-icon left>mdi-logout</v-icon>
            Déconnexion
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-container>
  </v-app>
</template>

<script>
export default {
  data() {
    return {
      username: '',
      firstname: '',
      name: '',
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
      this.username = localStorage.getItem('username') || '';
      this.firstname = localStorage.getItem('firstname') || '';
      this.name = localStorage.getItem('lastname') || '';
      this.fullName = this.firstname + ' ' + this.name;
      this.email = localStorage.getItem('email') || '';
      this.gender = localStorage.getItem('gender') || '';
      this.birthdate = localStorage.getItem('birthdate') || '';

      if (this.birthdate) {
        const date = new Date(this.birthdate);
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();
        this.birthdate = `${day}/${month}/${year}`;
      }
    },
    logout() {
      localStorage.clear();
      this.$router.push('/login');
    }
  }
};
</script>

<style scoped>
#app {
  background: linear-gradient(135deg, #aedbdd, #fef598);
  min-height: 100vh;
}

.profile-container {
  min-height: 100vh;
}

.profile-card {
  max-width: 600px;
  width: 100%;
  padding: 20px;
}

.profile-header {
  background-color: #fef598;
  color: #26AAAF;
  border-radius: 16px 16px 0 0;
}

.profile-name {
  font-weight: bold;
  margin: 0;
  color: #26AAAF;
}

.profile-username {
  color: #777;
  font-size: 14px;
}

.info-item {
  display: flex;
  align-items: center;
  font-size: 16px;
  margin-bottom: 10px;
}
</style>
