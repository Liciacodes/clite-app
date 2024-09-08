<template>
  <div>
    <h1 v-if="fund">{{ fund.name }}</h1>

    <router-link to="/" class="back-button">Back to Home</router-link>
    <div v-if="loading"><Spinner/></div>
    <div v-if="error">{{ error }}</div>
    
    <div v-if="!loading && fund" class="details-container">
      <img :src="fund.logo" alt="Fund Logo" />
      <p><strong>Fund Code:</strong> {{ fund.fund_code }}</p>
      <p><strong>Returns:</strong> {{ computedReturns }}%</p>
      <p><strong>Fund Manager:</strong> {{ fund.fund_manager }}</p>
      <p><strong>Custodian:</strong> {{ fund.custodian }}</p>
      <p><strong>Risk Level:</strong> {{ fund.risk }}</p>
      <p><strong>Description:</strong> {{ fund.description }}</p>

      <h2>Composition</h2>
      <ul>
        <li v-for="(percentage, assetType) in fund.composition" :key="assetType">
          {{ assetType }}: {{ percentage }}%
        </li>
      </ul>

      <h2>Performance</h2>
      <div v-if="hasPerformanceData">
        <table>
          <thead>
            <tr>
              <th>Year</th>
              <th>Annual Return</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="performance in performanceData" :key="performance.year">
              <td>{{ performance.year }}</td>
              <td>{{ performance.annual_return }}%</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div v-else>
        <p>No performance data available.</p>
      </div>

      <h2>Prospectus</h2>
      <div v-if="fund.prospectus">
        <p>
          <a :href="fund.prospectus" target="_blank">View Prospectus</a>
        </p>
      </div>
      <div v-else>
        <p>No prospectus available.</p>
      </div>
    </div>
  </div>
</template>



<script setup>
import { ref, onMounted, computed } from 'vue';
import { useRoute } from 'vue-router';
import { useFunds} from '@/stores/funds'; 
import Spinner from './Spinner.vue';

const route = useRoute();
const store = useFunds();
const fund = ref(null);
const loading = ref(true);
const error = ref(null);

onMounted(async () => {
  try {
    await store.fetchData(); 
    const fundId = route.params.id;
    fund.value = store.funds.find(f => f.id === fundId);
    if (!fund.value) {
      error.value = 'Fund not found.';
    }
  } catch (err) {
    error.value = 'Failed to load fund data.';
  } finally {
    loading.value = false;
  }
});

const computedReturns = computed(() => {
  if (fund.value && fund.value.returns != null) {
    return (fund.value.returns * 100).toFixed(2)
  }
  return "N/A"
})

const performanceData = computed(() => {
  if (fund.value && fund.value.performance) {
    return fund.value.performance.map(p => ({
      ...p,
      annual_return: (p.annual_return * 100).toFixed(2)
    }));
  }
  return [];
});

const hasPerformanceData = computed(() => {
  return performanceData.value.length > 0;
});
</script>



<style scoped>

h1 {
  font-size: 2rem;
  font-weight: 700;
   color: #0A2E65;
  margin-bottom: 1.5rem;
  font-family: 'Poppins', sans-serif;
  
}

.back-button {
  display: inline-block;
  padding: 10px 20px;
  margin-bottom: 20px; 
  background-color: #0067F5; 
  color: white; 
  text-decoration: none; 
  border-radius: 20px; 
  font-size: 1rem; 
}

h2 {
  font-size: 1.5rem;
  font-weight: 600;
  color: #0A2E65;
  margin-top: 2rem;
  font-family: 'Inter', sans-serif;
}

.details-container {
  background-color: white
}

p {
  font-size: 1rem;
  color: #0A2E65;
  margin-bottom: 1rem;
  font-family: 'Inter', sans-serif;
}

strong {
  color: #0A2E65;
}


img {
  max-width: 150px;
  margin-bottom: 20px;
  display: block;
  border-radius: 0.5rem;
  /* box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1); */
}


table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 1.5rem;
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


li {
  font-size: 1rem;
  color: #0A2E65;
  font-family: 'Inter', sans-serif;
  margin-bottom: 0.5rem;
}


div[ v-if="loading" ] {
  text-align: center;
  font-size: 1.2rem;
  color: #0A2E65;
}

div[ v-if="error" ] {
  text-align: center;
  font-size: 1.2rem;
  color: #ff4d4d;
}


div {
  padding: 2rem;
  background-color: #F9FBFD; 
  border-radius: 0.75rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}
</style>

