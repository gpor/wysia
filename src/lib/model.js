


class Table {
  constructor() {
    this.rows = []
  }
  new(data = {}) {
    const row = this._new(data)
    row.table = this
    this.rows.push(row)
    return row
  }
}



class Row {
  constructor(data = {}) {
    this.table = null
  }
  fill(data) {
    for (let pName in data) {
      if (Object.prototype.hasOwnProperty.call(this, pName)) {
        this[pName] = data[pName]
      } else {
        console.error('no property '+pName+ ' in:', this)
      }
    }
  }
}


export { Table, Row }