import { expect, test } from 'vitest'
import { createElement } from '../../package/htmlHelper.js'

test('Assert can create html element', () => {
  // Arrange
  const html = '<div>My html code.</div>'

  // Act
  const htmlTemplateElement = createElement(html, 'template')

  // Assert
  expect(htmlTemplateElement).instanceOf(HTMLTemplateElement)
  expect(htmlTemplateElement.innerHTML).toStrictEqual(html)
})
