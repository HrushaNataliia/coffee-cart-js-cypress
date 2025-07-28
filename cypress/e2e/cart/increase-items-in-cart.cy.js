const { MenuPage } = require('../../pages/menu-page')
const { CartPage } = require('../../pages/cart-page')

describe('Increase Items in Cart', () => {
    const menuPage = new MenuPage()
    const cartPage = new CartPage()
    let testData

    before(() => {
        cy.fixture('test-data').then((data) => {
            testData = data.itemsInCart
        })
    })

    beforeEach(() => {
        menuPage.visit()
        cy.eyesSetup()
    })

    afterEach(() => {
        cy.eyesTeardown()
    })

    it('Should increase the number of items in the cart', () => {
        cy.visualCheck('Menu Page Initial State')

        cy.addDrinkToCart(testData.testingDrink)

        menuPage.goToCartPage()

        cy.visualCheck('Cart Page - One Item')

        cy.verifyCartState(testData.before)

        cartPage.clickPlusButton()

        cy.visualCheck('Cart Page - Two Items')

        cy.verifyCartState(testData.after)
    })

    it('Should handle multiple quantity increases', () => {
        cy.addDrinkToCart(testData.testingDrink)
        menuPage.goToCartPage()

        for (let i = 0; i < 3; i++) {
            cartPage.clickPlusButton()
        }

        cartPage.getCartData().should('contain', 'x 4')
        cartPage.getCartAmount().should('have.text', 'cart (4)')
    })
})