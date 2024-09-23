/**
 * A HTML helper class that provides functionality for handling functionallity regarding HTML.
 */
export class FetchHandler {
  /**
   * Fetches and returns HTML code from given local url.
   *
   * @throws {Error} - If fetch failed.
   * @param {string} url - The url to the HTML code.
   * @returns {Promise<string>} - The fetched HTML as a string.
   */
  async fetchLocalHtml (url) {
    // Fetch html.
    const response = await fetch(url)

    // Return the response as a string.
    return await response.text()
  }
}
