"use strict";

var Resource = require("./Resource.js");
var Req = require("./Req.js");
var Res = require("./Res.js");
var Routes = require("./Routes.js");

function Api() {
    this.transports = [];
    this.outgoing = new Routes();
    this.incoming = new Routes();
}

Api.prototype.transports = null;

Api.prototype.outgoing = null;

Api.prototype.incoming = null;

Api.prototype.get = function (url, query) {
    return this.request("GET", url, query);
};

Api.prototype.post = function (url, data) {
    return this.request("POST", url, data);
};

Api.prototype.put = function (url, data) {
    return this.request("PUT", url, data);
};

Api.prototype.delete = function (url, data) {
    return this.request("DELETE", url, data);
};

Api.prototype.request = function (method, url, data) {
    var self = this;

    return new Promise(function (resolve, reject) {
        var transports = self.transports;
        var req;
        var res;
        var transport;
        var i;
        var available;
        var route;

        function matchIncoming() {
            route = self.incoming.match(url);
            while (route) {
                route.fn.call(self, req, res);
                route = route.next();
            }
        }

        function callback(err, response) {
            res.body = response || null;

            if (err) {
                reject(err);
                return;
            }
            if (response.status) {
                // Assuming JSend response
                // @see http://labs.omniti.com/labs/jsend
                if (response.status === "success") {
                    matchIncoming();
                    resolve(response.data);
                } else {
                    reject(response);
                }
            } else {
                matchIncoming();
                resolve(response);
            }
        }

        method = method.toUpperCase();

        req = new Req(method, url);
        res = new Res(req);

        if (method === "GET") {
            req.query = data;
        } else {
            req.body = data;
        }

        for (i = 0; i < transports.length; i++) {
            transport = transports[i];
            if (transport.isAvailable()) {
                route = self.outgoing.match(url);
                req.params = route.params;
                res.params = route.params;
                req.transport = transport.name;
                res.transport = transport.name;
                while (route) {
                    route.fn.call(self, req, res);
                    route = route.next();
                }

                transport.deliver(method, url, data, callback);

                return;
            }
        }

        throw new Error("Could not deliver " + method + " " + url + ": No transport available");
    });
};

Api.prototype.use = function (plugin, config) {
    plugin(this, config);

    return this;
};

Api.prototype.resource = function (config) {
    this[config.name] = new Resource(this, config.urls, config.id);

    return this;
};

module.exports = Api;