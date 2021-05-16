"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _nodeFetch = _interopRequireDefault(require("node-fetch"));

var _headers = _interopRequireDefault(require("../utils/headers.js"));

var _constants = _interopRequireDefault(require("../utils/constants.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Explore = /*#__PURE__*/function () {
  function Explore(tag) {
    _classCallCheck(this, Explore);

    this.tag = tag;
  }

  _createClass(Explore, [{
    key: "exploreFeaturedRepls",
    value: function () {
      var _exploreFeaturedRepls = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
        var info;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return (0, _nodeFetch["default"])(_constants["default"].graphql, {
                  method: 'POST',
                  headers: _headers["default"],
                  body: JSON.stringify({
                    query: "\n\t\t\t\t\tquery ExploreFeaturedRepls {\n\t\t\t\t\t\tfeaturedRepls {\n\t\t\t\t\t\t\t".concat(_constants["default"].replAttributes, "\n\t\t\t\t\t\t}\n\t\t\t\t\t}")
                  })
                }).then(function (res) {
                  return res.json();
                });

              case 2:
                info = _context.sent;

                if (!info.errors) {
                  _context.next = 5;
                  break;
                }

                throw new Error("Replit GraphQL Error(s): ".concat(JSON.stringify(info.errors)));

              case 5:
                if (info.data.featuredRepls) {
                  _context.next = 9;
                  break;
                }

                throw new Error("Cannot fetch explore.");

              case 9:
                return _context.abrupt("return", info.data.featuredRepls);

              case 10:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }));

      function exploreFeaturedRepls() {
        return _exploreFeaturedRepls.apply(this, arguments);
      }

      return exploreFeaturedRepls;
    }()
  }, {
    key: "exploreTrendingTags",
    value: function () {
      var _exploreTrendingTags = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
        var info;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.next = 2;
                return (0, _nodeFetch["default"])(_constants["default"].graphql, {
                  method: 'POST',
                  headers: _headers["default"],
                  body: JSON.stringify({
                    query: "\n\t\t\t\t\tquery ExploreFeaturedRepls {\n\t\t\t\t\t\ttrendingTagsFeed {\n\t\t\t\t\t\t\ttags\n\t\t\t\t\t\t}\n\t\t\t\t\t}"
                  })
                }).then(function (res) {
                  return res.json();
                });

              case 2:
                info = _context2.sent;

                if (!info.errors) {
                  _context2.next = 5;
                  break;
                }

                throw new Error("Replit GraphQL Error(s): ".concat(JSON.stringify(info.errors)));

              case 5:
                if (info.data.trendingTagsFeed.tags) {
                  _context2.next = 9;
                  break;
                }

                throw new Error("Cannot fetch explore.");

              case 9:
                return _context2.abrupt("return", info.data.trendingTagsFeed.tags);

              case 10:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2);
      }));

      function exploreTrendingTags() {
        return _exploreTrendingTags.apply(this, arguments);
      }

      return exploreTrendingTags;
    }()
  }, {
    key: "exploreTagData",
    value: function () {
      var _exploreTagData = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {
        var tag, info;
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                tag = this.tag;
                _context3.next = 3;
                return (0, _nodeFetch["default"])(_constants["default"].graphql, {
                  method: 'POST',
                  headers: _headers["default"],
                  body: JSON.stringify({
                    query: "\n\t\t\t\t\tquery ExploreTrendingRepls($id: String!) {\n\t\t\t\t\t\ttag(id: $id) {\n\t\t\t\t\t\t\t".concat(_constants["default"].tagAttributes, "\n\t\t\t\t\t\t}\n\t\t\t\t\t}"),
                    variables: JSON.stringify({
                      id: tag
                    })
                  })
                }).then(function (res) {
                  return res.json();
                });

              case 3:
                info = _context3.sent;

                if (!info.errors) {
                  _context3.next = 6;
                  break;
                }

                throw new Error("Replit GraphQL Error(s): ".concat(JSON.stringify(info.errors)));

              case 6:
                if (info.data.tag) {
                  _context3.next = 10;
                  break;
                }

                throw new Error("Cannot fetch explore.");

              case 10:
                return _context3.abrupt("return", info.data.tag);

              case 11:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      function exploreTagData() {
        return _exploreTagData.apply(this, arguments);
      }

      return exploreTagData;
    }()
  }, {
    key: "exploreTagRepls",
    value: function () {
      var _exploreTagRepls = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4() {
        var after,
            tag,
            info,
            _args4 = arguments;
        return regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                after = _args4.length > 0 && _args4[0] !== undefined ? _args4[0] : '';
                tag = this.tag;
                _context4.next = 4;
                return (0, _nodeFetch["default"])(_constants["default"].graphql, {
                  method: 'POST',
                  headers: _headers["default"],
                  body: JSON.stringify({
                    query: "\n\t\t\t\t\tquery ExploreTrendingRepls($id: String!, $after: String!) {\n\t\t\t\t\t\ttag(id: $id) {\n\t\t\t\t\t\t\trepls(after: $after) {\n\t\t\t\t\t\t\t\titems {\n\t\t\t\t\t\t\t\t\t".concat(_constants["default"].replAttributes, "\n\t\t\t\t\t\t\t\t}\n\t\t\t\t\t\t\t}\n\t\t\t\t\t\t}\n\t\t\t\t\t}"),
                    variables: JSON.stringify({
                      id: tag,
                      after: after
                    })
                  })
                }).then(function (res) {
                  return res.json();
                });

              case 4:
                info = _context4.sent;

                if (!info.errors) {
                  _context4.next = 7;
                  break;
                }

                throw new Error("Replit GraphQL Error(s): ".concat(JSON.stringify(info.errors)));

              case 7:
                if (info.data.tag.repls.items) {
                  _context4.next = 11;
                  break;
                }

                throw new Error("Cannot fetch explore.");

              case 11:
                return _context4.abrupt("return", info.data.tag.repls.items);

              case 12:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, this);
      }));

      function exploreTagRepls() {
        return _exploreTagRepls.apply(this, arguments);
      }

      return exploreTagRepls;
    }()
  }]);

  return Explore;
}();

exports["default"] = Explore;