describe('home page', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  it('shows the get started heading', () => {
    cy.contains('h1', /get started/i).should('be.visible')
  })

  it('increments the counter on click', () => {
    cy.contains('button', /count is 0/i).click().click()
    cy.contains('button', /count is 2/i).should('be.visible')
  })
})
