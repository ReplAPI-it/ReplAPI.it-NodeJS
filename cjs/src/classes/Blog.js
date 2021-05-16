"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _rssParser = _interopRequireDefault(require("rss-parser"));

var _lodash = _interopRequireDefault(require("lodash"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var parser = new _rssParser["default"]();

var Blog = /*#__PURE__*/function () {
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
                return parser.parseURL('https://blog.replit.com/feed.xml');

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
    key: "blogItem",
    value: function () {
      var _blogItem = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(guid) {
        var _yield$parser$parseUR, items, postIndex;

        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.next = 2;
                return parser.parseURL('https://blog.replit.com/feed.xml');

              case 2:
                _yield$parser$parseUR = _context2.sent;
                items = _yield$parser$parseUR.items;
                postIndex = _lodash["default"].findIndex(items, ['guid', guid]);
                return _context2.abrupt("return", items[postIndex]);

              case 6:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2);
      }));

      function blogItem(_x) {
        return _blogItem.apply(this, arguments);
      }

      return blogItem;
    }()
  }, {
    key: "blogItems",
    value: function () {
      var _blogItems = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {
        var order,
            count,
            feed,
            posts,
            _args3 = arguments;
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                order = _args3.length > 0 && _args3[0] !== undefined ? _args3[0] : 'newest';
                count = _args3.length > 1 && _args3[1] !== undefined ? _args3[1] : 10;
                _context3.next = 4;
                return parser.parseURL('https://blog.replit.com/feed.xml');

              case 4:
                feed = _context3.sent;
                if (order === 'oldest') feed.items.reverse();
                posts = feed.items.slice(0, count);
                return _context3.abrupt("return", posts);

              case 8:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3);
      }));

      function blogItems() {
        return _blogItems.apply(this, arguments);
      }

      return blogItems;
    }()
  }]);

  return Blog;
}();

exports["default"] = Blog;