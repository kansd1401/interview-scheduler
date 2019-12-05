describe("Appointments", () => {
  beforeEach(() => {
    cy.request("GET", "/api/debug/reset");
  
    cy.visit("/");
  
    cy.contains("Monday");
   });

  it("should book an interview", () => {
    cy.visit("/");

    cy.contains("Monday")

    cy.get("[alt=Add]")
      .first()
      .click();

    cy.get("[data-testid=student-name-input]").type("Lydia Miller-Jones");

    cy.get("[alt='Sylvia Palmer']").click();

    cy.contains("Save")
      .click()

    cy.contains(".appointment__card--show", "Lydia Miller-Jones");
    cy.contains(".appointment__card--show", "Sylvia Palmer");

    cy.request("GET", "/api/debug/reset")
  });

  it("should edit an interview", () => {
    cy.visit("/");

    cy.contains("Monday")

    cy.get("[alt=Edit]")
      .first()
      .click({force:true});

    cy.get("[data-testid=student-name-input]").clear().type("Lydia Miller-Jones");

    cy.contains("Save")
      .click()

   
    cy.contains(".appointment__card--show", "Archie Cohen")
    .should("not.exist");
    cy.contains(".appointment__card--show", "Sylvia Palmer");

    cy.request("GET", "/api/debug/reset")
  })

  it("should cancel an interview", () => {
    cy.visit("/");

    cy.contains("Monday")

    cy.get("[alt=Delete]")
      .first()
      .click({force:true});

    cy.contains("Confirm")
      .click()

    cy.get("[alt=Add]").should("exist");

    cy.request("GET", "/api/debug/reset")
  })
});