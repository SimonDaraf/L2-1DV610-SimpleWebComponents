import { WebComponent } from '../../../package/webComponent.js'

// Simple test for web components.
const htmlTemplateOne = document.createElement('template')
const htmlTemplateTwo = document.createElement('template')
const cssTemplate = document.createElement('template')

// Create templates
htmlTemplateOne.innerHTML = `
<element-two></element-two>
`
htmlTemplateTwo.innerHTML = `
<div>I am element two</div>
`

// Create components.
const componentOne = new WebComponent('element-one', htmlTemplateOne, cssTemplate)
const componentTwo = new WebComponent('element-two', htmlTemplateTwo, cssTemplate)

// Define components.
componentOne.defineComponent()
componentTwo.defineComponent()

// Append to body.
const elementOne = document.createElement('element-one')
document.querySelector('body').appendChild(elementOne)
