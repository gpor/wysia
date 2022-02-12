
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
  console.log('wrapper', wrapper.tagName)
  wrapper.childNodes.forEach(node => {
    console.log('=====')
    if (leftOfInner) {
      if (node.isEqualNode(origin)) {
        console.log('found center', node.tagName)
        leftOfInner = false;
      } else {
        console.log('appending to ln', node.textContent)
        ln.appendChild(node.cloneNode(false))
      }
    } else {
      console.log('appending to rn', node.textContent)
      rn.appendChild(node.cloneNode(false))
    }
    console.log('---')
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



export {tagNames, nodeTypes, splitHtml}