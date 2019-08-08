const url = require("url");

const APIManager = require("./rest/APIManager.js");

/**
 * The main client class
 */
class Client {
  /**
   * Creates a new client class
   * @param {String} apiUrl The API url
   */
  constructor(apiUrl) {
    /**
     * The specified API url for the client
     * @type {String}
     */
    this.apiUrl = apiUrl;

    /**
     * The parsed URL object for the API url
     * @type {URL}
     */
    this.options.urlInfo = new url.URL(this.options.apiUrl);

    /**
     * The API Manager for the client
     * @type {APIManager}
     * @private
     */
    this.apiManager = new APIManager(this);

  };
  /**
   * Registers a user on the website
   * @param {String} username The Minecraft username of the new user
   * @param {String} uuid The Minecraft UUID of the new user
   * @param {String} email The email address of the new user
   * @returns {Promise}
   */
  register(username, uuid, email) {
    return new Promise(function(resolve, reject) {
      this.apiManager.executeAction("register", {username: username, uuid: uuid, email: email})
        .then(function(response) {
          console.log(response);
          resolve();
        })
        .catch(reject);
    });
  };

};

module.exports = Client;
