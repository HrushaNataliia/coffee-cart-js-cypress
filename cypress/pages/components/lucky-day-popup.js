class LuckyDayPopup {
    constructor() {
        this.selectors = {
            popup: 'div.promo',
            popupTitle: 'div.promo span',
            yesButton: 'button:contains("Yes, of course!")',
            noButton: 'button:contains("Nah, I\'ll skip")'
        }
    }

    waitForPopupVisible() {
        cy.get(this.selectors.popup).should('be.visible')
    }

    waitForPopupHidden() {
        cy.get(this.selectors.popup).should('not.exist')
    }

    verifyPopupContent() {
        cy.get(this.selectors.popup).should('be.visible')
        cy.get(this.selectors.popupTitle)
            .should('contain', 'It\'s your lucky day! Get an extra cup of Mocha for $4.')
        cy.get(this.selectors.yesButton).should('be.visible')
        cy.get(this.selectors.noButton).should('be.visible')
    }
}

module.exports = { LuckyDayPopup }