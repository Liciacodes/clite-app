import { createRouter, createWebHistory } from 'vue-router';
import InvestmentDetails from '@/components/InvestmentDetails.vue';
import Home from '@/components/Home.vue';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/funds/:id',
    name: 'InvestmentDetails',
    component: InvestmentDetails,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
