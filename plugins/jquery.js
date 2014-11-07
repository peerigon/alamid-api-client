"use strict";

var obj = require("../lib/obj.js");

function jqueryPlugin(api, config) {
    var $ = config.jQuery;
    var base = config.base || "";

    config.settings = config.settings || {};
    config.settings.contentType = config.settings.contentType || "application/json; charset=utf-8";

    function request(method, url, data, callback) {
        var settings = obj.copy(config.settings);

        settings.type = method.toUpperCase();
        if (data !== null) {
            if (method !== "get" && settings.contentType.indexOf("application/json") > -1) {
                data = JSON.stringify(data);
            }
            settings.data = data;
        }

        $.ajax(base + url, settings)
            .done(function onHttpSuccess(data) {
                callback(null, data);
            })
            .fail(function onHttpFail(xhr) {
                callback(new Error(xhr.responseText));
            });

        return true;
    }

    api.transports.push(request);
}

module.exports = jqueryPlugin;