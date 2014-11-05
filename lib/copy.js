"use strict";

function copy(obj, target) {
    target = target || {};

    Object.keys(obj).forEach(function (key) {
        target[key] = obj[key];
    });

    return target;
}

module.exports = copy;