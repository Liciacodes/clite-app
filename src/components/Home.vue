<template>
  <div class="app-container">
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
  return (returns * 100).toFixed(2) + '%';
};
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

label {
  font-size: 1rem;
  font-family: 'Inter', sans-serif;
}

.table-container {
  overflow-x: auto; /* Allows horizontal scrolling */
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

a {
  color: #0067F5;
  text-decoration: none;
  font-weight: 500;
}

a:hover {
  text-decoration: underline;
}

/* Scrollable table container for small screens */
.table-container {
  overflow-x: auto;
}

/* Responsive styles */
@media (max-width: 768px) {
  th, td {
    font-size: 0.9rem;
    padding: 10px;
  }

  table {
    width: 100%;
    min-width: 600px; /* Ensure a reasonable minimum width */
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

  td {
    white-space: nowrap; /* Prevent text from squeezing */
    overflow: hidden;
    text-overflow: ellipsis; /* Display ellipsis (...) when text is too long */
  }
}

@media (max-width: 480px) {
  th, td {
    font-size: 0.8rem;
    padding: 8px;
  }

  table {
    width: 100%;
    min-width: 500px; /* Ensure a reasonable minimum width */
  }

  #risk-level-filter {
    font-size: 1.1rem;
    padding: 0.75rem 1rem;
    width: 100%;
  }

  /* Hide unnecessary columns for mobile */
  th:nth-child(3), td:nth-child(3), 
  th:nth-child(4), td:nth-child(4) {
    display: none; /* Hide columns Asset Type and Fund Manager */
  }
}

</style>
  
 



