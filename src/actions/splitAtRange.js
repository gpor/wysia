
// const nodeTypes = ['no_nodeType','ELEMENT_NODE','ATTRIBUTE_NODE','TEXT_NODE','CDATA_SECTION_NODE','PROCESSING_INSTRUCTION_NODE','COMMENT_NODE','DOCUMENT_NODE','DOCUMENT_TYPE_NODE','DOCUMENT_FRAGMENT_NODE']


const splitHtmlRecur = (wrapper, center, left = null, right = null, hasRight = false) => {
  if (wrapper === null) {
    return { left, right, hasRight }
  }
  const ln = wrapper.cloneNode(false)
  const rn = wrapper.cloneNode(false)
  if (right !== null) {
    rn.appendChild(right)
  }
  let isLeftOfCenter = true
  wrapper.childNodes.forEach(node => {
    // console.log(nodeTypes[node.nodeType], node)
    if (node.nodeType !== 3 || node.textContent.length > 0) {
      if (isLeftOfCenter) {
        if (node.isEqualNode(center)) {
          isLeftOfCenter = false;
        } else {
          const cloned = node.cloneNode(true)
          ln.appendChild(cloned)
        }
      } else {
        const cloned = node.cloneNode(true)
        // console.log('R', cloned.textContent)
        rn.appendChild(cloned)
        hasRight = true
      }
    } else {
      // console.log('EMPTY', node.innerText)
    }
  })
  if (left !== null) {
    ln.appendChild(left)
  }
  return splitHtmlRecur(
    wrapper.tagName === 'P' ? null : wrapper.parentElement,
    wrapper,
    ln,
    rn,
    hasRight
  )
}
const splitHtml = (br) => {
  return splitHtmlRecur(br.parentElement, br)
}
const splitAtRange = (range) => {
  const br = document.createElement('br');
  // console.log('splitter br', br)
  range.deleteContents()
  range.insertNode(br)
  return splitHtml(br);
}



export default splitAtRange