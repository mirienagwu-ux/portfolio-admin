describe('Sign Up', () => {
  it('allows a new user to sign up', () => {
    const uniqueEmail = `cypress_user_${Date.now()}@example.com`;

    cy.visit('/signup');
    cy.get('#firstname').type('Cypress');
    cy.get('#lastname').type('Tester');
    cy.get('#email').type(uniqueEmail);
    cy.get('#password').type('password123');
    cy.contains('button', 'Sign Up').click();

    // Should redirect to sign in after successful sign up
    cy.url().should('include', '/signin');
    cy.contains('Account created').should('be.visible');

    // Save the email for the sign in test
    cy.writeFile('cypress/fixtures/testUser.json', {
      email: uniqueEmail,
      password: 'password123',
    });
  });
});
