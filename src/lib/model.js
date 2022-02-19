


class Table {
  constructor(colProps) {
    this.rows = []
    this.colIndex = []
    this.cols = colProps.map(cp => new Column(cp, this))
    this.magicRowMethods = {
      set(target, name, value, receiver) {
        if (!Reflect.has(target, name)) {
          console.log(`Setting non-existent property '${name}', initial value: ${value}`);
        }
        return Reflect.set(target, name, value, receiver);
      },
    }
  }
  newRow(data = {}) {
    return new Proxy(this._newRow(this, data), this.magicRowMethods)
  }
  hasProp(pName) {
    return this.colProps.find(p => p.name === pName)
  }
}


class Column {
  constructor(props, table) {
    this.table = table
    this.name = props.name
    this.save = true
    // todo - this.type = props.type
    if (this.name) {
      table.colIndex.push(this.name)
    } else {
      console.error('missing column name', props)
    }
  }
}


class Row {
  constructor(table, data) {
    this.table = table
    this.fill(data)
  }
  fill(data) {
    for (let pName in data) {
      this[pName] = data[pName]
    }
  }
}


export { Table, Row }