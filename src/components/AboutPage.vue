<template>
  <v-app>
    <v-container>
      <v-tabs bg-color="deep-purple-accent-4" v-model="tab" class="mt-4" fixed-tabs stacked>
        <v-tab>48% en bref</v-tab>
        <v-tab>Notre fonctionnement</v-tab>

        <v-tab-item>
          <v-card class="card">
            <v-card-title style="text-align: center; width: 1000px">
              <h2 class="category-title"><v-icon>mdi-bullhorn</v-icon> - Pourquoi le nom 48% ?</h2>
            </v-card-title>
            <v-divider></v-divider>
            <v-card-text>
              <p class="category-content">Le choix du nom n'est pas anodin. Il est le reflet d'une réalité alarmante révélée par un rapport du Sénat : 48% des personnes harcelées à l'école n'en parlent jamais. Ce silence est lourd de conséquences, et notre mission est de briser ce mur de silence en offrant des espaces de parole et de soutien, ainsi qu'en sensibilisant à cette problématique pour encourager les jeunes à partager leurs expériences et à chercher de l'aide.</p>
            </v-card-text>
          </v-card>
          <v-card class="card">
            <v-card-title style="text-align: center; width: 1000px">
              <h2 class="category-title"><v-icon>mdi-bullhorn</v-icon> - D'où t'es venue l'idée de cette association ?</h2>
            </v-card-title>
            <v-divider></v-divider>
            <v-card-text>
              <p class="category-content">L'idée de créer 48% m'est venue lors d'un projet solidaire au Cambodge avec l'association "Toutes à l'école" de Tina Kieffer. Pendant deux mois et demi, j'ai été témoin de l'impact positif de l'éducation et du soutien sur les jeunes filles. Cette expérience a été si enrichissante que, de retour en France, j'ai ressenti le besoin impérieux de continuer à aider et à faire une différence, cette fois-ci en m'attaquant au fléau du harcèlement scolaire.</p>
            </v-card-text>
          </v-card>
          <v-card class="card">
            <v-card-title style="text-align: center; width: 1000px">
              <h2 class="category-title"><v-icon>mdi-bullhorn</v-icon> - Quel est le but de 48% ?</h2>
            </v-card-title>
            <v-divider></v-divider>
            <v-card-text>
              <p class="category-content">Le but principal de 48% est de lutter activement contre le harcèlement scolaire, les problèmes de santé mentale et en démystifant différents sujets. Nous souhaitons sensibiliser, soutenir, et intervenir de manière holistique pour aider les élèves à comprendre, reconnaître, et agir face au harcèlement scolaire. En impliquant directement les étudiants et en collaborant avec les écoles et les professionnels de la santé mentale, nous croyons fermement en notre capacité à faire une différence significative.</p>
            </v-card-text>
          </v-card>
          <v-card class="card">
            <v-card-title style="text-align: center; width: 1000px">
              <h2 class="category-title"><v-icon>mdi-bullhorn</v-icon> - Quels sont les différents pôles de l'association 48% ?</h2>
            </v-card-title>
            <v-divider></v-divider>
            <v-card-text>
              <p class="category-content">Notre association est structurée autour de plusieurs pôles, chacun ayant un rôle crucial dans la réalisation de notre mission.
<br/>- Pôle Intervention : Ce pôle est au cœur de notre action sur le terrain. Il organise et met en œuvre les interventions dans les établissements scolaires, sensibilise les élèves au harcèlement et anime les groupes de parole et de soutien.
<br/>- Pôle Communication : Essentiel pour diffuser notre message, ce pôle gère nos comptes sur les réseaux sociaux, crée du contenu engageant et bienveillant, et s'assure que notre mission atteint un large public.
<br/>- Pôle Site Web : Ce pôle développe et maintient notre présence en ligne. Le site web est une vitrine de notre action et une ressource précieuse pour ceux qui cherchent à comprendre le harcèlement scolaire et à trouver de l'aide.
<br/>- Pôle Partenariat : Ce pôle établit des relations stratégiques avec d'autres organisations, écoles et professionnels de la santé mentale pour élargir notre impact et renforcer notre réseau de soutien.
<br/>- Pôle Trésorerie : Indispensable à la bonne gestion de l'association, ce pôle assure la santé financière de 48%, gérant les fonds avec transparence et en cherchant des financements pour soutenir nos activités.
<br/>- Pôle Podcast : Enfin, le pôle podcast, qui est une extension de notre mission éducative et de sensibilisation. À travers ce média, nous partageons des histoires, des expériences et des discussions approfondies, offrant une autre plateforme pour éduquer et inspirer au changement.
</p>
            </v-card-text>
          </v-card>
          <v-card class="card">
            <v-card-title style="text-align: center; width: 1000px">
              <h2 class="category-title"><v-icon>mdi-bullhorn</v-icon> - Quelle a été la partie la plus dure pendant la création de l'association ?</h2>
            </v-card-title>
            <v-divider></v-divider>
            <v-card-text>
              <p class="category-content">La partie la plus difficile a été la remise en question constante : savoir quand se faire confiance et quand écouter les conseils et critiques extérieurs. Il a également été crucial de créer un environnement où tous les membres de l'association se sentent écoutés, valorisés et soutenus. Cet équilibre fragile entre confiance en soi et ouverture aux autres a été un véritable défi à surmonter.</p>
            </v-card-text>
          </v-card>
          <v-card class="card">
            <v-card-title style="text-align: center; width: 1000px">
              <h2 class="category-title"><v-icon>mdi-bullhorn</v-icon> - Quel est le meilleur souvenir que tu as par rapport à l'asso ?</h2>
            </v-card-title>
            <v-divider></v-divider>
            <v-card-text>
              <p class="category-content">Mon meilleur souvenir reste le jour où j'ai reçu la confirmation officielle de la création de l'association. Après de longues heures consacrées aux démarches administratives, savoir que nous pouvions enfin concrétiser nos ambitions et lancer pleinement nos actions a été un moment de pure joie et de fierté. Cela a marqué le début d'une aventure, avec la communication sur les réseaux sociaux et la mise en place de nos projets, nous permettant de commencer à faire la différence dans la vie des jeunes touchés par le harcèlement scolaire.</p>
            </v-card-text>
          </v-card>
          <!-- Ajoutez d'autres cartes pour la fondation ici -->
        </v-tab-item>
        <v-tab-item>
          <v-card class="card">
            <v-card-title style="text-align: center; width: 1000px">
              <h2 class="category-title"><v-icon>mdi-school</v-icon> - Notre Mission</h2>
            </v-card-title>
            <v-divider></v-divider>
            <v-card-text>
              <p class="category-content">Notre association a pour mission de lutter activement contre le harcèlement scolaire, un problème qui affecte de nombreux élèves et a des conséquences graves sur leur bien-être et leur éducation. Nous croyons qu'en impliquant des étudiants dans notre association, nous créons une proximité qui favorise une meilleure compréhension des enjeux actuels. Pour atteindre cet objectif, nous avons élaboré un plan d'action concret et innovant.</p>
            </v-card-text>
          </v-card>
          <v-card class="card">
            <v-card-title style="text-align: center; width: 1000px">
              <h2 class="category-title"><v-icon>mdi-instagram</v-icon> - Création de Comptes sur les Réseaux Sociaux</h2>
            </v-card-title>
            <v-divider></v-divider>
            <v-card-text>
              <p class="category-content">Nous établirons une présence en ligne en créant des comptes sur divers réseaux sociaux. Ces plateformes deviendront des espaces de bienveillance pour les jeunes, où nous aborderons et démystifierons divers sujets liés à la vie scolaire, à la santé mentale et aux relations interpersonnelles. Les élèves pourront poser des questions, partager leurs expériences et recevoir un soutien en ligne.</p>
            </v-card-text>
          </v-card>
          <v-card class="card">
            <v-card-title style="text-align: center; width: 1000px">
              <h2 class="category-title"><v-icon>mdi-bullhorn</v-icon> - Interventions de Sensibilisation </h2>
            </v-card-title>
            <v-divider></v-divider>
            <v-card-text>
              <p class="category-content">La fondation prévoit d'organiser des interventions dans les collèges pour sensibiliser les élèves au problème du harcèlement scolaire. Ces interventions seront interactives et axées sur la prévention, visant à encourager les élèves à reconnaître les signes de harcèlement et à prendre des mesures pour le prévenir. Par exemple, des mises en scène et des discussions interactives permettront de comprendre les conséquences du harcèlement sur les victimes et d'encourager les harceleurs à réfléchir à leurs actions.</p>
            </v-card-text>
          </v-card>
          <v-card class="card">
            <v-card-title style="text-align: center; width: 1000px">
              <h2 class="category-title"><v-icon>mdi-account-group</v-icon> - Groupes de Parole et de Soutien dans les Collèges </h2>
            </v-card-title>
            <v-divider></v-divider>
            <v-card-text>
              <p class="category-content">La fondation prévoit de se rendre dans les collèges pour créer des groupes de parole et de soutien. Ces groupes offriront un espace sûr où les élèves pourront s'exprimer librement sur leurs expériences de harcèlement, leurs peurs et leurs préoccupations. Notre objectif est d'établir des services de consultation psychologique dans les collèges, accessibles aux élèves pendant la journée d'intervention.</p>
            </v-card-text>
          </v-card>
          <!-- Ajoutez d'autres cartes pour l'association ici -->
        </v-tab-item>
      </v-tabs>
    </v-container>
  </v-app>
</template>

<script>
export default {
  data() {
    return {
      tab: null,
    };
  },
};
</script>

<style scoped>
.card {
  margin-top: 10px;
  
}
.headline {
  font-size: 24px;
  margin-bottom: 20px;
}
.category-title {
  font-size: 20px;
  text-align: center;
  margin-bottom: 5px;
}
#app {
  margin-top: 90px;
    background-color: #aedbdd;
}
.category-divider {
  margin-bottom: 10px;
  
}
.category-content {
  font-size: 17px;
  font-family: Helvetica, Verdana, sans-serif;
}
</style>