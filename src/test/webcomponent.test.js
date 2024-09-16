import { expect, test } from 'vitest'
import { WebComponent } from '../modules/webcomponent.js'
import { EventContainer } from '../modules/eventContainer.js'

/**
 * Test: Expects element to be added to the DOM.
 */
test('Creates a custom web component and ensures it has been added to the DOM.', () => {
  // Arrange
  const name = 'test-element-one'
  const htmlTemplate = document.createElement('template')
  htmlTemplate.innerHTML = `
  <div>This element has been added.</div>
  `
  // Not necessary for this test.
  const cssTemplate = document.createElement('template')
  cssTemplate.innerHTML = ''

  // Create component.
  const component = new WebComponent(name, htmlTemplate, cssTemplate)

  // Act
  component.defineComponent()
  const elementInstance = document.createElement(name)
  document.body.appendChild(elementInstance)
  const element = document.querySelector(name)

  // Assert
  expect(element).toBeDefined()
})

/**
 * Test: Expects html template to be correctly applied.
 */
test('Ensure custom web component content is correctly set.', () => {
  // Arrange
  const name = 'test-element-two'

  // Create html template.
  const htmlTemplate = document.createElement('template')
  htmlTemplate.innerHTML = `
  <div>This element has been added.</div>
  `

  // Not necessary for this test.
  const cssTemplate = document.createElement('template')
  cssTemplate.innerHTML = ''

  // Create component.
  const component = new WebComponent(name, htmlTemplate, cssTemplate)

  // Act
  component.defineComponent()
  const elementInstance = document.createElement(name)
  document.body.appendChild(elementInstance)
  const element = document.querySelector(name)

  // Assert
  expect(element.shadowRoot.innerHTML).equal(htmlTemplate.innerHTML)
})

test('Ensure registered events can fire', () => {
  // Arrange
  let wasClicked = false
  let idOfTarget = ''

  const name = 'test-element-three'

  // Create html template.
  const htmlTemplate = document.createElement('template')
  htmlTemplate.innerHTML = `
  <button id="test-button">A Button.</button>
  `

  // Not necessary for this test.
  const cssTemplate = document.createElement('template')
  cssTemplate.innerHTML = ''

  // Create component.
  const component = new WebComponent(name, htmlTemplate, cssTemplate)

  /**
   * The event function to use.
   *
   * @param {object} event - The event object.
   */
  const eventFunction = function (event) {
    event.stopPropagation()

    // Set was clicked to indicate logic has been executed.
    wasClicked = true
    idOfTarget = event.target.id
  }

  // Act
  component.registerEvent(new EventContainer('click', '#test-button', eventFunction))
  component.defineComponent()
  const elementInstance = document.createElement(name)
  document.body.appendChild(elementInstance)
  const element = document.querySelector(name)
  const button = element.shadowRoot.querySelector('#test-button')

  const clickEvent = new Event('click') // Used to simulate the actual event.
  button.dispatchEvent(clickEvent)

  // Assert
  expect(wasClicked).equal(true)
  expect(idOfTarget).equal('test-button')
})
