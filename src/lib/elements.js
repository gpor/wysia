
const tagNames = ['p', 'h3', 'h2']
const nodeTypes = ['no_nodeType','ELEMENT_NODE','ATTRIBUTE_NODE','TEXT_NODE','CDATA_SECTION_NODE','PROCESSING_INSTRUCTION_NODE','COMMENT_NODE','DOCUMENT_NODE','DOCUMENT_TYPE_NODE','DOCUMENT_FRAGMENT_NODE']


const splitHtmlRecur = (wrapper, origin, left = null, right = null) => {
  if (wrapper === null) {
    return {left, right}
  }
  const ln = wrapper.cloneNode(false)
  const rn = wrapper.cloneNode(false)
  if (right !== null) {
    rn.appendChild(right)
  }
  let leftOfInner = true;
  wrapper.childNodes.forEach(node => {
    if (leftOfInner) {
      if (node.isEqualNode(origin)) {
        leftOfInner = false;
      } else {
        ln.appendChild(node.cloneNode(false))
      }
    } else {
      rn.appendChild(node.cloneNode(false))
    }
  })
  if (left !== null) {
    ln.appendChild(left)
  }
  return splitHtmlRecur(
    wrapper.tagName === 'P' ? null : wrapper.parentElement,
    wrapper,
    ln,
    rn
  )
}
const splitHtml = (br) => {
  return splitHtmlRecur(br.parentElement, br)
}
const splitAtRange = (range) => {
  const br = document.createElement('br');
  range.insertNode(br)
  return splitHtml(br);
}



export {tagNames, nodeTypes, splitAtRange}