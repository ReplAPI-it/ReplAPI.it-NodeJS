const replace = require("replace");

const indexRegex = /(?<=case "\.mjs":).*?(?=break;)/gs

replace({
  regex: indexRegex,
  replacement: '',
  paths: ['./cjs'],
  recursive: true,
  silent: false,
});

replace({
	regex: '\n\n    case ".mjs":break;',
  replacement: '',
  paths: ['./cjs'],
  recursive: true,
  silent: false,
})

const constantsRegex1 = /(?<=var explorer = \(0, _cosmiconfig\.cosmiconfig\)\(moduleName, {).*?(?=    }\(\)\n  }\n}\);)/gs
const constantsRegex2 = /(?<=var explorer = \(0, _cosmiconfig\.cosmiconfig\)\(moduleName, {).*?(?=}\);)/gs
const constantsRegex3 = /var explorer = \(0, _cosmiconfig\.cosmiconfig\)\(moduleName, {}\);/

const constantsReplacement = `var explorer = (0, _cosmiconfig.cosmiconfig)(moduleName);`

replace({
  regex: constantsRegex1,
  replacement: '',
  paths: ['./cjs'],
  recursive: true,
  silent: false,
});

replace({
  regex: constantsRegex2,
  replacement: '',
  paths: ['./cjs'],
  recursive: true,
  silent: false,
});

replace({
  regex: constantsRegex3,
  replacement: constantsReplacement,
  paths: ['./cjs'],
  recursive: true,
  silent: false,
});

replace({
  regex: '.mjs',
  replacement: '.js',
  paths: ['./cjs'],
  recursive: true,
  silent: false,
});
