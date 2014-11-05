"use strict";

// TODO
// Not finished yet

var http = require("http");
var querystring = require("querystring");

function nodeHttp(client, config) {
    var sep = config.sep || "&";
    var eq = config.eq || "=";

    function request(method, url, data, callback) {
        var options = copy(config.options, {});
        var body;
        var req;

        options.headers = options.headers? copy(options.headers, {}) : {};
        method = method.toUpperCase();
        if (method === "GET") {
            url += "?" + querystring.stringify(data, sep, eq);
        } else {
            body = data;
            if (body && typeof body === "object") {
                options.headers["Content-Type"] = "application/json";
                body = JSON.stringify(body);
            }
        }

        options.method = method;
        options.path += url;

        req = http.request(options, callback);
        if (body) {
            req.write(body);
        }
        req.end();
        req.on("response", function onResponse(response) {
            response.on("data");
        });

        return true;
    }

    client.transports.push(request);
}

function copy(obj, target) {
    Object.keys(obj).forEach(function (key) {
        target[key] = obj[key];
    });
}

module.exports = nodeHttp;