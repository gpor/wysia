
export default class {
  constructor() {
    this.s = document.getSelection()
    this.r = this.s.getRangeAt(0)
    this._rect = null
  }
  rect() {
    if (this._rect === null) {
      const rects = this.r.getClientRects()
      if (rects.length > 1) {
        console.log('rects.length !!!!!', rects.length)
      }
      if (rects.length === 0) {
        this._rect = false
      } else {
        this._rect = rects[0]
      }
    }
    return this._rect
  }
  from(type, { element, domEl = null }) {
    if (this.rect()) {
      if (domEl === null) {
        domEl = element.inputRef.current
      }
      switch (type) {
        case 'left':
          // console.log('domEl.offsetWidth', domEl.offsetWidth) // always 750
          // https://stackoverflow.com/questions/59767515/incorrect-positioning-of-getboundingclientrect-after-newline-character
          if (this.r.startOffset === 0) {
            console.log('------------------------------------- very start of element')
          } else {
            const leftChar = this.r.startContainer.textContent[this.r.startOffset - 1]
            if (leftChar === "\n") {
              console.log('------------------------------------------------ newline')
            } else if (leftChar === ' ') {
              console.log('------------------------------------------------ space')
            } else {
              console.log('------------------------------------------------ ' + leftChar)
            }
          }
          
          
          
          let tmpNode = document.createTextNode('\ufeff');
          this.r.insertNode(tmpNode);
          const nextRect = this.r.getBoundingClientRect();
          console.log('r', nextRect.right - domEl.offsetLeft)
          tmpNode.remove();

          
          
          
          
          console.log('r', this._rect.right - domEl.offsetLeft)

          return this._rect.left - domEl.offsetLeft
        case 'top':
          return this._rect.top - domEl.offsetTop
        case 'bottom':
          return domEl.offsetTop + domEl.offsetHeight - this._rect.bottom
      }
    } else {
      return false
    }
  }
}
