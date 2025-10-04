<template>
  <v-app>
    <v-container>
      <div class="mt-4" v-for="(group, groupName, index) in groupMembersByGroup()" :key="index">
        <h2 class="section-title">{{ groupName }}</h2>
        <v-row class="centered-row">
          <v-col
            v-for="(member, index) in group"
            :key="index"
            cols="12"
            sm="4"
            md="4"
            lg="3"
          >
            <v-card class="member-card" @click="openMemberDialog(member)">
              <v-img class="image bw-image" :src="require(`@/assets/${member.photo}`)" aspect-ratio="1"></v-img>
              <v-card-title class="member-name">{{ member.name }}</v-card-title>
              <v-card-subtitle class="member-role">{{ member.role }}</v-card-subtitle>
            </v-card>
          </v-col>
        </v-row>
      </div>
    </v-container>
    <v-dialog v-model="isDialogOpen" max-width="400px">
      <v-card class="infos-card">
        <v-img
          class="image-modal"
          v-if="selectedMember && selectedMember.photo"
          :src="require(`@/assets/${selectedMember?.photo}`)"
          aspect-ratio="1"
          alt="Photo du membre"
        ></v-img>
        <v-card-title class="member-name-click">{{ selectedMember?.name }}</v-card-title>
        <v-card-subtitle class="member-role">Groupe : {{ selectedMember?.groupe }}</v-card-subtitle>
        <v-card-subtitle class="member-role">Rôle : {{ selectedMember?.role }}</v-card-subtitle>
        <v-card-actions>
          <v-btn color="primary" text @click="isDialogOpen = false">Fermer</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-app>
</template>

<script>
export default {
  data() {
    return {
      members: [
  {
    name: 'Ambre',
    role: 'Présidente',
    photo: 'ambre.jpg',
    groupe: 'Présidence',
    desc: 'Visionnaire et leader inspirante, Ambre supervise les activités globales tout en veillant à la bonne cohésion de l’équipe.'
  },
  {
    name: 'Zoe',
    role: 'Vice-présidente',
    photo: 'zoe.jpg',
    groupe: 'Présidence',
    desc: 'Soutenant la présidente, Zoe se charge de superviser les initiatives stratégiques et de renforcer les collaborations internes.'
  },
  {
    name: 'Maxence',
    role: 'Secrétaire général',
    photo: 'maxence.jpg',
    groupe: 'Administration',
    desc: 'Maxence est chargé de l’organisation administrative et assure une documentation impeccable des projets.'
  },
  {
    name: 'Valentine',
    role: 'Co-secrétaire général',
    photo: 'valentine.jpg',
    groupe: 'Administration',
    desc: 'Valentine soutient les tâches administratives en coordonnant les efforts avec rigueur et professionnalisme.'
  },
  {
    name: 'Mathilde',
    role: 'Trésorière',
    photo: 'mathilde.jpg',
    groupe: 'Administration',
    desc: 'Gardienne des finances, Mathilde gère le budget et assure la transparence financière de toutes les opérations.'
  },
  {
    name: 'Eglantine',
    role: 'Responsable communication',
    photo: 'eglantine.jpg',
    groupe: 'Pôle communication',
    desc: 'Églantine supervise les stratégies de communication pour donner de la visibilité aux projets de l’organisation.'
  },
  {
    name: 'Romane',
    role: 'Responsable communication',
    photo: 'romane.jpg',
    groupe: 'Pôle communication',
    desc: 'Romane travaille sur des campagnes percutantes, garantissant une image cohérente et dynamique.'
  },
  {
    name: 'Timothée F.',
    role: 'Responsable partenariat',
    photo: 'timotheef.jpg',
    groupe: 'Pôle partenariats',
    desc: 'Spécialiste des relations externes, Timothée F. établit et entretient des collaborations avec des partenaires clés.'
  },
  {
    name: 'Quitterie',
    role: 'Responsable interventions',
    photo: 'quitterie.jpg',
    groupe: 'Pôle interventions',
    desc: 'Quitterie coordonne les initiatives terrain pour assurer un impact direct et mesurable.'
  },
  {
    name: 'Nicolas',
    role: 'Responsable podcast',
    photo: 'nicolas.jpg',
    groupe: 'Pôle podcasts',
    desc: 'Nicolas dirige la création et la diffusion de podcasts captivants qui amplifient la voix de l’organisation.'
  },
  {
    name: 'Maxence',
    role: 'Membre podcast',
    photo: 'maxence.jpg',
    groupe: 'Pôle podcasts',
    desc: 'Maxence contribue à la production des podcasts en apportant créativité et expertise technique.'
  },
  {
    name: 'Maissa',
    role: 'Membre podcast',
    photo: 'maissa.jpg',
    groupe: 'Pôle podcasts',
    desc: 'Maïssa participe à la préparation des contenus audio, offrant des perspectives originales et enrichissantes.'
  },
  {
    name: 'Timothée L.',
    role: 'Responsable site web',
    photo: 'timotheel.jpg',
    groupe: 'Pôle site web',
    desc: 'En charge du site, Timothée L. optimise la plateforme pour une navigation fluide et une mise en valeur des projets.'
  }
]
,
      isDialogOpen: false,
      selectedMember: null,
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
    },
    openMemberDialog(member) {
      this.selectedMember = member;
      this.isDialogOpen = true;
    },
  }
};
</script>

<style scoped>
.member-card {
  padding-top: 10px;
  height: 230px;
  width: 270px;
  text-align: center;
  align-items: center;
  border-radius: 15px;
  box-shadow: 0 6px 14px rgba(0, 0, 0, 0.2);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  background-color: #ffffff;
  cursor: pointer;
  overflow: hidden;
}

.member-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.3);
}

.member-card:hover .image {
  filter: grayscale(0%);
  transform: scale(1.2);
}

.infos-card {
  width: 700px;
  padding: 25px 20px;
  text-align: center;
  border-radius: 15px;
  box-shadow: 0 6px 14px rgba(0, 0, 0, 0.2);
  background-color: #ffffff;
}

.image {
  height: 110px;
  width: 110px;
  margin-top: 20px;
  margin: auto;
  border-radius: 50%;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.image-modal {
  height: 220px;
  width: 220px;
  margin: auto;
  border-radius: 15%;
  margin-top: 15px;
  transition: transform 0.3s ease;
}

.image-modal:hover {
  transform: scale(1.05);
}

.centered-row {
  justify-content: center;
  gap: 15px; /* Espacement entre les colonnes */
}
.member-name {
  font-size: 1.4em;
  font-weight: 700;
  color: #333;
  text-align: center;
  margin-top: 15px;
  display: block;
}
.member-name-click {
  font-size: 1.4em;
  font-weight: 700;
  color: #333;
  text-align: center;
  margin-top: 15px;
  margin-bottom: 20px;
  display: block;
}

.member-role {
  font-size: 1.1em;
  color: #666;
}

.section-title {
  background: linear-gradient(90deg, #3da3a8, #2b7781); /* Dégradé pour plus de modernité */
  color: #ffffff;
  padding: 12px 20px; /* Plus de padding pour un look espacé */
  border-radius: 16px; /* Augmenter la courbure pour un style plus doux */
  text-align: center;
  font-weight: 300;
  margin-bottom: 30px; /* Augmentation de l'espace entre les sections */
  font-size: 1.4rem; /* Agrandir pour donner plus d'importance */
  box-shadow: 0px 4px 15px rgba(0, 0, 0, 0.2); /* Plus de profondeur */
  text-transform: uppercase; /* Uniformiser les titres en majuscules */
  letter-spacing: 0.8px; /* Espacement léger entre les lettres */
}

.section-title::after {
  content: '';
  display: block;
  width: 60px;
  height: 4px;
  margin: 10px auto 0;
  background: #fff;
  border-radius: 2px;
}

#app {
  margin-top: 80px;
  background-color: #aedbdd;
  align-items: center;
  text-align: center;
  flex-direction: column;
  min-height: 100vh;
}

.bw-image {
  filter: grayscale(100%);
}

.v-divider {
  background-color: #3da3a8;
  height: 2px;
}


.easter-egg:hover {
  background-color: rgba(61, 163, 168, 0.4);
  transform: scale(1.2);
}

/* Animation pour les cartes au hover */
@keyframes bounce {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-5px);
  }
}
.member-card:hover {
  animation: bounce 0.5s infinite ease-in-out;
}

</style>
