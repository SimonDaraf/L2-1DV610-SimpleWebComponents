import { EventContainer } from './eventContainer.js'

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
   * An array of registered events.
   *
   * @type {EventContainer[]}
   */
  #registeredEvents

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
    this.#registeredEvents = []
  }

  /**
   * Registers an event to the web component.
   *
   * @param {EventContainer} eventContainer - The event container to register.
   */
  registerEvent (eventContainer) {
    this.#registeredEvents.push(eventContainer)
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
    const registeredEvents = this.#registeredEvents

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

        /**
         * Called after the element is inserted into the DOM.
         */
        connectedCallback () {
          // For each registered event.
          for (const event of registeredEvents) {
            // Get element to attach listener to.
            const targetElement = this.shadowRoot.querySelector(event.getEventListenerElementID)

            // Add event listener and set abort controller signal to ensure the listener is properly removed later.
            targetElement.addEventListener(event.getEventName(), event.getEventFunction(), { signal: this.#abortController.signal })
          }
        }

        /**
         * Called after the element is removed from the DOM.
         */
        disconnectedCallback () {
          this.#abortController.abort()
        }
      }
    )
  }
}
