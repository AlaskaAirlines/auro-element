import { useAccessibleIt } from "@aurodesignsystem/auro-library/scripts/test-plugin/iterateWithA11Check.mjs";
import { expect, fixture, html } from "@open-wc/testing";
import { AuroElement } from "../src/index";

AuroElement.register();

useAccessibleIt();

describe("auro-element", () => {
  it("does the element initialize", async () => {
    const el = await fixture(html`
      <auro-element>test</auro-element>
    `);
    expect(el).to.be.instanceOf(AuroElement);
  });

});
