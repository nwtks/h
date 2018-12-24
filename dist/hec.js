'use strict';

var isArray = Array.isArray;
var getOwnPropertyNames = Object.getOwnPropertyNames;

var h = function (name, attrs) {
  var args = [], len = arguments.length - 2;
  while ( len-- > 0 ) args[ len ] = arguments[ len + 2 ];

  var children = flatten([], args);
  if (typeof name === 'function') {
    return name(attrs || {}, children);
  }
  var el = document.createElement(name || 'div');
  attrs != null &&
    getOwnPropertyNames(attrs)
      .filter(function (k) { return attrs[k] != null; })
      .forEach(function (k) {
        var v = attrs[k];
        var vtype = typeof v;
        if (k === 'dataset') {
          v != null &&
            getOwnPropertyNames(v).forEach(function (e) {
              var e2 = v[e];
              e2 != null && (el.dataset[e] = e2);
            });
        } else if (k === 'style') {
          if (vtype === 'string') {
            el.style.cssText = v;
          } else {
            v != null &&
              getOwnPropertyNames(v).forEach(function (e) {
                var e2 = v[e];
                e2 != null && (el.style[e] = e2);
              });
          }
        } else if (k in el) {
          el[k] = v;
          if (v === true) {
            el.setAttribute(k, '');
          }
        } else if (vtype === 'function') {
          el[k] = v;
        } else if (vtype === 'boolean') {
          if (v === true) {
            el.setAttribute(k, '');
          }
        } else {
          el.setAttribute(k, v);
        }
      });
  appendChildren(el, children);
  return el;
};

var appendChildren = function (el, children) {
  children
    .filter(function (e) { return e != null; })
    .forEach(function (e) {
      if (e.nodeType) {
        el.appendChild(e);
      } else if (isArray(e)) {
        appendChildren(el, e);
      } else if (typeof e === 'string' || typeof e === 'number') {
        el.appendChild(document.createTextNode(e));
      }
    });
};

var flatten = function (dst, e) {
  if (isArray(e)) {
    e.forEach(function (v) {
      flatten(dst, v);
    });
  } else {
    dst.push(e);
  }
  return dst;
};

module.exports = h;
