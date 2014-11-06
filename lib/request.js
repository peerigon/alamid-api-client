"use strict";

var obj = require("./obj");

function request(transports, method, url, data) {
    return new Promise(function (resolve, reject) {
        var i;
        var state;

        function callback(err, response) {
            if (err) {
                reject(err);
            } else if (response.status) {
                // Assuming JSend response
                // @see http://labs.omniti.com/labs/jsend
                if (response.status === "success") {
                    resolve(response.data);
                } else {
                    reject(response);
                }
            } else {
                resolve(response);
            }
        }

        data = obj.isEmpty(data)? null : data;

        for (i = 0; i < transports.length; i++) {
            state = transports[i](method.toLowerCase(), url, data, callback);
            if (state) {
                return;
            }
        }
    });
}

module.exports = request;