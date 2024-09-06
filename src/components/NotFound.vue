<template>
  <div class="not-found">
    <h1>404</h1>
    <p>Page Not Found</p>
    <router-link to="/">Go Home</router-link>
  </div>
</template>

<script>
export default {
  name: 'NotFound'
}
</script>

<style scoped>
.not-found {
  text-align: center;
  margin-top: 100px;
  font-family: 'Poppins', sans-serif;
  color: #333;
}

h1 {
  font-size: 6rem;
  font-weight: 700;
  color: #0067F5; 
  margin-bottom: 20px;
}

p {
  font-size: 1.5rem;
  color: #555;
  margin-bottom: 30px;
}

a {
  font-size: 1.25rem;
  color: #0067F5;
  text-decoration: none;
  padding: 10px 20px;
  border: 2px solid #0067F5;
  border-radius: 5px;
  font-weight: 500;
  transition: background-color 0.3s ease, color 0.3s ease;
}

a:hover {
  background-color: #0067F5;
  color: #fff;
}
</style>
