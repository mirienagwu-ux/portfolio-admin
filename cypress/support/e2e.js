import './commands';

before(() => {
  cy.request({
    url: 'https://portfolio-backend-1-dr5t.onrender.com/',
    timeout: 60000,
    failOnStatusCode: false,
  });
});
