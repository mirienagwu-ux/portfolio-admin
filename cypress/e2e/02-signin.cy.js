describe('Sign In', () => {
  it('allows the user created in the sign up test to sign in', () => {
    cy.fixture('testUser.json').then((user) => {
      cy.visit('/signin');
      cy.get('#email').type(user.email);
      cy.get('#password').type(user.password);
      cy.contains('button', 'Sign In').click();

      // Should redirect to the admin dashboard on success
      cy.url().should('include', '/admin');
      cy.contains('Admin Dashboard').should('be.visible');
    });
  });
});
