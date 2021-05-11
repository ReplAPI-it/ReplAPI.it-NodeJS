const replace = require("replace");

replace({
  regex: '.mjs',
  replacement: '.js',
  paths: ['./cjs'],
  recursive: true,
  silent: false,
});