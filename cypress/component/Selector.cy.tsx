import { Selector } from "~/components/Selector";

describe("Selector.cy.tsx", () => {
  it("load Selector", () => {
    const PLACEHOLDER = "未选择任何选项";
    const DATA = [
      {
        key: "先择",
        value: "先择",
      },
    ];
    cy.mount(<Selector dataSource={DATA} placeholder={PLACEHOLDER} />);
    cy.findByText(PLACEHOLDER).should("exist");
    cy.findAllByRole("listitem").should("not.exist");
  });

  it("Selector with default value", () => {
    const PLACEHOLDER = "未选择";
    const DEFAULT_VALUE = {
      key: "1122",
      value: "拜入",
    };
    const DATA = [
      {
        key: "1111",
        value: "先择",
      },
      DEFAULT_VALUE,
    ];
    cy.mount(
      <Selector
        dataSource={DATA}
        placeholder={PLACEHOLDER}
        defaultValue={DEFAULT_VALUE}
      />
    );
  });

  it("show this list of Selector", () => {
    const PLACEHOLDER = "未选择";
    const DATA = [
      {
        key: "1111",
        value: "先择",
      },
      {
        key: "1122",
        value: "拜入",
      },
    ];
    cy.mount(<Selector dataSource={DATA} placeholder={PLACEHOLDER} />);
    cy.findByText(PLACEHOLDER).click();
    cy.findAllByRole("listitem").should("have.length", DATA.length);
  });

  it("click item", () => {
    const PLACEHOLDER = "未选择";
    const DATA = [
      {
        key: "1111",
        value: "先择",
      },
      {
        key: "1122",
        value: "拜入",
      },
    ];
    const onChangeSpy = cy.spy().as("onChangeSpy");

    cy.mount(
      <Selector
        dataSource={DATA}
        placeholder={PLACEHOLDER}
        onChange={onChangeSpy}
      />
    );
    cy.findByText(PLACEHOLDER).click();
    cy.findByText(DATA[0].value).click();

    cy.get("@onChangeSpy").should("have.been.called.with", DATA[0]);
  });
});
