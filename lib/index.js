"use strict";

var Api = require("./Api.js");
var api = new Api();

api.Api = Api;

api.create = function (name) {
    var api;

    api = this[name] = new Api();

    return api;
};

module.exports = api;