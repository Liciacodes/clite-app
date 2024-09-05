<template>
    <div>
      <h1>Investment Funds</h1>
  
    
      <label for="risk-level-filter">Filter by Risk Level: </label>
      <select id="risk-level-filter" v-model="selectedRiskLevel">
        <option value="">All</option>
        <option value="1">Low</option>
        <option value="2">Medium</option>
        <option value="3">High</option>
      </select>
 
     
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
         
          <tr v-for="fund in filteredFunds" :key="fund.id">
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
  import { ref, computed, onMounted } from 'vue';
  import { useMyStore } from '@/stores/funds'; 
  
  const store = useMyStore();
  const selectedRiskLevel = ref(''); 
  
 
  onMounted(() => {
    store.fetchData(); 
  });
  

  const filteredFunds = computed(() => {
    if (!selectedRiskLevel.value) {
      
      return store.funds;
    }
  
  
    return store.funds.filter(fund => fund.risk == selectedRiskLevel.value);
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
  