# WebComponent : Class
## Description
The WebComponent class allows users to more easily create user-defined elements based on the web component practice, removing most of the duplicate code needed for every custom web component.
[Read more...](https://developer.mozilla.org/en-US/docs/Web/API/Web_components)

## Construction

### `constructor(componentName : string, htmlTemplate : HTMLTemplateElement, cssTemplate : HTMLTemplateElement) : WebComponent`
* `componentName : string` - The name to be used when initializing the HTML element.
* `htmlTemplate : HTMLTemplateElement` - A template element containing the HTML content.
* `cssTemplate : HTMLTemplateElement` - A template element containing the CSS content.

## Properties

### `componentName : string`
The component name. This is what's used to initialize the element.

### `htmlContent : string`
A string containing the html content to be rendered.

### `cssContent : string`
A string containing the css content to be rendered.

## Methods

### `registerEvent(event : EventContainer) : void`
Registers an event to the web component.

* `event : EventContainer` - The event container to register.

### `defineComponent() : void`
Registers the web component allowing users to create instances of the custom element within the DOM.

## Example

```js
// Define a html template.
const htmlTemplate = document.createElement('template');
htmlTemplate.innerHtml = `
<h1 class="my-header">My Component</h1>
<button id="my-button">Click Me!</button>
`;

// Define a css template.
const cssTemplate = document.createElement('template');
cssTemplate.innerHtml = `
<style>
  .my-header {
    font-size: 20px;
  }
</style>
`;

// Create web component.
const component = new WebComponent('my-component', htmlTemplate, cssTemplate);

// Register the component.
component.defineComponent();

// The element can then be created.
const myElement = document.createElement('my-component');
```