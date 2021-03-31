import renderStylish from './stylish.js';
import renderPlain from './plain.js';
import renderJson from './json.js';

const format = (tree, formatName) => {
  switch (formatName) {
    case 'plain':
      return renderPlain(tree);
    case 'json':
       return renderJson(tree);
    case 'stylish':
      return renderStylish(tree);
    default:
      throw new Error(`${formatName} is not defined`);
  }
};

export default format;
