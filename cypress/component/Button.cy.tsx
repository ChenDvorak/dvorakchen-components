import { Button } from "~/components/Button";

describe("Button.cy.tsx", () => {
  it("load button with default role", () => {
    // Arrange
    const TEXT = "按钮";
    cy.mount(<Button primary>{TEXT}</Button>);
    cy.findByRole("button").should("exist").should("contain.text", TEXT);
  });

  it("load all kind of buttons", () => {
    const PRIMARY_TEXT = "主要按钮";
    const SECONDARY_TEXT = "次要按钮";
    const GENERAL_TEXT = "普通按钮";
    cy.mount(
      <>
        <Button primary>{PRIMARY_TEXT}</Button>
        <Button secondary>{SECONDARY_TEXT}</Button>
        <Button>{GENERAL_TEXT}</Button>
      </>
    );
  });
});
