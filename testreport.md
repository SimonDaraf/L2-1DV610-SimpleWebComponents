# Test Report - Simplified-Web-Components

## FetchHandler

| **Test Case** | **Expected** | **Status** |
|:---------|:--------|:--------:|
| Assert can fetch html. | Mocks a html fetch request and asserts that the fetch response is that of the mocked one. | ✅ |
| Assert can fetch css. | Mocks a css fetch request and asserts that the fetch response is that of the mocked one. | ✅ |
||||

## HTMLHelper

| **Test Case** | **Expected** | **Status** |
|:---------|:--------|:--------:|
| Assert can create html element. | Asserts that a html element can be created and that the inner html is what's expected. | ✅ |
| Assert valid html name. | Assert that valid html component names are accepted. | ✅ |
| Assert invalid html name. | Assert that invalid html component names throws an exception. | ✅ |
| Assert no forbidden html name. | Assert that if no forbidden html name is present, the name is accepted. | ✅ |
| Assert forbidden html name. | Assert that a component name containing a forbidden html name is invalid. | ✅ |
||||

## EventContainer

| **Test Case** | **Expected** | **Status** |
|:---------|:--------|:--------:|
| Assert valid event name. | Assert that the event name is valid. | ✅ |
| Assert invalid event name. | Assert that an invalid event name throws an exception. | ✅ |
| Assert valid event listener element id name. | Assert that the event listener element id name is valid. | ✅ |
| Assert invalid event listener element id name. | Assert that an invalid event listener element id name throws an exception. | ✅ |
| Assert append prefix if missing on id. | Assert that if the id prefix is missing from the event listener element id, it is appended. | ✅ |
| Assert valid event function. | Assert that both functions and async functions are concidered as accepted event functions. | ✅ |
| Assert invalid event function. | Assert that an invalid event function throws an exception. | ✅ |
||||

## WebComponent

| **Test Case** | **Expected** | **Status** |
|:---------|:--------|:--------:|
| Assert component name is valid. | Assert that the component name is valid. | ✅ |
| Assert component name is invalid. | Assert that an invalid component name throws an exception. | ✅ |
| Assert html is valid. | Assert that the provided html option is valid. | ✅ |
| Assert html is invalid. | Assert that an invalid html option throws an exception. | ✅ |
| Assert css is valid. | Assert that the provided css option is valid. | ✅ |
| Assert css is invalid. | Assert that an invalid css option throws an exception. | ✅ |
| Creates a custom web component and ensures it has been added to the DOM. | Assert that the created custom component is appended to the DOM. | ✅ |
| Ensure custom web component content is correctly set. | Assert that the created components inner content is correctly set. | ✅ |
| Ensure registered events can fire. | Assert that any registered event are correctly invoked. | ✅ |
||||