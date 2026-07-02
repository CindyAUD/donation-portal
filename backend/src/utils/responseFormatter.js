/**
 * Response Formatter
 * Ensures consistent API response structure across all endpoints
 */

/**
 * Format API response
 * @param {boolean} success - Whether the request was successful
 * @param {string} message - Response message
 * @param {object} data - Response data (optional)
 * @returns {object} - Formatted response object
 */
function formatResponse(success, message, data = null) {
  const response = {
    success,
    message
  };

  if (data) {
    response.data = data;
  }

  return response;
}

module.exports = {
  formatResponse
};