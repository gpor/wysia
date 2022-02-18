


class Table {
  constructor() {
    this.rows = []
  }
  newRow(props) {
    return this._newRow(this, props)
  }
}


class Row {
  constructor(table, props) {
    this.table = table
    this.fill(props)
  }
  
}


export { Table, Row }