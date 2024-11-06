import Vue from 'vue'
import VueRouter from 'vue-router'
import MainPage from '../components/MainPage.vue';
import NewsPage from '../components/NewsPage.vue';
import ContactPage from '../components/ContactPage.vue';
import ResourcesPage from '../components/RessourcesPage.vue';
import AboutPage from '../components/AboutPage.vue';
import MembersPage from '../components/MembersPage.vue';
import ProfilePage from '../components/ProfilePage.vue';
import LoginPage from '../components/LoginPage.vue';
import AdminPage from '../components/AdminPage.vue';
import RegisterPage from '@/components/RegisterPage.vue';

Vue.use(VueRouter)

const routes = [
  {
    path: '/home',
    name: 'MainPage',
    component: MainPage,
    meta: {
      title: 'Accueil - Association 48%',
    },
  },
  {
    path: '/news',
    name: 'NewsPage',
    component: NewsPage,
    meta: {
      title: 'Publications - Association 48%',
    },
  },
  {
    path: '/register',
    name: 'RegisterPage',
    component: RegisterPage,
    meta: {
      title: 'Inscription - Association 48%',
    },
  },
  {
    path: '/contact',
    name: 'ContactPage',
    component: ContactPage,
    meta: {
      title: 'Nous Contacter - Association 48%',
    },
  },
  {
    path: '/ressources',
    name: 'ResourcesPage',
    component: ResourcesPage,
    meta: {
      title: 'Ressources - Association 48%',
    },
  },
  {
    path: '/about',
    name: 'AboutPage',
    component: AboutPage,
    meta: {
      title: 'À propos - Association 48%',
    },
  },
  {
    path: '/members',
    name: 'MembersPage',
    component: MembersPage,
    meta: {
      title: 'Nos Membres - Association 48%',
    },
  },
  {
    path: '/profil',
    name: 'ProfilePage',
    component: ProfilePage,
    meta: {
      title: 'Profil - Association 48%',
    },
  },
  {
    path: '/login',
    name: 'LoginPage',
    component: LoginPage,
    meta: {
      title: 'Connexion - Association 48%',
    },
  },
  {
    path: '/admin',
    name: 'AdminPage',
    component: AdminPage,
    meta: {
      title: 'Admin - Association 48%',
      requiresAdmin: true, // Accessible uniquement aux administrateurs
    },
  },
];

const router = new VueRouter({
  mode: 'history',
  routes,
});

// Navigation Guard pour vérifier l'accès admin
router.beforeEach((to, from, next) => {
  const isAdmin = localStorage.getItem('isAdmin') === '1';

  if (to.meta.requiresAdmin && !isAdmin) {
    return next('/home'); // Redirige vers l'accueil si l'utilisateur n'est pas admin
  }

  document.title = to.meta.title || 'Association 48%';
  next();
});

export default router;
