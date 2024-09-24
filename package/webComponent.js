import { EventContainer } from './eventContainer.js'
import { FetchHandler } from './fetchHandler.js'
import * as htmlHelper from './htmlHelper.js'

/**
 * The Web Component class builds and defines a web component.
 */
export class WebComponent {
  /**
   * The component name, used to initialize the component in the DOM.
   *
   * @type {string}
   */
  #componentName

  /**
   * The html template|url.
   *
   * @type {HTMLTemplateElement|string}
   */
  #html

  /**
   * The css template|url.
   *
   * @type {HTMLTemplateElement|string}
   */
  #css

  /**
   * An array of registered events.
   *
   * @type {EventContainer[]}
   */
  #registeredEvents

  /**
   * A helper class for fetch requests.
   *
   * @type {FetchHandler}
   */
  #fetchHandler

  /**
   * Constructs an instance of a Web Component.
   *
   * @param {string} componentName - The component name, needs to follow the html element name syntax.
   * @param {HTMLTemplateElement|string} html - The html to render | The url to the HTML file.
   * @param {HTMLTemplateElement|string} css - The css to render | The url to the CSS file.
   */
  constructor (componentName, html, css) {
    this.#componentName = componentName
    this.#fetchHandler = new FetchHandler()
    this.#html = html
    this.#css = css
    this.#registeredEvents = []
  }

  /**
   * The component name.
   *
   * @readonly
   * @returns {string} - The component name.
   */
  get componentName () {
    return this.#componentName
  }

  /**
   * Creates a html template element from the given local URL.
   *
   * @param {string} url - The URL to load.
   */
  async #loadHtmlTemplate (url) {
    const htmlCode = await this.#fetchHandler.fetchLocal(url)
    this.#html = htmlHelper.createElement(htmlCode, 'template')
  }

  /**
   * Creates a css template element from the given local URL.
   *
   * @param {string} url - The URL to load.
   */
  async #loadCssTemplate (url) {
    const cssCode = await this.#fetchHandler.fetchLocal(url)
    this.#css = htmlHelper.createCssTemplateElement(cssCode)
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
  async defineComponent () {
    // If html is not an instance of a HTMLTemplateElement, assume url and load.
    if (!(this.#html instanceof HTMLTemplateElement)) {
      await this.#loadHtmlTemplate(this.#html)
    }

    // If css is not an instance of a HTMLTemplateElement, assume url and load.
    if (!(this.#css instanceof HTMLTemplateElement)) {
      await this.#loadCssTemplate(this.#css)
    }

    // Use closure to allow our HTMLElement class to access these fields.
    // This is a necessity due to how HTMLElements are handled and created.
    const htmlTemplate = this.#html
    const cssTemplate = this.#css
    const registeredEvents = this.#registeredEvents

    customElements.define(this.#componentName,
      /**
       * The custom element constructor.
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
            const targetElement = this.shadowRoot.querySelector(event.eventListenerElementID)

            // Add event listener and set abort controller signal to ensure the listener is properly removed later.
            targetElement.addEventListener(event.eventName, event.eventFunction, { signal: this.#abortController.signal })
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
