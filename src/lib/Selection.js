
export default class {
  constructor() {
    this.s = document.getSelection()
    this.r = this.s.getRangeAt(0)
    this._rect = null
  }
  rect() {
    if (this._rect === null) {
      const rects = this.r.getClientRects()
      if (rects.length === 0) {
        this._rect = false
      } else {
        this._rect = rects[0]
      }
    }
    return this._rect
  }
  x() {
    if (this.rect()) {
      return this._rect.left
    } else {
      return false
    }
  }
}
