"use strict";

function request(transports, method, url, data) {
    return new Promise(function (resolve, reject) {
        var i;
        var state;

        function callback(err, response) {
            if (err) {
                reject(err);
            } else {
                resolve(response);
            }
        }

        for (i = 0; i < transports.length; i++) {
            state = transports[i](method, url, data, callback);
            if (state) {
                return;
            }
        }
    });
}

module.exports = request;