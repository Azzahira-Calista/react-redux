/* eslint-disable no-undef */
describe('Login Flow', () => {
  it('should login and redirect', () => {
    cy.visit('/login');

    cy.get('input[placeholder="Email"]').type('admin@gmail.com');
    cy.get('input[placeholder="Password"]').type('admin123');
    cy.contains('Login').click();

    cy.url().should('include', '/threads');
    cy.contains('Welcome').should('exist');
  });
});
