import { EventContainer } from '../../../../package/eventContainer.js'
import { WebComponent } from '../../../../package/webComponent.js'

// Local URL's to files.
const MODULE_PATH = import.meta.url
const html = new URL('./button.html', MODULE_PATH)
const css = new URL('./button.css', MODULE_PATH)

// Create web component.
const buttonComponent = new WebComponent('button-component', html, css)

/**
 * Changes the container background color to a random color.
 *
 * @param {MouseEvent} event - The click event object.
 */
const clickEvent = function (event) {
  event.stopPropagation()

  // Check if our button fired event.
  if (event.target.id === 'my-button') {
    const container = event.currentTarget

    // Set a random color.
    let color = '#'
    for (let i = 0; i < 6; i++) {
      color += Math.floor(Math.random() * 10) // Number between [0 - 9].
    }

    container.style.backgroundColor = color
  }
}

// Register click event.
const clickEventContainer = new EventContainer('click', '#button-container', clickEvent)
buttonComponent.registerEvent(clickEventContainer)

// Define component.
await buttonComponent.defineComponent()
