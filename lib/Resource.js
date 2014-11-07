"use strict";

var pathToUrl = require("path-to-url");
var obj = require("./obj");

var detectVariables = /:([^/]+)/g;

function Resource(api, urlSchemas, idProperty) {
    var self = this;

    // Reset RegExp
    detectVariables.lastIndex = 0;

    this.api = api;
    this.urlSchemas = urlSchemas;
    this.variables = {};
    this.idProperty = idProperty || this.idProperty;

    Object.keys(this.urlSchemas).forEach(function (method) {
        var variables = [];
        var urlSchema = urlSchemas[method];
        var match;

        while ((match = detectVariables.exec(urlSchema))) {
            variables.push(match[1]);
        }

        self.variables[method] = variables;
    });
}

Resource.prototype.idProperty = "id";
Resource.prototype.api = null;
Resource.prototype.urlSchemas = null;
Resource.prototype.keys = null;

Resource.prototype.getMany = function (query) {
    var url = pathToUrl(this.urlSchemas.getMany, query);

    obj.without(query, this.variables.getMany);

    return this.api.get(url, query);
};

Resource.prototype.get = function (query) {
    var url;

    if (typeof query !== "object") {
        query = {};
        query[this.idProperty] = query;
    }
    url = pathToUrl(this.urlSchemas.get, query);

    return this.api.get(url, null);
};

Resource.prototype.save = function (query, obj) {
    var method;
    var url;
    var id;

    if (arguments.length < 2) {
        obj = arguments[0];
        query = {};
        query[this.idProperty] = obj[this.idProperty];
    }
    id = obj[this.idProperty];
    method = id !== null && id !== undefined? "put" : "post";
    url = pathToUrl(this.urlSchemas[method], query);

    return this.api[method](url, obj);
};

Resource.prototype.delete = function (query) {
    var url;

    if (typeof query !== "object") {
        query = {};
        query[this.idProperty] = query;
    }

    url = pathToUrl(this.urlSchemas["delete"], query);

    return this.api.delete(url, obj);
};

module.exports = Resource;