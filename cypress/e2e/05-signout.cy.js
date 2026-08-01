describe('Sign Out', () => {
  it('signs in, then signs out and loses access to the admin dashboard', () => {
    cy.signIn();

    cy.contains('Sign Out').click();

    // Should return to the public home page
    cy.url().should('eq', Cypress.config().baseUrl + '/');
    cy.contains('Sign In').should('be.visible');

    // Admin route should now redirect to sign in
    cy.visit('/admin');
    cy.url().should('include', '/signin');
  });
});
