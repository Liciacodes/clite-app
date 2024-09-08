<template>
    <div class="header">
      <img 
        src="https://cdn-assets-cloud.frontify.com/s3/frontify-cloud-files-us/eyJwYXRoIjoiZnJvbnRpZnlcL2FjY291bnRzXC9mNlwvMTk0NzAzXC9wcm9qZWN0c1wvMjUzNDcxXC9hc3NldHNcLzUzXC80NDU2NDg1XC8xZTEwMTFkMGI1YmQxNDIxNzkzMjdiZDVkMDZmOTJiNi0xNTkzNDI4NjI1LnN2ZyJ9:frontify:CSHjZurKuJYmiAHPSK2PEnL5k25WpiQzq-OE4HwVUds?width={width}&rect=0,0,2726,503&reference_width=2726" 
        alt="Cowrywise Logo" 
        class="logo"
      >
    </div>
  </template>
  
  <script setup>
  // No script needed
  </script>
  
  <style scoped>
  .header {
    background-color: #0067F5;
    height: 80px;
    display: flex;
    justify-content: flex-start; 
    position: sticky; 
    top: 0; 
    z-index: 1000; 
  }
  
  .logo {
    width: 15%; 
    margin-left: 40px; 
  }
  @media (max-width: 768px) {
  .logo {
    width: 20%; 
  }
}

@media (max-width: 480px) {
  .logo {
    width: 25%; 
  }
}

  
  </style>