import { LitElement } from "lit";
import shapeSizeCss from "./styles/shapeSize.scss";

/**
 * Base class for Auro elements.
 * @customElement auro-element
 */
export class AuroElement extends LitElement {
  constructor() {
    super();
    this._propertyDefaults();
  }

  _propertyDefaults() {
    this.layout = 'classic';
    this.shape = 'classic';
    this.size = 'lg';
    this.onDark = false;
  }

  static get properties() {
    return {

      /**
       * Defines the language of the element.
       * @default 'classic'
       */
      layout: {
        type: String,
        attribute: "layout",
        reflect: true
      },

      /**
       * Defines the shape of the element.
       * @default 'classic'
       */
      shape: {
        type: String,
        attribute: "shape",
        reflect: true
      },

      /**
       * Defines the size of the element.
       * @default 'lg'
       */
      size: {
        type: String,
        attribute: "size",
        reflect: true
      },

      /**
       * Indicates if the element is on a dark background.
       * @default false
       */
      onDark: {
        type: Boolean,
        attribute: "ondark",
        reflect: true
      }
    };
  }

  static get styles() {
    return [shapeSizeCss];
  }

  /**
   * Returns true if the element has focus.
   * @private
   * @returns {boolean} - Returns true if the element has focus.
   */
  get componentHasFocus() {
    return this.matches(':focus') || this.matches(':focus-within');
  }

  resetShapeClasses() {
    const wrapper = this.shadowRoot.querySelector('.wrapper');

    if (wrapper) {
      wrapper.classList.forEach((className) => {
        if (className.startsWith('shape-')) {
          wrapper.classList.remove(className);
        }
      });

      if (this.shape && this.size) {
        wrapper.classList.add(`shape-${this.shape.toLowerCase()}-${this.size.toLowerCase()}`);
      } else {
        wrapper.classList.add('shape-none');
      }
    }

  }

  resetLayoutClasses() {
    if (this.layout) {
      const wrapper = this.shadowRoot.querySelector('.wrapper');

      if (wrapper) {
        wrapper.classList.forEach((className) => {
          if (className.startsWith('layout-')) {
            wrapper.classList.remove(className);
          }
        });

        wrapper.classList.add(`layout-${this.layout.toLowerCase()}`);
      }
    }
  }

  updateComponentArchitecture() {
    this.resetLayoutClasses();
    this.resetShapeClasses();
  }

  updated(changedProperties) {
    if (changedProperties.has('layout') || changedProperties.has('shape') || changedProperties.has('size')) {
      this.updateComponentArchitecture();
    }
  }

  renderLayout() {
    // no-op/default implementations - consuming elements should override this method
  }

  // Try to render the defined `this.layout` layout. If that fails, fall back to the default layout.
  // This will catch if an invalid layout value is passed in and render the default layout if so.
  render() {
    try {
      return this.renderLayout();
    } catch (error) {
      // failed to get the defined layout
      console.error('Failed to get the defined layout - using the default layout', error); // eslint-disable-line no-console

      // fallback to the default layout
      return this.getLayout('default');
    }
  }
}
