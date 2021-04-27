"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _Blog = _interopRequireDefault(require("./classes/Blog.mjs"));

var _Board = _interopRequireDefault(require("./classes/Board.mjs"));

var _Comment = _interopRequireDefault(require("./classes/Comment.mjs"));

var _Custom = require("./classes/Custom.mjs");

var _Database = _interopRequireDefault(require("./classes/Database.mjs"));

var _Languages = _interopRequireDefault(require("./classes/Languages.mjs"));

var _Leaderboard = _interopRequireDefault(require("./classes/Leaderboard.mjs"));

var _Login = _interopRequireDefault(require("./classes/Login.mjs"));

var _Notifications = _interopRequireDefault(require("./classes/Notifications.mjs"));

var _Post = _interopRequireDefault(require("./classes/Post.mjs"));

var _Repl = _interopRequireDefault(require("./classes/Repl.mjs"));

var _User = _interopRequireDefault(require("./classes/User.mjs"));

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
exports["default"] = _default;