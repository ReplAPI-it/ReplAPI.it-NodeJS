(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(["exports", "./classes/Blog.js", "./classes/Board.js", "./classes/Comment.js", "./classes/Custom.js", "./classes/Database.js", "./classes/Languages.js", "./classes/Leaderboard.js", "./classes/Login.js", "./classes/Notifications.js", "./classes/Post.js", "./classes/Repl.js", "./classes/User.js"], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require("./classes/Blog.js"), require("./classes/Board.js"), require("./classes/Comment.js"), require("./classes/Custom.js"), require("./classes/Database.js"), require("./classes/Languages.js"), require("./classes/Leaderboard.js"), require("./classes/Login.js"), require("./classes/Notifications.js"), require("./classes/Post.js"), require("./classes/Repl.js"), require("./classes/User.js"));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.Blog, global.Board, global.Comment, global.Custom, global.Database, global.Languages, global.Leaderboard, global.Login, global.Notifications, global.Post, global.Repl, global.User);
    global.source = mod.exports;
  }
})(typeof globalThis !== "undefined" ? globalThis : typeof self !== "undefined" ? self : this, function (_exports, _Blog, _Board, _Comment, _Custom, _Database, _Languages, _Leaderboard, _Login, _Notifications, _Post, _Repl, _User) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports["default"] = void 0;
  _Blog = _interopRequireDefault(_Blog);
  _Board = _interopRequireDefault(_Board);
  _Comment = _interopRequireDefault(_Comment);
  _Database = _interopRequireDefault(_Database);
  _Languages = _interopRequireDefault(_Languages);
  _Leaderboard = _interopRequireDefault(_Leaderboard);
  _Login = _interopRequireDefault(_Login);
  _Notifications = _interopRequireDefault(_Notifications);
  _Post = _interopRequireDefault(_Post);
  _Repl = _interopRequireDefault(_Repl);
  _User = _interopRequireDefault(_User);

  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

  var _default = {
    Blog: _Blog["default"],
    Board: _Board["default"],
    Comment: _Comment["default"],
    CustomDataQuery: _Custom.CustomDataQuery,
    CustomRecursiveQuery: _Custom.CustomRecursiveQuery,
    Database: _Database["default"],
    Languages: _Languages["default"],
    Leaderboard: _Leaderboard["default"],
    Login: _Login["default"],
    Notifications: _Notifications["default"],
    Post: _Post["default"],
    Repl: _Repl["default"],
    User: _User["default"]
  };
  _exports["default"] = _default;
});