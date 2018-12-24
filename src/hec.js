const { isArray } = Array;
const { getOwnPropertyNames } = Object;

const h = (name, attrs, ...args) => {
  const children = flatten([], args);
  if (typeof name === 'function') {
    return name(attrs || {}, children);
  }
  const el = document.createElement(name || 'div');
  attrs != null &&
    getOwnPropertyNames(attrs)
      .filter((k) => attrs[k] != null)
      .forEach((k) => {
        const v = attrs[k];
        const vtype = typeof v;
        if (k === 'dataset') {
          v != null &&
            getOwnPropertyNames(v).forEach((e) => {
              const e2 = v[e];
              e2 != null && (el.dataset[e] = e2);
            });
        } else if (k === 'style') {
          if (vtype === 'string') {
            el.style.cssText = v;
          } else {
            v != null &&
              getOwnPropertyNames(v).forEach((e) => {
                const e2 = v[e];
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

const appendChildren = (el, children) => {
  children
    .filter((e) => e != null)
    .forEach((e) => {
      if (e.nodeType) {
        el.appendChild(e);
      } else if (isArray(e)) {
        appendChildren(el, e);
      } else if (typeof e === 'string' || typeof e === 'number') {
        el.appendChild(document.createTextNode(e));
      }
    });
};

const flatten = (dst, e) => {
  if (isArray(e)) {
    e.forEach((v) => {
      flatten(dst, v);
    });
  } else {
    dst.push(e);
  }
  return dst;
};

export default h;
