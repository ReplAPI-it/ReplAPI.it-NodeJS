import replace from 'replace';

replace({
  regex: 'lodash',
  replacement: 'lodash-es',
  paths: ['./dist/replapi-it.mjs'],
  recursive: true,
  silent: false,
});