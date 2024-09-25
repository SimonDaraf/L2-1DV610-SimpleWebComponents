import { expect, test } from 'vitest'
import { createHtmlElement, createCssTemplateElement } from '../../package/htmlHelper.js'

test('Assert can create html element', () => {
  // Arrange
  const html = '<div>My html code.</div>'

  // Act
  const htmlTemplateElement = createHtmlElement(html, 'template')

  // Assert
  expect(htmlTemplateElement).instanceOf(HTMLTemplateElement)
  expect(htmlTemplateElement.innerHTML).toStrictEqual(html)
})

test('Assert can create CSS Template element', () => {
  // Arrange
  const cssCode = `
  #test-text {
    font-size: 20px;
  }
  `

  // Act
  const cssElement = createCssTemplateElement(cssCode)
  const htmlElement = createHtmlElement('Hello', 'p')
  htmlElement.id = 'test-text'

  document.body.appendChild(cssElement.content.cloneNode(true))
  document.body.appendChild(htmlElement)

  const computedElement = document.querySelector('#test-text')
  const fontSize = parseFloat(window.getComputedStyle(computedElement, null).getPropertyValue('font-size'))

  // Assert
  expect(fontSize).toEqual(20)
})
