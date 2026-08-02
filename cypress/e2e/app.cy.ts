describe('KerasCalendar flow', () => {
  it('allows entering the demo and visiting the dashboard', () => {
    cy.visit('/')
    cy.contains('Entrar a la demo').click()
    cy.contains('Tu espacio de trabajo').should('be.visible')
    cy.contains('Calendario personal').should('be.visible')
  })
})
