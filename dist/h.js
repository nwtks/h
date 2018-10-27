'use strict';

function h(name, attrs) {
  var children = [], len = arguments.length - 2;
  while ( len-- > 0 ) children[ len ] = arguments[ len + 2 ];

  var el = document.createElement(name || "div");
  for (var k in attrs) {
    var v = attrs[k];
    if (v != null) {
      if (k === "dataset") {
        for (var e in v) {
          var e2 = v[e];
          if (e2 != null) {
            el.dataset[e] = e2;
          }
        }
      } else if (k === "style") {
        if (typeof v === "string") {
          el.style.cssText = v;
        } else {
          for (var e$1 in v) {
            var e2$1 = v[e$1];
            if (e2$1 != null) {
              el.style[e$1] = e2$1;
            }
          }
        }
      } else if (k in el || typeof v === "function") {
        el[k] = v;
        if (v === true) {
          el.setAttribute(k.toLowerCase(), "");
        }
      } else {
        el.setAttribute(k, v);
      }
    }
  }
  appendChildren(el, children);
  return el;
}

function appendChildren(el, children) {
  children.forEach(function (e) {
    if (e != null) {
      if (e.nodeType) {
        el.appendChild(e);
      } else if (typeof e === "string" || typeof e === "number") {
        el.appendChild(document.createTextNode(e));
      } else if (e.length) {
        appendChildren(el, e);
      }
    }
  });
}

module.exports = h;
