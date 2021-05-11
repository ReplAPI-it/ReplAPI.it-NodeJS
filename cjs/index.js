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

var _source = _interopRequireDefault(require("./src/source.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var defaultInitVariables = {
  username: "",
  captcha: {
    token: ""
  },
  endpoints: {
    gql: "",
    restful: "",
    login: ""
  },
  markdown: {
    length: "",
    removeMarkdown: ""
  },
  previewCount: {
    comments: ""
  },
  experimentalFeatures: "",
  createDatabaseFlag: ""
};

function sortByKey(a, b) {
  return a.key > b.key ? 1 : -1;
}

function ReplAPI(initVariables) {
  if (initVariables) {
    _lodash["default"].assign(defaultInitVariables, initVariables);

    _fs["default"].writeFileSync(_path["default"].join(process.cwd(), ".replapirc.json"), "".concat((0, _jsonStableStringifyWithoutJsonify["default"])(defaultInitVariables, {
      cmp: sortByKey,
      space: 4
    }), "\n"), {
      encoding: "utf8"
    });
  } else {
    _fs["default"].writeFileSync(_path["default"].join(process.cwd(), ".replapirc.json"), "".concat((0, _jsonStableStringifyWithoutJsonify["default"])(defaultInitVariables, {
      cmp: sortByKey,
      space: 4
    }), "\n"), {
      encoding: "utf8"
    });
  }

  return {
    defaults: defaultInitVariables,
    Blog: _source["default"].Blog,
    Board: _source["default"].Board,
    Comment: _source["default"].Comment,
    CustomDataQuery: _source["default"].CustomDataQuery,
    CustomRecursiveQuery: _source["default"].CustomRecursiveQuery,
    Database: _source["default"].Database,
    Languages: _source["default"].Languages,
    Leaderboard: _source["default"].Leaderboard,
    Login: _source["default"].Login,
    Notifications: _source["default"].Notifications,
    Post: _source["default"].Post,
    Repl: _source["default"].Repl,
    User: _source["default"].User
  };
}