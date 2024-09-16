/**
 * The web component class used to build a web component.
 */
export class WebComponent {
  /**
   * The component name, used to initialize the component in the DOM.
   *
   * @type {string}
   */
  #componentName

  /**
   * The html template.
   *
   * @type {HTMLTemplateElement}
   */
  #htmlTemplate

  /**
   * The css template.
   *
   * @type {HTMLTemplateElement}
   */
  #cssTemplate

  /**
   * Constructs an instance of a Web Component.
   *
   * @param {string} componentName - The component name, needs to follow the html element name syntax.
   * @param {HTMLTemplateElement} htmlTemplate - The html to render.
   * @param {HTMLTemplateElement} cssTemplate - The css to render.
   */
  constructor (componentName, htmlTemplate, cssTemplate) {
    this.#componentName = componentName
    this.#htmlTemplate = htmlTemplate
    this.#cssTemplate = cssTemplate
  }

  /**
   * Defines the web component which
   * allows the component to be utilized withing the DOM.
   * This should be called after the component as a whole has been set up.
   */
  defineComponent () {
    // Use closure to allow our HTMLElement class to access these fields.
    // This is a necessity due to how HTMLElements are handled and created.
    const htmlTemplate = this.#htmlTemplate
    const cssTemplate = this.#cssTemplate

    customElements.define(this.#componentName,
      /**
       * The custom element constructor
       * Bind *this* to access user defined properties.
       */
      class extends HTMLElement {
        /**
         * The abort controller object, used to properly remove any event listeners
         * when the element leaves the DOM.
         *
         * @type {AbortController}
         */
        #abortController

        /**
         * Constructs a new instance of the user-defined HTMLElement.
         */
        constructor () {
          super()

          // Attach a shadow DOM tree to this custom element and
          // append the templates to the shadow root.
          this.attachShadow({ mode: 'open' })
          this.shadowRoot.appendChild(cssTemplate.content.cloneNode(true))
          this.shadowRoot.appendChild(htmlTemplate.content.cloneNode(true))

          // Create a new AbortController to remove EventListeners when element is removed from the DOM.
          this.#abortController = new AbortController()
        }
      }
    )
  }
}
