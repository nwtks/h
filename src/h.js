function h(name, attrs, ...children) {
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
      } else if (e.length) {
        appendChildren(el, e)
      }
    }
  })
}

export default h
