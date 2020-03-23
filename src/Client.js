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
   * @constructor
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
    this.urlInfo = new url.URL(this.apiUrl);
    /**
     * The API Manager for the client
     * @type {APIManager}
     * @private
     */
    this.apiManager = new APIManager(this);
    /**
     * Users cache
     * @type {Array<User>}
     * @private
     */
    this.usersCache = [];
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
    let myclient = this;
    return new Promise(function(resolve, reject) {
      myclient.apiManager.executeAction("register", {username: username, uuid: uuid, email: email})
        .then(function(response) {
          // TODO: Handle response
          resolve();
        })
        .catch(reject);
    });
  };
  /**
   * Fetches a user from the website
   * @param {String} user The user to fetch
   * @returns {Promise<User>} The user that was fetched
   * @method
   */
  get(user) {
    if (user instanceof User) return new Promise(resolve => resolve(user));
    let myclient = this;
    let postData = {};
    let userobj = this.usersCache.find(u => u.username == user || u.uuid == user);
    if (userobj) return new Promise(resolve => resolve(userobj));
    if (user.length <= 15) {
      postData.username = user;
    } else {
      postData.uuid = user;
    };
    return new Promise(function(resolve, reject) {
      myclient.apiManager.executeAction("get", postData)
        .then(function(response) {
            let uobj = new User(response);
            myclient.usersCache.push(uobj);
            resolve(uobj);
        }).catch(reject);
    });
  };
  /**
   * Sets a user's group on the website
   * @param {String|User} user The user whos group is being set
   * @param {Number} group The ID of the group that is being changed
   * @returns {Promise} 
   */
  setGroup(user, group) {
    let myclient = this;
    return new Promise(async function(resolve, reject) {
        let postData = {group_id: group};
        user = await myclient.get(user).catch(reject);
        postData.uuid = user.uuid;
        postData.username = user.username;
        myclient.apiManager.executeAction("setGroup", postData)
            .then(function(response) {
                // TODO: Handle response
                resolve();
            }).catch(reject);
    });
  };
  /**
   * Creates a report against a specific player
   * @param {String|User} reporter The user sending the report
   * @param {String|User} reported The user being reported
   * @param {String} content The reason for the report 
   * @returns {Promise}
   */
  createReport(reporter, reported, content) {
    let myclient = this;
    return new Promise(async function(resolve, reject) {
        reporter = await myclient.get(reporter).catch(reject);
        reported = await myclient.get(reported).catch(reject);
        let postData = {reporter_uuid: reporter.uuid, reported_uuid: reported.uuid, reported_username: reported.username, content: content};
        myclient.apiManager.executeAction("createReport", postData).then(function(response) {
            // TODO: Handle response
        });
    })
  };
  /**
   * Fetches the number of unread notifications a user has
   * @param {String|User} user The user to fetch notifications for
   * @returns {Promise<Object>} An object containing the number of unread notifications
   */
  getNotifications(user) {
    let myclient = this;
    return new Promise(async function(resolve, reject) {
        user = await myclient.get(user).catch(reject);
        let postData = {uuid: user.uuid || user.username};
        myclient.apiManager.executeAction("getNotifications", postData).then(function(response) {
            // TODO: Handle response
        })
    });
  };
  /**
   * Updates a user's Minecraft username on the website
   * @param {String|User} user The user to update
   * @param {String} newUsername The new username
   * @returns {Promise}
   */
  function(user, newUsername) {
      
  }
};

module.exports = Client;
