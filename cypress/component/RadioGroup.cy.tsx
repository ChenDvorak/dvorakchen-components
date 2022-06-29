import { RadioGroup } from "~/components";

describe("RadioGroup.cy.tsx", () => {
  it("load RadioGroup", () => {
    const DATA = [
      { key: "1", value: "确认" },
      { key: "2", value: "取消" },
    ];

    const onChangeSpy = cy.spy().as("onChangeSpy");
    cy.mount(<RadioGroup dataSource={DATA} onChange={onChangeSpy} />);
    cy.findByRole("radiogroup").should("exist");
    cy.findAllByRole("radio").should("have.length", DATA.length);
    cy.findByTitle(DATA[0].value).click();

    cy.get("@onChangeSpy").should("have.been.called.with", DATA[0]);
  });

  it("change Radio", () => {
    const DATA = [
      { key: "1", value: "确认" },
      { key: "2", value: "取消" },
    ];

    const onChangeSpy = cy.spy().as("onChangeSpy");
    cy.mount(<RadioGroup dataSource={DATA} onChange={onChangeSpy} />);
    cy.findByRole("radiogroup").should("exist");
    cy.findAllByRole("radio").should("have.length", DATA.length);
    cy.findByTitle(DATA[0].value).click();
    cy.get("@onChangeSpy").should("have.been.called.with", DATA[0]);

    cy.findByTitle(DATA[1].value).click();
    cy.get("@onChangeSpy").should("have.been.called.with", DATA[1]);
  });
});
