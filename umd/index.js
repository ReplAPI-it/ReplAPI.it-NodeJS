(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(["exports", "core-js/stable/index.js", "regenerator-runtime/runtime.js", "fs", "path", "lodash", "json-stable-stringify-without-jsonify", "./src/source.js"], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require("core-js/stable/index.js"), require("regenerator-runtime/runtime.js"), require("fs"), require("path"), require("lodash"), require("json-stable-stringify-without-jsonify"), require("./src/source.js"));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.index, global.runtime, global.fs, global.path, global.lodash, global.jsonStableStringifyWithoutJsonify, global.source);
    global.index = mod.exports;
  }
})(typeof globalThis !== "undefined" ? globalThis : typeof self !== "undefined" ? self : this, function (_exports, _index, _runtime, _fs, _path, _lodash, _jsonStableStringifyWithoutJsonify, _source) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports["default"] = ReplAPI;
  _fs = _interopRequireDefault(_fs);
  _path = _interopRequireDefault(_path);
  _lodash = _interopRequireDefault(_lodash);
  _jsonStableStringifyWithoutJsonify = _interopRequireDefault(_jsonStableStringifyWithoutJsonify);
  _source = _interopRequireDefault(_source);

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
});