import { createRouter, createWebHistory } from 'vue-router';
import InvestmentDetails from '@/components/FundDetails.vue';
import Home from '@/components/Home.vue';
import NotFound from '@/components/NotFound.vue';

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
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: NotFound
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
