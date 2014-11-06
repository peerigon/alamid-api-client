"use strict";

function copy(obj, target) {
    target = target || {};

    Object.keys(obj).forEach(function (key) {
        target[key] = obj[key];
    });

    return target;
}

function without(obj, keys) {
    Object.keys(obj).forEach(function (key) {
        if (keys.indexOf(key) > -1) {
            delete obj[key];
        }
    });
}

function isEmpty(obj) {
    return Object.keys(obj).length === 0;
}

exports.copy = copy;
exports.without = without;
exports.isEmpty = isEmpty;