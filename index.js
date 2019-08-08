const http = require("http");
const https = require("https");
const url = require("url");

class Client {
  constructor(options = {}) {
    this.options = options;
    this.options.urlInfo = new url.URL(this.options.apiUrl);
  };
  register(username, uuid, email) {
    let httpModule 
  };
};

module.exports = Client;
