import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue';
import PetListView from '../views/PetListView.vue';
import PetDetailView from '../views/PetDetailView.vue';
import AddPetView from '../views/AddPetView.vue';
import AdminAddPetView from '../views/AdminAddPetView.vue';



const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/pets',
      name: 'pets',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/PetListView.vue'),
    },
    {
      path: '/pets/:id',
      name: 'pet-detail',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/PetDetailView.vue'),
    },
    {
      path: '/add',
      name: 'add-pet',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AddPetView.vue'),
    },
    {
      path: '/admin/add',
      name: 'admin-add-pet',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AdminAddPetView.vue'),
    },
  ],
})


export default router;
