import { Row, Table } from "../lib/model";



class Elements extends Table {
  _newRow(props) {
    return new Element(props);
  }
}

class Element extends Row {
  props() {
    return [
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
    ]
  }
}


export default Elements