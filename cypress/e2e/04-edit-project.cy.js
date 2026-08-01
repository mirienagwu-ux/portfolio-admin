describe('Edit Project', () => {
  it('signs in and edits the first project in the list', () => {
    cy.signIn();

    cy.visit('/admin/projects');

    // Edit the first row in the table
    cy.get('.admin-table tbody tr').first().within(() => {
      cy.contains('Edit').click();
    });

    const updatedTitle = `Edited Project ${Date.now()}`;
    cy.get('#title').clear().type(updatedTitle);
    cy.contains('button', 'Save Changes').click();

    cy.url().should('include', '/admin/projects');
    cy.contains(updatedTitle).should('be.visible');
  });
});
