describe('Appointments', () => {
  
  beforeEach(() => {
    cy.request('get', '/api/debug/reset');
    cy.visit('/');
    cy.contains('Tuesday')
      .click();
  });

  it('should book an interview', () => {

    cy.get('[data-testid=appointment-add-button]')
      .first()
      .click();

    cy.get('[data-testid=student-name-input]')
      .type('Lydia Miller-Jones');

    cy.get('[data-testid=interviewers-list] li')
      .first()
      .click();

    cy.get('.button--confirm')
      .click();

    cy.contains(".appointment__card--show", "Lydia Miller-Jones");

    cy.contains(".appointment__card--show", "Sylvia Palmer");

  });

});