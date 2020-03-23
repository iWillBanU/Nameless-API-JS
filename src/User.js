/**
 * Represents a user registered to the website
 */
class User {
	/**
	 * Creates a user with information from the REST action
	 * @param {Object} userInfo REST user information
	 * @param {Client} client The client that created this instance
	 */
	constructor(userInfo, client) {
		/**
		 * The client that created this instance
	         * @type {Client}
		 * @private
		 */
		this.client = client;
		/**
		 * The Minecraft username of the user
		 * @type {String}
		 */
		this.username = userInfo.username;
		/**
		 * The custom display name of the user on the website
		 * @type {String}
		 */
		this.displayname = userInfo.displayname;
		/**
		 * The Minecraft UUID of the user
		 * @type {String}
		 */
		this.uuid = userInfo.uuid;
		/**
		 * The numeric group ID of the user
		 * @type {Number}
		 */
		this.groupID = userInfo.group_id;
		/**
		 * Time the user was registered
		 * @type {Date}
		 */
		this.registered = new Date(userInfo.registered);
		/**
		 * Whether the user is banned from the website or not
		 * @type {Boolean}
		 */
		this.banned = (userInfo.banned == 1);
		/**
		 * Whether the user has validated their account on the website or not
		 * @type {Boolean}
		 */
		this.validated = (userInfo.validated == 1);
		/**
		 * The user's site reputation
		 * @type {Number}
		 */
		this.reputation = userInfo.reputation;
	};
	/**
	 * Sets this user's group
	 * @param {Number} groupID The group ID to change this user to
	 * @returns {Promise}
	 */
	async setGroup(groupID) {
		let data = await this.client.setGroup(this.uuid, groupID);
		this.groupID = groupID;
		return data;
	}
	/**
	 * Creates a report against the user
	 * @param {String|User} reporter The User object or Minecraft UUID of the reporter
	 * @param {String} content The reason for the report
	 * @returns {Promise}
	 */
	report(reporter, content) {
		return this.client.createReport(reporter, this, content);
	};
	/**
	 * Creates a report against another user, with the report being created by this user
	 * @param {String|User} reported The User object or Minecraft UUID/username of the user being reported
	 * @param {String} content The reason for the report
	 * @returns {Promise}
	 */
	createReport(reported, content) {
		return this.client.createReport(this, reported, content);
	};
	/**
	 * Gets the amount of notifications this user has
	 * @returns {Promise<Object>}
	 */
	getNotifications() {
		return this.client.getNotifications(this);
	};
	/**
	 * Updates the user's username on the website
	 * @param {String} newUsername The username to update to
	 * @returns {Promise}
	 */
	async updateUsername(newUsername) {
		let data = await this.client.updateUsername(this, newUsername);
		this.userame = newUsername;
		return data;
	};
};
