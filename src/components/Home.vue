<template>
    <div class="app-container" >
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
  
     
      <table v-if="!store.loading && !store.error" >
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
            <td>{{ formattedReturns(fund.returns) }}</td>
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

  const formattedReturns = (returns) => {
    return (returns * 100).toFixed(2) + '%'
  }
  </script>
  
  
 



  <style scoped>

.app-container {
  background-color: #F9FBFD; 
  min-height: 100vh;
  padding: 2rem;
}

h1 {
  font-size: 2rem;
  font-weight: 700;
  color: #0067F5;
  text-align: center;
  margin-bottom: 1.5rem;
  font-family: 'Poppins', sans-serif;
}


table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 2rem;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
  font-family: 'Inter', sans-serif;
}

th, td {
  border: 1px solid #E6E9EF;
  padding: 12px 15px;
  text-align: left;
  font-size: 1rem;
}

th {
  background-color: #F1F5FA;
  color: #4D5566;
  font-weight: 600;
}

td {
  background-color: #FFF;
  color: #333;
}

tr:hover td {
  background-color: #F7FAFF; 
}


#risk-level-filter {
  padding: 0.5rem 1rem;
  border: 1px solid #E6E9EF;
  border-radius: 0.25rem;
  font-family: 'Inter', sans-serif;
  font-size: 1rem;
  margin-bottom: 1.5rem;
  width: 200px;
}


a {
  color: #0067F5;
  text-decoration: none;
  font-weight: 500;
}

a:hover {
  text-decoration: underline;
}


.px-8 {
  padding: 2rem 3rem;
}


button {
  background-color: #0067F5;
  color: white;
  padding: 0.5rem 1.5rem;
  border: none;
  border-radius: 0.25rem;
  font-size: 1rem;
  cursor: pointer;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

button:hover {
  background-color: #0056D2;
}
</style>
