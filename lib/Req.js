"use strict";

var EventEmitter = require("events").EventEmitter;

function Req(method, url) {
    Req.prototype.constructor.apply(this, arguments);
}

Req.prototype = Object.create(EventEmitter.prototype);

Req.prototype.url = "";

Req.prototype.method = "GET";

Req.prototype.body = null;

Req.prototype.query = null;

Req.prototype.headers = null;

Req.prototype.params = null;

Req.prototype.transport = "";

Req.prototype.constructor = function (method, url) {
    this.method = method;
    this.url = url;

    this.headers = {};
    EventEmitter.call(this);
};

Req.prototype.send = null;


module.exports = Req;