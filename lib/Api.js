"use strict";

var request = require("./request.js");
var Resource = require("./Resource.js");

function Api() {
    this.transports = [];
}

Api.prototype.transports = null;

Api.prototype.get = function (url, query) {
    return request(this.transports, "get", url, query);
};

Api.prototype.post = function (url, data) {
    return request(this.transports, "post", url, data);
};

Api.prototype.put = function (url, data) {
    return request(this.transports, "put", url, data);
};

Api.prototype["delete"] = function (url, data) {
    return request(this.transports, "delete", url, data);
};

Api.prototype.del = Api.prototype["delete"];

Api.prototype.use = function (plugin, config) { /* jshint validthis: true */
    plugin(this, config);

    return this;
};

Api.prototype.resource = function (config) {
    this[config.name] = new Resource(this, config.urls, config.id);

    return this;
};

module.exports = Api;