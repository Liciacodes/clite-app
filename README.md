# Clite App

This is a simple Vue.js application that displays a list of investment funds. The app includes features for viewing fund details, filtering by risk level, and navigating to individual fund details.

Features
1. Display Funds: Shows a list of available investment funds with details like name, returns, asset type, fund manager, and risk level.
2. Filter Funds: Users can filter the funds based on their risk level (Low, Medium, High).
3. Fund Details: Each fund name is clickable, leading to a detailed view of that fund.
4. Responsive Design: The app is mobile-friendly and adjusts based on the device screen size

Table of Contents
Installation
Usage
Project Structure
Features
Contributing
License
Installation
Clone the repository:

bash
Copy code
git clone https://github.com/yourusername/investment-funds-app.git
Navigate to the project directory:

bash
Copy code
cd investment-funds-app
Install dependencies:

bash
Copy code
npm install
Run the development server:

bash
Copy code
npm run dev
Open your browser at http://localhost:3000 to view the app.

Usage
Once you have the application running, the home page will display a list of investment funds. You can filter the list by risk level using the dropdown menu. Clicking on any fund name will navigate you to a detailed view of that fund.

Project Structure
bash
Copy code
├── src
│   ├── assets               # Images, fonts, and other static assets
│   ├── components
│   │   ├── Spinner.vue      # A loading spinner component
│   ├── views
│   │   ├── InvestmentDetails.vue # Detailed view for individual funds
│   │   └── InvestmentList.vue    # Main list view of investment funds
│   ├── stores               # Pinia store for state management
│   ├── App.vue              # Root Vue component
│   └── main.js              # Application entry point
├── public                   # Static public assets
├── package.json             # Project dependencies and scripts
└── README.md                # This README file
Key Components
Spinner.vue: A spinner component to indicate loading state.
InvestmentList.vue: The main component that lists all the funds and includes the filtering functionality.
InvestmentDetails.vue: A detailed view for each individual investment fund.
Styling
The app uses scoped CSS with custom styles for the select dropdown, tables, and general layout. It also includes responsive design tweaks for smaller screens.

Custom CSS for <select> Dropdown:
css
Copy code
select {
  width: 200px;
  padding: 10px;
  font-size: 1rem;
  font-family: 'Inter', sans-serif;
  color: #0A2E65;
  background-color: #fff;
  border: 2px solid #3C5F95;
  border-radius: 8px;
  appearance: none;
  background-image: url('data:image/svg+xml;base64,...');
  background-repeat: no-repeat;
  background-position: right 10px top 50%;
  background-size: 12px;
}
