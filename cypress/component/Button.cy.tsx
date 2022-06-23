import { Button } from "~/components/Button";

describe("Button.cy.ts", () => {
  it("load button with default role", () => {
    // Arrange
    const TEXT = "按钮";
    cy.mount(<Button>{TEXT}</Button>);
    cy.findByRole("button").should("exist").should("contain.text", TEXT);
  });
});
