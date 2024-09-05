<template>
  <div>
    <h1 v-if="fund">Investment Details: {{ fund.name }}</h1>
    <div v-if="loading">Loading fund details...</div>
    <div v-if="error">{{ error }}</div>
    <div v-if="!loading && fund">
      <img :src="fund.logo" alt="Fund Logo" />
      <p><strong>Fund Code:</strong> {{ fund.fund_code }}</p>
      <p><strong>Returns:</strong> {{ (fund.returns * 100).toFixed(2) }}%</p>
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
      <table>
        <thead>
          <tr>
            <th>Year</th>
            <th>Annual Return</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="performance in fund.performance" :key="performance.year">
            <td>{{ performance.year }}</td>
            <td>{{ (performance.annual_return * 100).toFixed(2) }}%</td>
          </tr>
        </tbody>
      </table>

      <h2>Prospectus</h2>
      <p v-if="fund.prospectus">
        <a :href="fund.prospectus" target="_blank">View Prospectus</a>
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { useMyStore } from '@/stores/myStore'; // Ensure correct path to your store

const route = useRoute();
const store = useMyStore();
const fund = ref(null);
const loading = ref(true);
const error = ref(null);

onMounted(async () => {
  try {
    await store.fetchData(); // Ensure data is fetched before accessing
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
</script>

<style scoped>
/* Add your styles here */
h1 {
  font-size: 2em;
}
img {
  max-width: 200px;
  margin-bottom: 20px;
}
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
