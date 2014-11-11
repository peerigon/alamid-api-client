"use strict";

var Router = require("i40");

function Routes() {
    this._router = Router();
}

Routes.prototype._router = null;

Routes.prototype.add = function (route, fn) {
    if (arguments.length < 2) {
        fn = arguments[0];
        route = "*";
    }
    this._router.addRoute.call(this._router, route, fn);
    return this;
};

Routes.prototype.get = addByMethod("GET");
Routes.prototype.post = addByMethod("POST");
Routes.prototype.put = addByMethod("PUT");
Routes.prototype.delete = addByMethod("DELETE");

Routes.prototype.match = function (url) {
    return this._router.match(url);
};

function addByMethod(method) {
    return function (fn) {
        return this.add(function checkMethod(req, res, next) {
            if (req.method === method) {
                fn.call(this, req, res, next);
            }
        });
    };
}

module.exports = Routes;