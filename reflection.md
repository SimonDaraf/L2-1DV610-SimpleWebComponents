## `#html and #css - in webComponent.js`
One could argue that the naming here is a bit vague, that would be correct. The WebComponent class allows the user to either use a HTMLTemplate element or a local url to a html or css file. Naming it htmlTemplate would be weird because the field could currently be a url. Naming it htmlTemplateOrUrl also feels like it could raise some eyebrows. This field is explained in the constructor using JSDoc by specifying the type as `{HTMLTemplateElement|string}` which means that it can either be a HTMLTemplate element or a string. Would this have been Java or C# a constructor overload would have been cleaner. But in JavaScript this is how it has to be done.
During component definition the naming is correct as it holds the html code inside a template element. But during setup this could be confusing.

## `#setCss(newCSS) in webComponent.js`
Looking at the implementation it looks like this:

```js
#setCss (newCss) {
  if (!(newCss instanceof HTMLTemplateElement) &&
      !(newCss instanceof URL) &&
      typeof (newCss) !== 'string') {
    throw new Error('Invalid type of css, expected type: HTMLTemplateElement, string or URL')
  }

  this.#css = newCss
}
```
Looking at our conditional statement we can see that due to the length of the condition it has been indented to reduce potential overflow. But as a result has made the line harder to read.
The problem here is how we are handling the validation. We're checking whether it isn't one of the expected types. This means that the condition has to be validated at the same time to check for every potential type. This can follow directly in to the next reflection.

## `Repeated conditionals in webComponent.js`
Each condition checked in WebComponents setters is used multiple times. One way too fix both the repeated condition statements and the use of multiline `if statements` is to separate each conditional into a separate method. The result of this would be:

* Better separation of concern. Now the setter is only responsible for populating the field, not performing every conditional check from scratch.
* Shorter conditional statements.
* No repeated conditional declarations.

This problem also exists in for example EventContainer.
One downside to this could be an overabundance of smaller private methods in each class. These conditionals could for example be refactored into a new utility class which provide a set of tailored validation checks for the module.

## `async defineComponent - in webComponent.js`
This method has two side effects, or it *can* have. If the user decides to use urls
instead of HTMLTemplateElements the code has to be loaded async and assigns the loaded code to the private fields `#html` and `#css`.
I decided that it's better to do this while defining the component instead of calling
async methods from the constructor which could lead to the component being defined
before the code has been loaded. Another option could be to allow the user to call these methods. In my opinion the better option here was to do this in one call to
which means that the usage when using templates and urls stays the same. Or just don't change the private field and declare two variables in the function scope which are later passed into the define method.

## `htmlElementConstructor - in htmlElementConstructor.js`
This util function has an inline class definition. This function deviates from
a couple of recommendations from Clean Code. 

First the function is quite long.
This is due to the function containing an inline class definition. Sadly this is how custom elements are definied. It is prohibited to use the `new` keyword with HTMLElements. This leads to the function having to incapsulate this class definition in the function.

Another effects this has is the indentation. The function has up to four levels of indentation. This is also unavoidable due to the inline class definition.

No matter how many times we refactor this logic into separate functions/methods, at some point this inline definition has to be made.

## `createHtmlElement in htmlHelper.js`
The createHtmlElement function is a `dyadic` function, taking two arguments. Although adviced against in Clean Code it is indeed necessary in certain scenarios. Although here this function was created to avoid having to first create the element and the set its innerHtml, it's alot cleaner to just call a function to do that. Looking below this function there is a similar fucntion tailored for css. But that is a `monadic` function. Truth be told the fact that createHtmlElement exists in its current form is not neccesary. The module only uses it to create template elements, just like the function below for css. The funny thing here is that I actually changed this in the official release and forgot to update this one. Later when I decided to implement my test cases in the official repo the tests failed because it was referencing the old function `createHtmlElement` and not the newer `createHtmlTemplateElement`. Because I also forgot to update this working repo with the newer implementation when I later moved the code the older method was referenced in both the test cases and in the WebComponent class. I therefor decided to just use the older function. All this proves is that I should have just made my official package a sub-repo of this one instead of having two separate repos and copy the code between them.