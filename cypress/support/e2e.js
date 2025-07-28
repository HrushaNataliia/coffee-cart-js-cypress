import './commands'

import 'cypress-xpath'

if (Cypress.env('APPLITOOLS_API_KEY') || process.env.APPLITOOLS_API_KEY) {
    import('@applitools/eyes-cypress/commands')
}

Cypress.on('uncaught:exception', (err, runnable) => {
    if (err.message.includes('appliConfFile') || err.message.includes('failCypressAfterAllSpecs')) {
        return false
    }
    return false
})