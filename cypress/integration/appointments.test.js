describe('Appointments', () => {
  
  beforeEach(() => {
    cy.request('get', '/api/debug/reset');
    cy.visit('/');
  });

  it('should book an interview', () => {
    cy.contains('Tuesday')
      .click();

    cy.get("[alt=Add]")
      .first()
      .click();

    cy.get("[data-testid=student-name-input]")
      .type("Lydia Miller-Jones");

  });
});