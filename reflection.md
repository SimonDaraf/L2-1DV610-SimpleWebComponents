## `#html and #css - in webComponent.js`
One could argue that the naming here is a bit vague, that would be correct. The WebComponent class allows the user to either use a HTMLTemplate element or a local url to a html or css file. Naming it htmlTemplate would be weird because the field could currently be a url. Naming it htmlTemplateOrUrl also feels like it could raise some eyebrows. This field is explained in the constructor using JSDoc by specifying the type as `{HTMLTemplateElement|string}` which means that it can either be a HTMLTemplate element or a string. Would this have been Java or C# a constructor overload would have been cleaner. But in JavaScript this is how it has to be done.
During component definition the naming is correct as it holds the html code inside a template element. But during setup this could be confusing.

## `async defineComponent - in webComponent.js`
This method has two side effects, or it *can* have. If the user decides to use urls
instead of HTMLTemplateElements the code has to be loaded async and assigns the loaded code to the private fields `#html` and `#css`.
I decided that it's better to do this while defining the component instead of calling
async methods from the constructor which could lead to the component being defined
before the code has been loaded. Another option could be to allow the user to call these methods. In my opinion the better option here was to do this in one call to
which means that the usage when using templates and urls stays the same.

## `htmlElementConstructor - in htmlElementConstructor.js`
This util function has an inline class definition. This function deviates from
a couple of recommendations from Clean Code. 

First the function is quite long.
This is due to the function containing an inline class definition. Sadly this is how custom elements are definied. It is prohibited to use the `new` keyword with HTMLElements. This leads to the function having to incapsulate this class definition in the function.

Another effects this has is the indentation. The function has up to four levels of indentation. This is also unavoidable due to the inline class definition.

No matter how many times we refactor this logic into separate functions/methods, at some point this inline definition has to be made.