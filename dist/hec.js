'use strict';

var createElement = document.createElement;
var createTextNode = document.createTextNode;
var isArray = Array.isArray;

function h(name, attrs) {
  var children = [];
  var arg = arguments;
  for (var i = 2; i < arg.length; i += 1) {
    flatten(children, arg[i]);
  }
  if (typeof name === 'function') {
    return name(attrs || {}, children)
  }
  var el = createElement(name || 'div');
  for (var k in attrs) {
    var v = attrs[k];
    if (v != null) {
      if (k === 'dataset') {
        for (var e in v) {
          var e2 = v[e];
          if (e2 != null) {
            el.dataset[e] = e2;
          }
        }
      } else if (k === 'style') {
        if (typeof v === 'string') {
          el.style.cssText = v;
        } else {
          for (var e3 in v) {
            var e4 = v[e3];
            if (e4 != null) {
              el.style[e3] = e4;
            }
          }
        }
      } else if (k in el || typeof v === 'function') {
        el[k] = v;
        if (v === true) {
          el.setAttribute(k.toLowerCase(), '');
        }
      } else if (typeof v === 'boolean') {
        if (v === true) {
          el.setAttribute(k, '');
        }
      } else {
        el.setAttribute(k, v);
      }
    }
  }
  appendChildren(el, children);
  return el
}

function appendChildren(el, children) {
  children.forEach(function (e) {
    if (e != null) {
      if (e.nodeType) {
        el.appendChild(e);
      } else if (typeof e === 'string' || typeof e === 'number') {
        el.appendChild(createTextNode(e));
      } else if (isArray(e)) {
        appendChildren(el, e);
      }
    }
  });
}

function flatten(dst, e) {
  if (isArray(e)) {
    e.forEach(function (v) { return flatten(dst, v); });
  } else {
    dst.push(e);
  }
}

module.exports = h;
