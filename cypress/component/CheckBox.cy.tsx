import { CheckBox } from "~/components/CheckBox";

describe("CheckBox.cy.tsx", () => {
  it("load checkbox", () => {
    const LABEL_1 = "确认";
    const LABEL_2 = "取消";

    const LABEL_1_VALUE = "true";
    const LABEL_2_VALUE = "false";

    cy.mount(
      <CheckBox>
        <CheckBox.Item
          label={LABEL_1}
          defaultChecked
          defaultValue={LABEL_1_VALUE}
        />
        <CheckBox.Item label={LABEL_2} defaultValue={LABEL_2_VALUE} />
      </CheckBox>
    );

    cy.findByLabelText(LABEL_1)
      .should("exist")
      .should("contain.value", LABEL_1_VALUE)
      .should("be.checked");

    cy.findByLabelText(LABEL_2)
      .should("exist")
      .should("contain.value", LABEL_2_VALUE)
      .should("not.be.checked");
  });

  it("checkbox change event", () => {
    const EXPECTED_LABEL = ["选项1", "选项2"];
    const EXPECTED_VALUES = ["value1", "value2"];
    function handleChange(values: string[]) {}

    cy.mount(
      <CheckBox onChange={handleChange}>
        <CheckBox.Item
          label={EXPECTED_LABEL[0]}
          defaultValue={EXPECTED_VALUES[0]}
        />
        <CheckBox.Item
          label={EXPECTED_LABEL[1]}
          defaultValue={EXPECTED_VALUES[1]}
        />
      </CheckBox>
    );

    cy.findByLabelText(EXPECTED_LABEL[0]).should("not.be.checked");
    cy.findByLabelText(EXPECTED_LABEL[1]).should("not.be.checked");

    cy.findByTitle(EXPECTED_LABEL[0]).click();

    cy.findByLabelText(EXPECTED_LABEL[0]).should("be.checked");
    cy.findByLabelText(EXPECTED_LABEL[1]).should("not.be.checked");
  });
});
