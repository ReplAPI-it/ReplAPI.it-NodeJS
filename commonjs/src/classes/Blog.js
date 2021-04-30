"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _rssParser = _interopRequireDefault(require("rss-parser"));

var _constants = _interopRequireDefault(require("../utils/constants.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var parser = new _rssParser["default"]();
var exportable;

if (_constants["default"].initVariables.experimentalFeatures) {
  exportable = /*#__PURE__*/function () {
    function Blog() {
      _classCallCheck(this, Blog);
    }

    _createClass(Blog, [{
      key: "blogData",
      value: function () {
        var _blogData = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
          var feed;
          return regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
              switch (_context.prev = _context.next) {
                case 0:
                  _context.next = 2;
                  return parser.parseURL("https://blog.replit.com/feed.xml");

                case 2:
                  feed = _context.sent;
                  delete feed.items;
                  return _context.abrupt("return", feed);

                case 5:
                case "end":
                  return _context.stop();
              }
            }
          }, _callee);
        }));

        function blogData() {
          return _blogData.apply(this, arguments);
        }

        return blogData;
      }()
    }, {
      key: "blogItems",
      value: function () {
        var _blogItems = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
          var order,
              count,
              feed,
              posts,
              _args2 = arguments;
          return regeneratorRuntime.wrap(function _callee2$(_context2) {
            while (1) {
              switch (_context2.prev = _context2.next) {
                case 0:
                  order = _args2.length > 0 && _args2[0] !== undefined ? _args2[0] : "newest";
                  count = _args2.length > 1 && _args2[1] !== undefined ? _args2[1] : 10;
                  _context2.next = 4;
                  return parser.parseURL("https://blog.replit.com/feed.xml");

                case 4:
                  feed = _context2.sent;
                  if (order === "oldest") feed.items.reverse();
                  posts = feed.items.slice(0, count);
                  return _context2.abrupt("return", posts);

                case 8:
                case "end":
                  return _context2.stop();
              }
            }
          }, _callee2);
        }));

        function blogItems() {
          return _blogItems.apply(this, arguments);
        }

        return blogItems;
      }()
    }]);

    return Blog;
  }();
} else {
  exportable = function noExperimentalFeatures() {
    console.log("Experimental Features are not enabled. To learn more about experimental features please visit the documentation.");
  };
}

var _default = exportable;
exports["default"] = _default;