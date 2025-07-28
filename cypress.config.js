const { defineConfig } = require('cypress')
const yaml = require('js-yaml')
const fs = require('fs')

const loadYamlConfig = (filePath) => {
    try {
        const fileContents = fs.readFileSync(filePath, 'utf8')
        return yaml.load(fileContents)
    } catch (e) {
        console.log('YAML config not found:', filePath)
        return {}
    }
}

module.exports = defineConfig({
    e2e: {
        baseUrl: 'https://coffee-cart.app',
        viewportWidth: 1280,
        viewportHeight: 720,
        defaultCommandTimeout: 10000,
        requestTimeout: 5000,
        responseTimeout: 10000,

        setupNodeEvents(on, config) {
            if (process.env.APPLITOOLS_API_KEY) {
                require('@applitools/eyes-cypress')(module)
            }

            require('cypress-mochawesome-reporter/plugin')(on)

            on('task', {
                loadYaml(filePath) {
                    return loadYamlConfig(filePath)
                }
            })

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
        saveAllAttempts: false,
    },
})