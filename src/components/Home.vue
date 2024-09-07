<template>
  <div class="app-container">
    <h1>Investment Funds</h1>

    <label for="risk-level-label">Filter by Risk Level: </label>
    <select id="risk-level-filter" v-model="selectedRiskLevel">
      <option value="">All</option>
      <option value="1">Low</option>
      <option value="2">Medium</option>
      <option value="3">High</option>
    </select>

    <div v-if="store.loading"><Spinner/></div>
    <div v-if="store.error">Error: {{ store.error.message }}</div>

    <div class="table-container">
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
  </div>
</template>

  
<script setup>
import { ref, computed, onMounted } from 'vue';
import { useFunds } from '@/stores/funds';
import Spinner from './Spinner.vue';

const store = useFunds();
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
  return (returns * 100).toFixed(2) + '%';
};
</script>


  <style scoped>
  .app-container {
  background-color: #eef1f4;
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

label {
  font-size: 1.2rem;
  font-family: 'Inter', sans-serif;
 color: #0A2E65;
}

.table-container {
  overflow-x: auto; 
}

#risk-level-filter {
  font-size: 1.2rem;
  margin-left: 10px;
  padding: 0.1rem 1.5rem;
  background-color: white;
  color: #0A2E65;
  border: 1px solid #E6E9EF;
  border-radius: 0.25rem;
}

#risk-level-label {
  color: #0A2E65;
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
  color: #0A2E65;
  font-weight: 600;
}

td {
  background-color: #FFF;
  color: #0A2E65;
}

tr:hover td {
  background-color: #F7FAFF;
}

a {
  color: #0067F5;
  text-decoration: none;
  font-weight: 500;
}

a:hover {
  text-decoration: underline;
}


.table-container {
  overflow-x: auto;
}


@media (max-width: 768px) {
  th, td {
    font-size: 0.9rem;
    padding: 10px;
  }

  table {
    width: 100%;
    min-width: 600px; 
  }
  
  #risk-level-filter {
    font-size: 1.2rem;
    width: 100%;
    padding: 0.75rem 1.5rem;
    background-color: white;
    color: #333;
    border: 1px solid #E6E9EF;
    border-radius: 0.25rem;
  }

  #risk-level-label {
    color: #0A2E65;
  }

  td {
    white-space: nowrap; 
    overflow: hidden;
    text-overflow: ellipsis; 
  }
}

@media (max-width: 480px) {
  th, td {
    font-size: 0.8rem;
    padding: 8px;
  }

  table {
    width: 100%;
    min-width: 500px; 
  }

 
  #risk-level-filter {
    font-size: 1.1rem;
    padding: 0.75rem 1rem;
    width: 100%;
    
  }


  th:nth-child(3), td:nth-child(3), 
  th:nth-child(4), td:nth-child(4) {
    display: none;
  }
}

</style>
  
 



