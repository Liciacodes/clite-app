<template>
    <div>
      <h1>Investment Funds</h1>
      <div v-if="store.loading">Loading...</div>
      <div v-if="store.error">Error: {{ store.error.message }}</div>
  
      <table v-if="!store.loading && !store.error">
        <thead>
          <tr>
            <th>Name</th>
            <th>Returns</th>
            <th>Asset Type</th>
            <th>Fund Manager</th>
            <th>Risk Level</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="fund in store.funds" :key="fund.id">
            <td>
              <router-link :to="{ name: 'InvestmentDetails', params: { id: fund.id } }">
                {{ fund.name }}
              </router-link>
            </td>
            <td>{{ (fund.returns * 100).toFixed(2) }}%</td>
            <td>
              <span v-if="fund.is_money_market">Money Market</span>
              <span v-else-if="fund.is_eurobond">Eurobond</span>
              <span v-else>Other</span>
            </td>
            <td>{{ fund.fund_manager }}</td>
            <td>{{ fund.risk }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </template>
  
  <script setup>
  import { onMounted } from 'vue';
  
  import { useMyStore } from '@/stores/myStore';

 
  const store = useMyStore();
  
  
  onMounted(() => {
      store.fetchData(); 
  });
  </script>
  
  <style scoped>
  table {
      width: 100%;
      border-collapse: collapse;
  }
  th, td {
      border: 1px solid #ddd;
      padding: 8px;
  }
  th {
      background-color: #f2f2f2;
  }
  </style>