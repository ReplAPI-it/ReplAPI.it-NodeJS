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

var Board = /*#__PURE__*/function () {
  function Board(slug) {
    _classCallCheck(this, Board);

    this.slug = slug;
  }

  _createClass(Board, [{
    key: "boardData",
    value: function () {
      var _boardData = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
        var slug, info;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                slug = this.slug;
                _context.next = 3;
                return (0, _nodeFetch["default"])(_constants["default"].graphql, {
                  method: 'POST',
                  headers: _headers["default"],
                  body: JSON.stringify({
                    query: "\n          query Board($slug: String!) {\n            boardBySlug(slug: $slug) {\n              ".concat(_constants["default"].boardAttributes, "\n            }\n          }"),
                    variables: JSON.stringify({
                      slug: slug
                    })
                  })
                }).then(function (res) {
                  return res.json();
                });

              case 3:
                info = _context.sent;

                if (!info.errors) {
                  _context.next = 6;
                  break;
                }

                throw new Error("Replit GraphQL Error(s): ".concat(JSON.stringify(info.errors)));

              case 6:
                if (info.data.boardBySlug) {
                  _context.next = 10;
                  break;
                }

                throw new Error("".concat(slug, " is not a board. Please query boards on Replit."));

              case 10:
                return _context.abrupt("return", info.data.boardBySlug);

              case 11:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function boardData() {
        return _boardData.apply(this, arguments);
      }

      return boardData;
    }()
  }, {
    key: "boardPosts",
    value: function () {
      var _boardPosts = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {
        var after,
            count,
            order,
            slug,
            output,
            recurse,
            _recurse,
            _args3 = arguments;

        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _recurse = function _recurse3() {
                  _recurse = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(recurseAfter) {
                    var info;
                    return regeneratorRuntime.wrap(function _callee2$(_context2) {
                      while (1) {
                        switch (_context2.prev = _context2.next) {
                          case 0:
                            if (!(recurseAfter === null)) {
                              _context2.next = 2;
                              break;
                            }

                            return _context2.abrupt("return");

                          case 2:
                            _context2.next = 4;
                            return (0, _nodeFetch["default"])(_constants["default"].graphql, {
                              method: 'POST',
                              headers: _headers["default"],
                              body: JSON.stringify({
                                query: "\n            query BoardPosts($slug: String!, $after: String!, $count: Int!, $order: String!) {\n              boardBySlug(slug: $slug) {\n                posts(count: $count, after: $after, order: $order) {\n                  items { \n                    id\n                    title\n                    preview(length: ".concat(global.initVariables.markdown.length || 150, ", removeMarkdown: ").concat(global.initVariables.markdown.removeMarkdown || true, ")\n                  }\n                  pageInfo {\n                    nextCursor\n                  }\n                }\n              }\n            }"),
                                variables: JSON.stringify({
                                  slug: slug,
                                  count: count,
                                  order: order,
                                  after: recurseAfter
                                })
                              })
                            }).then(function (res) {
                              return res.json();
                            });

                          case 4:
                            info = _context2.sent;

                            if (!info.errors) {
                              _context2.next = 7;
                              break;
                            }

                            throw new Error("Replit GraphQL Error(s): ".concat(JSON.stringify(info.errors)));

                          case 7:
                            if (info.data.boardBySlug) {
                              _context2.next = 11;
                              break;
                            }

                            throw new Error("".concat(slug, " is not a board. Please query boards on Replit."));

                          case 11:
                            info.data.boardBySlug.posts.items.forEach(function (post) {
                              output.push(post);
                            });

                            if (!(output.length !== count)) {
                              _context2.next = 15;
                              break;
                            }

                            _context2.next = 15;
                            return recurse(info.data.boardBySlug.posts.pageInfo.nextCursor);

                          case 15:
                          case "end":
                            return _context2.stop();
                        }
                      }
                    }, _callee2);
                  }));
                  return _recurse.apply(this, arguments);
                };

                recurse = function _recurse2(_x) {
                  return _recurse.apply(this, arguments);
                };

                after = _args3.length > 0 && _args3[0] !== undefined ? _args3[0] : '';
                count = _args3.length > 1 && _args3[1] !== undefined ? _args3[1] : 5;
                order = _args3.length > 2 && _args3[2] !== undefined ? _args3[2] : '';
                slug = this.slug;
                output = [];
                _context3.next = 9;
                return recurse(after);

              case 9:
                return _context3.abrupt("return", output);

              case 10:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      function boardPosts() {
        return _boardPosts.apply(this, arguments);
      }

      return boardPosts;
    }()
  }]);

  return Board;
}();

exports["default"] = Board;