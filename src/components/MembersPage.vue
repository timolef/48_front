<template>
  <v-app>
    <v-container>
      <div class="mt-4" v-for="(group, groupName, index) in groupMembersByGroup()" :key="index">
        <v-divider></v-divider>
        <h2 class="section-title">{{ groupName }}</h2>
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
              <v-card-subtitle class="member-role">{{ member.role }}</v-card-subtitle>
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
        { name: 'Églantine', role: 'Responsable communication', photo: 'eglantine.jpg', groupe: 'Pôle communication' },
        { name: 'Romane', role: 'Co-responsable communication', photo: 'romane.jpg', groupe: 'Pôle communication' },
        { name: 'Timothée F.', role: 'Responsable partenariat', photo: 'timotheef.jpg', groupe: 'Pôle partenariats' },
        { name: 'Quitterie', role: 'Membre partenariat', photo: 'quitterie.jpg', groupe: 'Pôle partenariats' },
        { name: 'Nicolas', role: 'Responsable podcast', photo: 'nicolas.jpg', groupe: 'Pôle podcasts' },
        { name: 'Maxence', role: 'Membre podcast', photo: 'maxence.jpg', groupe: 'Pôle podcasts' },
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
  padding-top: 10px;
  height: 250px;
  width: 280px;
  text-align: center;
  align-items: center;
  border-radius: 10px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.15);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  background-color: #ffffff;
}
.member-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
}

.image {
  height: 100px;
  width: 100px;
  margin-top: 15px;
  margin: auto;
  border-radius: 50%;
  transition: filter 0.3s ease, transform 0.3s ease;
}
.member-card:hover .image {
  filter: grayscale(0%);
  transform: scale(1.1);
}

.centered-row {
  justify-content: center;
}

.member-name {
  font-size: 1.25em;
  font-weight: 600;
  color: #333;
  text-align: center;
  margin-top: 10px;
}

.member-role {
  font-size: 1em;
  color: #555;
}

.section-title {
  background-color: #3da3a8;
  color: #ffffff;
  padding: 8px 15px;
  border-radius: 8px;
  text-align: center;
  font-weight: 700;
  margin-bottom: 20px;
}

#app {
  margin-top: 90px;
  background-color: #aedbdd;
  align-items: center;
  text-align: center;
  flex-direction: column;
}

.bw-image {
  filter: grayscale(100%);
}

.v-divider {
  background-color: #3da3a8;
  height: 1px;
}
</style>
