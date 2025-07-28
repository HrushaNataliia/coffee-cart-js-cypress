const { LuckyDayPopup } = require('./components/lucky-day-popup')

class MenuPage {
    constructor() {
        this.luckyDayPopup = new LuckyDayPopup()

        this.selectors = {
            totalButton: '//*[@class="pay"]',
            paymentModal: '//*[@class="modal"]/div',
            cartIcon: "//a[@aria-label='Cart page']",
            successfulPopup: "//div[contains(@class,'snackbar success')]"
        }
    }

    getDrinkButtonXpath(drinkName) {
        return `//h4[normalize-space(text())='${drinkName}']/following-sibling::*[1]`
    }

    visit() {
        cy.visit('/')
    }

    clickOnDrink(drinkName) {
        cy.xpath(this.getDrinkButtonXpath(drinkName))
            .should('be.visible')
            .click()
    }

    goToCartPage() {
        cy.xpath(this.selectors.cartIcon).click()
    }

    getCartCount() {
        return cy.xpath(this.selectors.cartIcon)
            .invoke('text')
            .then((text) => {
                const match = text.match(/\((\d+)\)/)
                return match ? parseInt(match[1]) : 0
            })
    }
}

module.exports = { MenuPage }