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

if (Cypress.env('APPLITOOLS_API_KEY') || process.env.APPLITOOLS_API_KEY) {
    Cypress.Commands.add('visualCheck', (checkName, options = {}) => {
        cy.eyesCheckWindow({
            tag: checkName,
            target: 'window',
            fully: true,
            ...options
        })
    })

    Cypress.Commands.add('eyesSetup', () => {
        cy.eyesOpen({
            appName: 'Coffee Cart Application',
            testName: Cypress.currentTest.title,
        })
    })

    Cypress.Commands.add('eyesTeardown', () => {
        cy.eyesClose()
    })
} else {
    Cypress.Commands.add('visualCheck', (checkName, options = {}) => {
        cy.log(`Visual check skipped: ${checkName} (Applitools not configured)`)
    })

    Cypress.Commands.add('eyesSetup', () => {
        cy.log('Applitools setup skipped (API key not configured)')
    })

    Cypress.Commands.add('eyesTeardown', () => {
        cy.log('Applitools teardown skipped (API key not configured)')
    })
}