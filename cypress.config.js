const { defineConfig } = require('cypress')

module.exports = defineConfig({
    e2e: {
        baseUrl: 'https://coffee-cart.app',
        viewportWidth: 1200,
        viewportHeight: 800,
        defaultCommandTimeout: 10000,
        requestTimeout: 5000,
        responseTimeout: 10000,

        setupNodeEvents(on, config) {
            // Налаштування Applitools ТІЛЬКИ якщо API key існує
            if (process.env.APPLITOOLS_API_KEY) {
                try {
                    require('@applitools/eyes-cypress')(module)
                } catch (error) {
                    console.log('Applitools not configured properly, skipping visual tests')
                }
            }

            require('cypress-mochawesome-reporter/plugin')(on)

            return config
        },

        specPattern: 'cypress/e2e/**/*.cy.js',
        supportFile: 'cypress/support/e2e.js',
    },

    reporter: 'cypress-mochawesome-reporter',
    reporterOptions: {
        charts: true,
        reportPageTitle: 'Coffee Cart Test Report',
        embeddedScreenshots: true,
        inlineAssets: true,
    },
})