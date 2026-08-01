Cypress.Commands.add('signIn', () => {
  cy.fixture('testUser.json').then((user) => {
    cy.visit('/signin');
    cy.get('#email').type(user.email);
    cy.get('#password').type(user.password);
    cy.contains('button', 'Sign In').click();
    cy.url().should('include', '/admin');
  });
});
