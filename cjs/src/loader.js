"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _Blog = _interopRequireDefault(require("./classes/Blog.js"));

var _Board = _interopRequireDefault(require("./classes/Board.js"));

var _Comment = _interopRequireDefault(require("./classes/Comment.js"));

var _Custom = require("./classes/Custom.js");

var _Database = _interopRequireDefault(require("./classes/Database.js"));

var _Explore = _interopRequireDefault(require("./classes/Explore.js"));

var _Languages = _interopRequireDefault(require("./classes/Languages.js"));

var _Leaderboard = _interopRequireDefault(require("./classes/Leaderboard.js"));

var _Login = _interopRequireDefault(require("./classes/Login.js"));

var _Notifications = _interopRequireDefault(require("./classes/Notifications.js"));

var _Post = _interopRequireDefault(require("./classes/Post.js"));

var _Repl = _interopRequireDefault(require("./classes/Repl.js"));

var _User = _interopRequireDefault(require("./classes/User.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _default = {
  Blog: _Blog["default"],
  Board: _Board["default"],
  Comment: _Comment["default"],
  CustomDataQuery: _Custom.CustomDataQuery,
  CustomRecursiveQuery: _Custom.CustomRecursiveQuery,
  Database: _Database["default"],
  Explore: _Explore["default"],
  Languages: _Languages["default"],
  Leaderboard: _Leaderboard["default"],
  Login: _Login["default"],
  Notifications: _Notifications["default"],
  Post: _Post["default"],
  Repl: _Repl["default"],
  User: _User["default"]
};
exports["default"] = _default;