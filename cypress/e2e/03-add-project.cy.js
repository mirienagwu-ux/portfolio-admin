describe('Add Project', () => {
  it('signs in and adds a new project', () => {
    cy.signIn();

    cy.visit('/admin/projects');
    cy.contains('+ Add Project').click();

    const projectTitle = `Cypress Project ${Date.now()}`;
    cy.get('#title').type(projectTitle);
    cy.get('#description').type('Created by a Cypress E2E test.');
    cy.contains('button', 'Create').click();

    // Back on the list page, the new project should appear
    cy.url().should('include', '/admin/projects');
    cy.contains(projectTitle).should('be.visible');
  });
});
