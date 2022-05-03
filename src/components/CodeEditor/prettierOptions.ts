import prettier from 'prettier';
import parser from 'prettier/parser-babel';

const prettierOptions: prettier.Options = {
  parser: 'babel',
  plugins: [parser],
  tabWidth: 2,
  useTabs: false,
  semi: true,
  singleQuote: true,
  trailingComma: 'none'
};

export default prettierOptions;
