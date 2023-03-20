describe('App', () => {
  it('should render the catalog', () => {
    cy.visit('/');
    cy.contains('Jinhong's Demo Catalog');
  });
});
