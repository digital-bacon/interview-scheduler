describe("Appointments", () => {
	beforeEach(() => {
		cy.request("get", "/api/debug/reset");
		cy.visit("/");
		cy.contains("Monday").click();
	});

	it("should book an interview", () => {
		cy.get("[data-testid=appointment-add-button]").first().click();

		cy.get("[data-testid=student-name-input]").type("Lydia Miller-Jones");

		cy.get('[alt="Sylvia Palmer"]').click();

		cy.get(".button--confirm").click();

		cy.contains(".appointment__card--show", "Lydia Miller-Jones");

		cy.contains(".appointment__card--show", "Sylvia Palmer");
	});

	it("should edit an interview", () => {
		cy.get("[data-testid=show-button-edit]").click({ force: true });

		cy.get("[data-testid=student-name-input]")
			.clear()
			.type("Lydia Miller-Jones");

		cy.get('[alt="Tori Malcolm"]').click();

		cy.get(".button--confirm").click();

		cy.contains(".appointment__card--show", "Lydia Miller-Jones");

		cy.contains(".appointment__card--show", "Tori Malcolm");
	});

	it("should cancel an interview", () => {
		cy.get("[data-testid=show-button-trash]").click({ force: true });

		cy.get("button.button--danger").contains("Confirm").click();

		cy.get(".appointment__card--status").contains("Deleting").should("exist");

		cy.get(".appointment__card--status")
			.contains("Deleting")
			.should("not.exist");

		cy.contains(".appointment__card--show", "Archie Cohen").should("not.exist");
	});
});
