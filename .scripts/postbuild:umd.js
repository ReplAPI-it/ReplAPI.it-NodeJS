const replace = require("replace");

replace({
  regex: '.mjs',
  replacement: '.js',
  paths: ['./umd'],
  recursive: true,
  silent: false,
});