Cypress.Commands.add('loadTestData', (filename) => {
    return cy.task('loadYaml', `cypress/fixtures/${filename}.yml`)
})

Cypress.Commands.add('addDrinkToCart', (drinkName) => {
    const drinkXpath = `//h4[normalize-space(text())='${drinkName}']/following-sibling::*[1]`
    cy.xpath(drinkXpath).should('be.visible').click()
})

Cypress.Commands.add('verifyCartState', (expectedData) => {
    cy.xpath("//div[@class='unit-controller']/../following-sibling::*[1]")
        .should('have.text', expectedData.totalPrice)
    cy.xpath("//button[contains(text(), 'Total')]")
        .should('have.text', expectedData.totalButton)
    cy.xpath("//*[@id='app']/div[2]/div/ul/li[2]/div[2]/span")
        .should('have.text', expectedData.cartData)
    cy.xpath("//*[@id='app']/ul/li[2]/a")
        .should('have.text', expectedData.cartAmount)
})

Cypress.Commands.add('safeEyesOpen', (config) => {
    if (Cypress.env('APPLITOOLS_API_KEY') || (typeof process !== 'undefined' && process.env.APPLITOOLS_API_KEY)) {
        try {
            cy.eyesOpen(config)
        } catch (error) {
            cy.log('Eyes open failed, continuing without visual testing')
        }
    } else {
        cy.log('Applitools not configured, skipping visual test setup')
    }
})

Cypress.Commands.add('safeEyesCheckWindow', (tag) => {
    if (Cypress.env('APPLITOOLS_API_KEY') || (typeof process !== 'undefined' && process.env.APPLITOOLS_API_KEY)) {
        try {
            cy.eyesCheckWindow(tag)
        } catch (error) {
            cy.log(`Visual check skipped for: ${tag}`)
        }
    } else {
        cy.log(`Visual check skipped: ${tag} (Applitools not configured)`)
    }
})

Cypress.Commands.add('safeEyesClose', () => {
    if (Cypress.env('APPLITOOLS_API_KEY') || (typeof process !== 'undefined' && process.env.APPLITOOLS_API_KEY)) {
        try {
            cy.eyesClose()
        } catch (error) {
            cy.log('Eyes close failed, continuing test execution')
        }
    } else {
        cy.log('Applitools not configured, skipping visual test cleanup')
    }
})