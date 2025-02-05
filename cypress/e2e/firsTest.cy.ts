describe("template spec", () => {
  it("passes", () => {
    cy.visit("http://localhost:5173/");

    cy.get('[data-testid="nav-logo"]').should("exist");
    cy.get('[data-testid="cypress-title"]').should("exist");
  });
});
