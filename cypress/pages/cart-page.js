class CartPage {
    constructor() {
        this.selectors = {
            totalPrice: "//div[@class='unit-controller']/../following-sibling::*[1]",
            totalButton: "//button[contains(text(), 'Total')]",
            cartData: "//*[@id='app']/div[2]/div/ul/li[2]/div[2]/span",
            cartAmount: "//*[@id='app']/ul/li[2]/a",
            plusButton: "//*[@id='app']/div[2]/div/ul/li[2]/div[2]/div/button[1]",
            minusButton: "//*[@id=\"app\"]/div[2]/div/ul/li[2]/div[2]/div/button[2]",
            emptyText: "//*[contains(text(),\"No coffee, go add some.\")]"
        }
    }

    getTotalPrice() {
        return cy.xpath(this.selectors.totalPrice)
    }

    getTotalButton() {
        return cy.xpath(this.selectors.totalButton)
    }

    getCartData() {
        return cy.xpath(this.selectors.cartData)
    }

    getCartAmount() {
        return cy.xpath(this.selectors.cartAmount)
    }

    clickPlusButton() {
        cy.xpath(this.selectors.plusButton).click()
    }

    clickMinusButton() {
        cy.xpath(this.selectors.minusButton).click()
    }

    getEmptyText() {
        return cy.xpath(this.selectors.emptyText)
    }
}

module.exports = { CartPage }