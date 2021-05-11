"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = ReplAPI;

require("core-js/stable/index.js");

require("regenerator-runtime/runtime.js");

var _fs = _interopRequireDefault(require("fs"));

var _path = _interopRequireDefault(require("path"));

var _lodash = _interopRequireDefault(require("lodash"));

var _jsonStableStringifyWithoutJsonify = _interopRequireDefault(require("json-stable-stringify-without-jsonify"));

var _loader = _interopRequireDefault(require("./src/loader.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var defaultInitVariables = {
  username: '',
  captcha: {
    token: ''
  },
  endpoints: {
    gql: '',
    restful: '',
    login: ''
  },
  markdown: {
    length: '',
    removeMarkdown: ''
  },
  previewCount: {
    comments: ''
  },
  experimentalFeatures: '',
  createDatabaseFlag: ''
};

function sortByKey(a, b) {
  return a.key > b.key ? 1 : -1;
}

function ReplAPI(initVariables) {
  if (initVariables) {
    _lodash["default"].assign(defaultInitVariables, initVariables);

    _fs["default"].writeFileSync(_path["default"].join(process.cwd(), '.replapirc.json'), "".concat((0, _jsonStableStringifyWithoutJsonify["default"])(defaultInitVariables, {
      cmp: sortByKey,
      space: 4
    }), "\n"), {
      encoding: 'utf8'
    });
  } else {
    _fs["default"].writeFileSync(_path["default"].join(process.cwd(), '.replapirc.json'), "".concat((0, _jsonStableStringifyWithoutJsonify["default"])(defaultInitVariables, {
      cmp: sortByKey,
      space: 4
    }), "\n"), {
      encoding: 'utf8'
    });
  }

  return {
    defaults: defaultInitVariables,
    Blog: _loader["default"].Blog,
    Board: _loader["default"].Board,
    Comment: _loader["default"].Comment,
    CustomDataQuery: _loader["default"].CustomDataQuery,
    CustomRecursiveQuery: _loader["default"].CustomRecursiveQuery,
    Explore: _loader["default"].Explore,
    Database: _loader["default"].Database,
    Languages: _loader["default"].Languages,
    Leaderboard: _loader["default"].Leaderboard,
    Login: _loader["default"].Login,
    Notifications: _loader["default"].Notifications,
    Post: _loader["default"].Post,
    Repl: _loader["default"].Repl,
    User: _loader["default"].User
  };
}