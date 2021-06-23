import replace from 'replace';

replace({
  regex: 'lodash-es',
  replacement: 'lodash',
  paths: ['./dist/replapi-it.cjs'],
  recursive: true,
  silent: false,
});