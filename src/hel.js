function h(name, attrs) {
  const children = []
  const arg = arguments
  for (let i = 2; i < arg.length; i += 1) {
    flatten(children, arg[i])
  }
  if (typeof name === 'function') {
    return name(attrs || {}, children)
  }
  const el = document.createElement(name || 'div')
  for (const k in attrs) {
    const v = attrs[k]
    if (v != null) {
      if (k === 'dataset') {
        for (const e in v) {
          const e2 = v[e]
          if (e2 != null) {
            el.dataset[e] = e2
          }
        }
      } else if (k === 'style') {
        if (typeof v === 'string') {
          el.style.cssText = v
        } else {
          for (const e in v) {
            const e2 = v[e]
            if (e2 != null) {
              el.style[e] = e2
            }
          }
        }
      } else if (k in el || typeof v === 'function') {
        el[k] = v
        if (v === true) {
          el.setAttribute(k.toLowerCase(), '')
        }
      } else if (typeof v === 'boolean') {
        if (v === true) {
          el.setAttribute(k, '')
        }
      } else {
        el.setAttribute(k, v)
      }
    }
  }
  appendChildren(el, children)
  return el
}

function appendChildren(el, children) {
  children.forEach(e => {
    if (e != null) {
      if (e.nodeType) {
        el.appendChild(e)
      } else if (typeof e === 'string' || typeof e === 'number') {
        el.appendChild(document.createTextNode(e))
      } else if (Array.isArray(e)) {
        appendChildren(el, e)
      }
    }
  })
}

function flatten(dst, e) {
  if (Array.isArray(e)) {
    e.forEach(v => flatten(dst, v))
  } else {
    dst.push(e)
  }
}

export default h
