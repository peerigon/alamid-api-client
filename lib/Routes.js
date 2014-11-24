"use strict";

var Router = require("i40");

var slice = Array.prototype.slice;

function Routes() {
    this._router = new Router();
}

Routes.prototype._router = null;

Routes.prototype.add = function (route, fn1, fn2, fn3) {
    var args = normalizeArguments(arguments);

    args.fns.forEach(function (fn) {
         this._router.addRoute(args.route, fn);
    }, this);

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
    return function (route, fn) {
        var args = normalizeArguments(arguments);

        args.fns = args.fns.map(function (fn) {
            return function checkMethod(req, res, next) {
                if (req.method === method) {
                    fn.call(this, req, res, next);
                }
            };
        });

        return this.add.apply(this, [].concat(args.route, args.fns));
    };
}

function normalizeArguments(args) {
    var route = args[0];
    var fns;
    var i = 0;

    if (typeof route === "string") {
        i = 1;
    } else {
        route = "*";
    }
    fns = slice.call(args, i);

    return {
        route: route,
        fns: fns
    };
}

module.exports = Routes;