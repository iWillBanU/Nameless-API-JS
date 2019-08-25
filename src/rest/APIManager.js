const https = require("https");
const http = require("http");
const querystring = require("querystring");

/**
 * API/REST Manager for the library
 * @private
 */
class APIManager {
  /**
   * Creates an APIManager
   * @param {Client} client The current active client
   */
  constructor(client) {
    /**
     * The current active client
     * @type {Client}
     */
    this.client = client;
  }

  /**
   * The http module to use (either http or https)
   * @type {Object}
   * @readonly
   */
  get _httpModule() {
    return (this.client.urlInfo.protocol == "https:") ? https : http;
  }

  /**
   * Executes an action
   * @param {String} action The action to execute: `register`, `get`, `setGroup`, `createReport`, `getNotifications`, or `updateUsername`
   * @param {Object} postData The POST data to send in the action
   * @returns {Promise<Object>} The response from the server
   */
  executeAction(action, postData) {
    postData = querystring.stringify(postData);
    return new Promise(function(resolve, reject) {
      let httpModule = this._httpModule;
      let request = httpModule.request(this.client.apiUrl + "/" + action, {
        method: "POST",
        headers: {
          'content-type': 'application/x-www-form-urlencoded',
          'content-length': Buffer.byteLength(postData)
        }
      }, function(response) {
        let body = "";
        response.on("error", reject);
        response.on("chunk", function(chunk) {
          body += chunk;
        });
        response.on("end", function() {
          body = JSON.parse(body);
          if (body.error == true) reject(new Error(body.message)); else resolve(body);
        });
      });
      request.write(postData);
      request.end();
    });
  };
}
