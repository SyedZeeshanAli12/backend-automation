const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
      
    },
    specPattern: 'cypress/integration/**/*.js',
    
      "reporter": "mochawesome",
      "reporterOptions": {
        "reportDir": "cypress/reports/mochawesome-report",
        "overwrite": false,
        "html": false,
        "json": true
      },
      "video": false,
      "plugins": {
        "mochawesome-merge": {}
      }
    }
    
    });
