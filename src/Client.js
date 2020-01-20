const url = require("url");

const APIManager = require("./rest/APIManager.js");

/**
 * The main client class
 * @class
 */
class Client {
  /**
   * Creates a new client class
   * @param {String} apiUrl The API url
   * @param {Boolean} cacheUsers Whether or not to cache user objects. (improves preformance but may cause inconsistentcies between the library and the website) Defaults to true
   * @constructor
   */
  constructor(apiUrl, cacheUsers = true) {
    /**
     * The specified API url for the client
     * @type {String}
     */
    this.apiUrl = apiUrl;
    
    /**
     * Whether or not to cache user objects
     * @type {Boolean}
     */
    this.cacheUsers = cacheUsers;
    
    if (cacheUsers) {
      /** 
       * A Map containing the cached users
       * @type {?Map<Array<String>,User>}
       * @private
       */
      this.cachedUsers = new Map();
    };
    
    /**
     * The parsed URL object for the API url
     * @type {URL}
     */
    this.urlInfo = new url.URL(this.apiUrl);

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
   * @method
   */
  register(username, uuid, email) {
    return new Promise(function(resolve, reject) {
      this.apiManager.executeAction("register", {username: username, uuid: uuid, email: email})
        .then(function(response) {
          // TODO: Handle response
          resolve();
        })
        .catch(reject);
    });
  };
  /**
   * Fetches a user from the website
   * @param {String} user Minecraft username/UUID of the user to fetch
   * @param {Boolean} force? Force a request to the website/disables getting user from cache
   * @returns {Promise<User>} The user that was fetched
   * @method
   */
  get(user, force = false) {
    // TODO: Cache Support
    let postData = {};
    if (user.length <= 15) {
      postData.username = user;
    } else {
      postData.uuid = user;
    };
    return new Promise(function(resolve, reject) {
      this.apiManager.executeAction("get", postData)
        .then(function(response) {
          resolve(new User(response));
        }).catch(reject);
    });
  };
  /**
   * Sets a user's group on the website
   * @param {String} user Minecraft username/UUID of the user whos group is being set
   * @param {Number} group The ID of the group that is being changed
   */
  setGroup(user, group) {
    let postData = {group_id: group};
    if (user.length <= 15) {
        postData.username = user;
    } else {
        postData.uuid = user;
    };
    return new Promise(function(resolve, reject) {
        this.apiManager.executeAction("setGroup", postData)
            .then(function(response) {
                // TODO: Handle response
                resolve();
            }).catch(reject);
    });
  };
  
};

module.exports = Client;
