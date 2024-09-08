# Clite App

This is a simple Vue.js application that displays a list of investment funds. The app includes features for viewing fund details, filtering by risk level, and navigating to individual fund details.

## Features
1. Display Funds: Shows a list of available investment funds with details like name, returns, asset type, fund manager, and risk level.
2. Filter Funds: Users can filter the funds based on their risk level (Low, Medium, High).
3. Fund Details: Each fund name is clickable, leading to a detailed view of that fund.
4. Responsive Design: The app is mobile-friendly and adjusts based on the device screen size

## Table of Contents
- Installation
- Usage
- Project Structure
- Features
- Installation
- Clone the repository

```html
git clone https://github.com/yourusername/investment-funds-app.git
```

## Navigate to the project directory:
```html
cd investment-funds-app
```

## Install dependencies:
```html
npm install
```


## Run the development server:
```html
npm run dev
```


Open your browser at http://localhost:3000 to view the app.

## Usage
Once you have the application running, the home page will display a list of investment funds. You can filter the list by risk level using the dropdown menu. Clicking on any fund name will navigate you to a detailed view of that fund.

Project Structure
```
Project Root
│
├── public
│   ├── index.html
│   └── favicon.ico
│
├── src
│   ├── assets
│   │   └── logo.png
│   ├── components
│   │   ├── Spinner.vue
│   │   └── InvestmentDetails.vue
│   ├── stores
│   │   └── funds.js
│   ├── App.vue
│   ├── main.js
│   └── router.js
│
├── .gitignore
├── package.json
├── README.md
└── vite.config.js
```

## Key Components
Spinner.vue: A spinner component to indicate loading state.
InvestmentList.vue: The main component that lists all the funds and includes the filtering functionality.
InvestmentDetails.vue: A detailed view for each individual investment fund.


## Styling
The app uses scoped CSS with custom styles for the select dropdown, tables, and general layout. It also includes responsive design tweaks for smaller screens.


