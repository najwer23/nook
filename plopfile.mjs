// https://medium.com/@aldinofrizal/file-creation-automation-with-plop-b18d09d77360
import Handlebars from 'handlebars';

export default function (plop) {
  plop.setHelper('storyStyles', function (text) {
    return new Handlebars.SafeString('{{ width: "100vw" }}');
  });

  plop.setGenerator('Component', {
    description: 'plop generating Component..',

    prompts: [
      {
        type: 'input',
        name: 'name',
        message: 'Component:',
      },
    ],

    actions: [
      {
        type: 'add',
        path: 'src/app/pages/{{lowerCase name}}/{{name}}.tsx',
        templateFile: 'templates/Component.txt',
      },
      {
        type: 'add',
        path: 'src/app/pages/{{lowerCase name}}/{{name}}.module.css',
        templateFile: 'templates/CSS.txt',
      },
      {
        type: 'add',
        path: 'src/app/pages/{{lowerCase name}}/{{name}}.query.ts',
        templateFile: 'templates/Query.txt',
      },
      {
        type: 'add',
        path: 'src/app/pages/{{lowerCase name}}/{{name}}.types.ts',
        templateFile: 'templates/Types.txt',
      },
      {
        type: 'add',
        path: 'src/app/pages/{{lowerCase name}}/{{name}}.utils.ts',
        templateFile: 'templates/Utils.txt',
      },
    ],
  });
}
