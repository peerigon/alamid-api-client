"use strict";

var copy = require("../lib/copy.js");

function jqueryPlugin(api, config) {
    var $ = config.$;
    var base = config.base || "";

    config.settings = config.settings || {};
    config.settings.contentType = config.settings.contentType || "application/json; charset=utf-8";

    function request(method, url, data, callback) {
        var settings = copy(config.settings);

        settings.type = method.toUpperCase();
        settings.data = data;

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