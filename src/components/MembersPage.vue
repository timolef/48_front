<template>
  <v-app>
    <v-container>
      <div class="mt-4" v-for="(group, groupName, index) in groupMembersByGroup()" :key="index">
        <v-divider></v-divider>
        <h2 class="bg-white">{{ groupName }}</h2>
        <v-divider class="mb-8"></v-divider>
      <v-row class="centered-row">
        <v-col
          v-for="(member, index) in group"
          :key="index"
          cols="12"
          sm="4"
          md="4"
          lg="3"
        >
          <v-card class="member-card">
            <v-img class="image bw-image" :src="require(`@/assets/${member.photo}`)" aspect-ratio="1"></v-img>
            <v-card-title class="member-name">{{ member.name }}</v-card-title>
            <v-card-subtitle>{{ member.role }}</v-card-subtitle>
          </v-card>
        </v-col>
      </v-row>
    </div>
    </v-container>
  </v-app>
</template>
  
  <script>
  export default {
    data() {
      return {
        members: [
          { name: 'Ambre', role: 'Présidente', photo: 'ambre.jpg', groupe: 'Présidence'},
          { name: 'Zoe', role: 'Vice présidente', photo: 'zoe.jpg', groupe: 'Présidence' },
          { name: 'Maxence', role: 'Secrétaire général', photo: 'maxence.jpg', groupe: 'Administration' },
          { name: 'Valentine', role: 'Co-secrétaire général', photo: 'valentine.jpg', groupe: 'Administration' },
          { name: 'Mathilde', role: 'Trésorière', photo: 'mathilde.jpg', groupe: 'Administration' },
          { name: 'Romane', role: 'Responsable communication', photo: 'romane.jpg', groupe: 'Pôle communication' },
          { name: 'Églantine', role: 'Co-responsable communication', photo: 'eglantine.jpg', groupe: 'Pôle communication' },
          { name: 'Timothée F.', role: 'Responsable partenariat', photo: 'timotheef.jpg', groupe: 'Pôle partenariats' },
          { name: 'Quitterie', role: 'Membre partenariat', photo: 'quitterie.jpg', groupe: 'Pôle partenariats' },
          { name: 'Maxence', role: 'Responsable podcast', photo: 'maxence.jpg', groupe: 'Pôle podcasts' },
          { name: 'Nicolas', role: 'Membre podcast', photo: 'nicolas.jpg', groupe: 'Pôle podcasts' },
          { name: 'Maissa', role: 'Membre podcast', photo: 'maissa.jpg', groupe: 'Pôle podcasts' },
          { name: 'Timothée L.', role: 'Responsable site web', photo: 'timotheel.jpg', groupe: 'Pôle site web' },
        ]
      };
    },
    methods: {
      groupMembersByGroup() {
      const groupedMembers = {};
      this.members.forEach(member => {
        if (!groupedMembers[member.groupe]) {
          groupedMembers[member.groupe] = [];
        }
        groupedMembers[member.groupe].push(member);
      });
      return groupedMembers;
    }
  }
  };
  </script>
  
  <style scoped>
  .member-card {
    margin-bottom: 20px;
    height: 200px;
    width: 300px;
    text-align: center;
    align-items: center;
    padding-top: 10px;
    
  }
  .image{
    height: 100px;
    width: 100px;
    margin-top: 15px;
    margin: auto;
    border-radius: 100% !important;
  }
  .centered-row {
  justify-content: center;
}
  .member-name {
  font-size: medium;
  text-align: center;
  width: 100%;
  display: block;
}
  #app {
    margin-top: 90px;
    background-color: #aedbdd;
    align-items: center;
    text-align: center;
    display: flex;
  }
  .bg-white {
    background-color: #3da3a8;
    color: #ffffff;
    width: auto;
  }

  .bw-image {
    filter: grayscale(100%);
  }
  </style>