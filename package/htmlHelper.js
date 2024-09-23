/**
 * Creates a HTML element from specified type with supplied HTML code.
 *
 * WARNING : Make sure you know the contents of the HTML code. The recommended
 * implementation is to use this with local HTML code and not with
 * random html code supplied from elsewhere!
 *
 * @param {string} htmlCode - The HTML code.
 * @param {string} elementType - The element type.
 * @returns {HTMLElement} - The created HTML element.
 */
export const createElement = function (htmlCode, elementType) {
  const element = document.createElement(elementType)
  element.innerHTML = htmlCode
  return element
}

/**
 * Creates a HTMLTemplate element and wraps the css code in a HTML style tag.
 *
 * @param {string} cssCode - The CSS code.
 * @returns {HTMLTemplateElement} - The css template element.
 */
export const createCssTemplateElement = function (cssCode) {
  const element = document.createElement('template')
  element.innerHTML = `<style> ${cssCode} </style>`.trim()
  return element
}
