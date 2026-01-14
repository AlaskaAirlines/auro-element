import { LitElement } from "lit";
import { html } from "lit/static-html.js";
import AuroLibraryRuntimeUtils from "@aurodesignsystem/auro-library/scripts/utils/runtimeUtils.mjs";

import componentTokens from "./styles/tokens.scss"
import componentColor from "./styles/color.scss"
import componentStyle from "./styles/style.scss"

/**
 * AuroElement is a reusable web component written using Lit.
 * @customElement auro-element
 */
export class AuroElement extends LitElement {

  /**
   * Registers the custom element with the browser.
   * @param {string} [name="auro-element"] - Custom element name to register.
   * @example
   * AuroElement.register("custom-element") // registers <custom-element/>
   */
  static register(name = "auro-element") {
    AuroLibraryRuntimeUtils.prototype.registerComponent(name, AuroElement);
  }

  static get styles() {
    return [componentTokens, componentColor, componentStyle];
  }

  render() {
    return html`
      <div>
        <p>Hello AuroElement!</p>
      </div>
    `;
  }
}
