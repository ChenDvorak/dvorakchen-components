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
    const EXPECTED_VALUE = "Input Value 输入";
    cy.mount(<Input value={EXPECTED_VALUE} />);
    cy.get("input").should("contain.value", EXPECTED_VALUE);
  });

  it("type input placeholder", () => {
    const PLACEHOLDER_VALUE = "占位符 placeholder";
    cy.mount(<Input placeholder={PLACEHOLDER_VALUE} />);
    cy.findByPlaceholderText(PLACEHOLDER_VALUE).should("exist");
  });

  it("has name attribute", () => {
    cy.mount(<Input name="inputName" />);
    cy.get("input").should("have.attr", "name");
  });

  it("input with label", () => {
    const LABEL = "账号";
    const ID = "account";
    cy.mount(<Input label={LABEL} id={ID} placeholder="请输入账号" />);
    cy.findByLabelText(LABEL).should("exist").should("have.id", ID);
  });

  it("change input value", async () => {
    const TYPE_STRING = "输入了什么？";
    const onChangeSpy = cy.spy().as("onChangeSpy");
    cy.mount(<Input onChange={onChangeSpy} />);

    cy.get("input").click().type(TYPE_STRING);
    cy.findByText(TYPE_STRING).should("exist");
    cy.get("@onChangeSpy").should("have.been.called.with", TYPE_STRING);
  });
});
