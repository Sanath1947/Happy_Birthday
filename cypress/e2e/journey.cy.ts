describe('User Journey', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  it('completes full user journey', () => {
    // Authentication
    cy.get('[data-cy="login-button"]').click()
    cy.get('[data-cy="email-input"]').type('test@example.com')
    cy.get('[data-cy="password-input"]').type('password')
    cy.get('[data-cy="submit-button"]').click()

    // Navigate through sections
    cy.get('[data-cy="begin-journey"]').click()
    cy.get('[data-cy="timeline"]').should('be.visible')
    cy.get('[data-cy="gallery"]').scrollIntoView()
    cy.get('[data-cy="memory-card"]').first().click()

    // Interact with features
    cy.get('[data-cy="add-memory"]').click()
    cy.get('[data-cy="memory-form"]').should('be.visible')
    cy.get('[data-cy="memory-title"]').type('New Memory')
    cy.get('[data-cy="memory-description"]').type('Test description')
    cy.get('[data-cy="save-memory"]').click()
  })
}) 