export default function(plop) {
  // create your generators here
  // plop.setGenerator('basics', {
  //   description: 'this is a skeleton plopfile',
  //   prompts: [], // array of inquirer prompts
  //   actions: [], // array of actions
  // });
  // plop.setHelper('upperCase', (txt) => txt.toUpperCase());
  plop.setGenerator('table model', {
    description: 'table and row model',
    prompts: [
      {
        type: 'input',
        name: 'rowName',
        message: 'row name please',
      },
      {
        type: 'input',
        name: 'tableName',
        message: 'table name please',
      },
    ],
    actions: [{
      type: 'add',
      path: 'src/model/{{ properCase tableName }}.js',
      templateFile: 'plop-templates/tableModel.hbs',
    }],
  });

}
