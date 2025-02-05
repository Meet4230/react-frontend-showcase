describe("Dashboard Component", () => {
  beforeEach(() => {
    // Assuming your app is running on localhost:3000
    cy.visit("http://localhost:5173/dashboard");
  });

  it("displays the project cards with correct information", () => {
    // Check if the project cards are visible
    cy.get(".grid").should("be.visible");

    // Check for the presence of each project card
    cy.get(".grid > div").should("have.length", 3);

    // Verify the content of the first project card
    cy.get('[data-testid="cypress-title"]')
      .first()
      .should("contain", "Todo List");
    cy.get(".text-gray-600")
      .first()
      .should("contain", "A sleek and efficient task management app");

    // Verify the content of the second project card
    cy.get('[data-testid="cypress-title"]')
      .eq(1)
      .should("contain", "E-commerce");
    cy.get(".text-gray-600")
      .eq(1)
      .should("contain", "A full-featured online store");

    // Verify the content of the third project card
    cy.get('[data-testid="cypress-title"]')
      .eq(2)
      .should("contain", "Social Media");
    cy.get(".text-gray-600")
      .eq(2)
      .should("contain", "A responsive social networking platform");
  });

  it("navigates to the correct project page when a card is clicked", () => {
    // Click on the first project card's link
    cy.get("a").first().click();

    // Check if the URL has changed to the Todo List project page
    cy.url().should("include", "/todo-list");
  });
});
