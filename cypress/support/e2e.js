import './commands'
import 'cypress-xpath'

if (Cypress.env('APPLITOOLS_API_KEY') || typeof process !== 'undefined' && process.env.APPLITOOLS_API_KEY) {
    require('@applitools/eyes-cypress/commands')
} else {
    console.log('Applitools API key not found, skipping visual commands')
}

Cypress.on('uncaught:exception', (err, runnable) => {
    if (err.message.includes('appliConfFile') ||
        err.message.includes('failCypressAfterAllSpecs') ||
        err.message.includes('Cannot read properties of undefined')) {
        return false
    }
    return false
})