import { Row, Table } from "../lib/model";



class Elements extends Table {
  constructor() {
    super([
      {
        name: 'tagName',
      },
      {
        name: 'content', /* previously `value` */
      },
      {
        name: 'id',
      },
      {
        name: 'isFocused',
        save: false,
      },
    ])
  }
  _newRow(data) {
    return new Element(data);
  }
}

class Element extends Row {
}


export default Elements