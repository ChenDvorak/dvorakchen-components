import { Input } from "~/components/Input";

describe("Input.cy.tsx", () => {
  it("load Input", () => {
    // Arrange
    cy.mount(<Input />);
    cy.get("input").should("exist");
  });

  it("input default value", () => {
    const DEFAULT_VALUE = "default Value";
    cy.mount(<Input defaultValue={DEFAULT_VALUE} />);
    cy.get("input").should("contain.value", DEFAULT_VALUE);
  });

  it("type input", () => {
    const EXPECTED_VALUE = "Input Value";
    cy.mount(<Input value={EXPECTED_VALUE} />);
    cy.get("input").should("contain.value", EXPECTED_VALUE);
  });
});
