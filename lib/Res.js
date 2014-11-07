"use strict";

var EventEmitter = require("events").EventEmitter;

function Res(req) {
    Res.prototype.constructor.apply(this, arguments);
}

Res.prototype = Object.create(EventEmitter.prototype);

Res.prototype.req = null;

Res.prototype.body = "";

Res.prototype.params = null;

Res.prototype.headers = "";

Res.prototype.transport = "";

Res.prototype.constructor = function (req) {
    this.req = req;
    this.headers = {};

    EventEmitter.call(this);
};

module.exports = Res;