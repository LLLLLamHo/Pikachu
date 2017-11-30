/*
 * @Author: pengzhiyang
 * @Create Date: 2017/11/21
 * @Description: puppeteer second package
 */

'use strict';

// invoke puppeteer lib
const puppeteer = require( 'puppeteer' );

let root = typeof self == 'object' && self.self === self && self ||
    typeof global == 'object' && global.global === global && global ||
    this || {};

// variable standby for array 
let ArrayProto = Array.prototype,
    ObjProto = Object.prototype;

// fn standby for array
let push = ArrayProto.push,
    slice = ArrayProto.slice,
    toString = ObjProto.toString,
    hasOwnProperty = ObjProto.hasOwnProperty;

// 
let cPFun = () => {};

let cP = function (obj) {
    if (obj instanceof cP) return obj;
    if (!(this instanceof cP)) return new cP(obj);
    this._wrapped = obj;
};

if (typeof exports != 'undefined' && !exports.nodeType) {
    if (typeof module != 'undefined' && !module.nodeType && module.exports) {
        exports = module.exports = cP;
    }
    exports.cP = cP;
} else {
    root.cP = cP;
}

// var optimizeCb = function(func, context, argCount) {
//     if (context === void 0) return func;
//     switch (argCount == null ? 3 : argCount) {
//       case 1: return function(value) {
//         return func.call(context, value);
//       };
//       case 2: return function(value, other) {
//         return func.call(context, value, other);
//       };
//       case 3: return function(value, index, collection) {
//         return func.call(context, value, index, collection);
//       };
//       case 4: return function(accumulator, value, index, collection) {
//         return func.call(context, accumulator, value, index, collection);
//       };
//     }
//     return function() {
//       return func.apply(context, arguments);
//     };
//   };
 
//   var cb = function(value, context, argCount) {
//     if (value == null) return _.identity;
//     if (_.isFunction(value)) return optimizeCb(value, context, argCount);
//     if (_.isObject(value)) return _.matcher(value);
//     return _.property(value);
//   };
//   _.iteratee = function(value, context) {
//     return cb(value, context, Infinity);
//   };

// _.each = _.forEach = function(obj, iteratee, context) {
//     iteratee = optimizeCb(iteratee, context);
//     var i, length;
//     if (isArrayLike(obj)) {
//       for (i = 0, length = obj.length; i < length; i++) {
//         iteratee(obj[i], i, obj);
//       }
//     } else {
//       var keys = _.keys(obj);
//       for (i = 0, length = keys.length; i < length; i++) {
//         iteratee(obj[keys[i]], keys[i], obj);
//       }
//     }
//     return obj;
//   };

// puppeteer startup
cP.entry = cP.launth = (opts, cb) => {
	return puppeteer.launch(opts).then(cb);
}; 