import { expect, test, vi } from 'vitest'
import { FetchHandler } from '../../package/fetchHandler.js'

global.fetch = vi.fn()
const fetchHandler = new FetchHandler()

/**
 * Function used to help with mocking a fetch response for tests.
 *
 * @param {string} data - The data to fetch.
 * @returns {object} - The response data.
 */
function createFetchResponse (data) {
  /* eslint-disable jsdoc/require-jsdoc */
  return { text: () => new Promise((resolve) => resolve(data)) }
}

test('Assert can fetch html', async () => {
  const fetchResponse = '<div>Mock html</div>'
  const url = './sometesturl/myfile.html' // This can be whatever, we mock the actual fetch.

  fetch.mockResolvedValue(createFetchResponse(fetchResponse))

  const response = await fetchHandler.fetchLocalHtml(url)

  expect(fetch).toHaveBeenCalledWith(url)
  expect(response).toStrictEqual(fetchResponse)
})
