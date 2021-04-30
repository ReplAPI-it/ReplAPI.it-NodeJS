"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _nodeFetch = _interopRequireDefault(require("node-fetch"));

var _headers = _interopRequireDefault(require("../utils/headers.js"));

var _constants = _interopRequireDefault(require("../utils/constants.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function getReplId(_x, _x2) {
  return _getReplId.apply(this, arguments);
}

function _getReplId() {
  _getReplId = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6(username, slug) {
    var info;
    return regeneratorRuntime.wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            _context6.next = 2;
            return _constants["default"].fetch("".concat(_constants["default"].restful, "/data/repls/@").concat(username, "/").concat(slug), {
              method: "GET",
              headers: _headers["default"]
            }).then(function (res) {
              return res.json();
            });

          case 2:
            info = _context6.sent;
            return _context6.abrupt("return", info.id);

          case 4:
          case "end":
            return _context6.stop();
        }
      }
    }, _callee6);
  }));
  return _getReplId.apply(this, arguments);
}

var Repl = /*#__PURE__*/function () {
  function Repl(username, slug) {
    _classCallCheck(this, Repl);

    this.username = username;
    if (this.slug) this.slug = slug.replace(/ /g, "-");
  }

  _createClass(Repl, [{
    key: "replGraphQLData",
    value: function () {
      var _replGraphQLData = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
        var username, slug, id, info;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                username = this.username, slug = this.slug;
                _context.next = 3;
                return getReplId(username, slug);

              case 3:
                id = _context.sent;
                _context.next = 6;
                return (0, _nodeFetch["default"])(_constants["default"].graphql, {
                  method: "POST",
                  headers: _headers["default"],
                  body: JSON.stringify({
                    query: "\n          query Repl($id: String!) {\n            repl(id: $id) {\n              ... on Repl {\n                ".concat(_constants["default"].replAttributes, "\n              }\n            }\n          }"),
                    variables: JSON.stringify({
                      id: id
                    })
                  })
                }).then(function (res) {
                  return res.json();
                });

              case 6:
                info = _context.sent;

                if (!info.errors) {
                  _context.next = 9;
                  break;
                }

                throw new Error("Replit GraphQL Error(s): ".concat(JSON.stringify(info.errors)));

              case 9:
                if (info.data.repl) {
                  _context.next = 13;
                  break;
                }

                throw new Error("".concat(slug, " is not a repl. Please query repls on Repl.it."));

              case 13:
                return _context.abrupt("return", info.data.repl);

              case 14:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function replGraphQLData() {
        return _replGraphQLData.apply(this, arguments);
      }

      return replGraphQLData;
    }()
  }, {
    key: "replRESTData",
    value: function () {
      var _replRESTData = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
        var username, slug, info;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                username = this.username, slug = this.slug;
                _context2.next = 3;
                return (0, _nodeFetch["default"])("".concat(_constants["default"].restful, "/data/repls/@").concat(username, "/").concat(slug), {
                  method: "GET",
                  headers: _headers["default"]
                }).then(function (res) {
                  return res.json();
                });

              case 3:
                info = _context2.sent;

                if (info) {
                  _context2.next = 8;
                  break;
                }

                throw new Error("".concat(slug, " is not a repl. Please query repls on Repl.it."));

              case 8:
                return _context2.abrupt("return", info);

              case 9:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function replRESTData() {
        return _replRESTData.apply(this, arguments);
      }

      return replRESTData;
    }()
  }, {
    key: "replLangs",
    value: function () {
      var _replLangs = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {
        var username, slug, info;
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                username = this.username, slug = this.slug;
                _context3.next = 3;
                return (0, _nodeFetch["default"])("https://replangs.rayhanadev.repl.co/".concat(username, "/").concat(slug), {
                  method: "GET",
                  headers: _headers["default"]
                }).then(function (res) {
                  return res.json();
                });

              case 3:
                info = _context3.sent;

                if (!info.error) {
                  _context3.next = 8;
                  break;
                }

                throw new Error("REPLangs Error: ".concat(info.error, "."));

              case 8:
                return _context3.abrupt("return", info);

              case 9:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      function replLangs() {
        return _replLangs.apply(this, arguments);
      }

      return replLangs;
    }()
  }, {
    key: "replTitleGen",
    value: function () {
      var _replTitleGen = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4() {
        var info;
        return regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                if (global.cookies) {
                  _context4.next = 4;
                  break;
                }

                throw new Error("ReplAPI.it: Not logged in.");

              case 4:
                _headers["default"]["Set-Cookie"] = global.cookies;
                _context4.next = 7;
                return (0, _nodeFetch["default"])(_constants["default"].graphql, {
                  method: "POST",
                  headers: _headers["default"],
                  body: JSON.stringify({
                    query: "{ replTitle }"
                  })
                }).then(function (res) {
                  return res.json();
                });

              case 7:
                info = _context4.sent;

                if (!info.errors) {
                  _context4.next = 12;
                  break;
                }

                throw new Error("Replit GraphQL Error(s): ".concat(JSON.stringify(info.errors)));

              case 12:
                return _context4.abrupt("return", info.data.replTitle);

              case 13:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4);
      }));

      function replTitleGen() {
        return _replTitleGen.apply(this, arguments);
      }

      return replTitleGen;
    }()
  }, {
    key: "recentRepls",
    value: function () {
      var _recentRepls = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5() {
        var info;
        return regeneratorRuntime.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                _context5.next = 2;
                return (0, _nodeFetch["default"])(_constants["default"].graphql, {
                  method: "POST",
                  headers: _headers["default"],
                  body: JSON.stringify({
                    query: "\n          query newRepls {\n            newRepls {\n              items {\n                ".concat(_constants["default"].replAttributes, "\n              }\n            }\n          }")
                  })
                }).then(function (res) {
                  return res.json();
                });

              case 2:
                info = _context5.sent;

                if (!info.errors) {
                  _context5.next = 7;
                  break;
                }

                throw new Error("Replit GraphQL Error(s): ".concat(JSON.stringify(info.errors)));

              case 7:
                return _context5.abrupt("return", info.data.newRepls.items);

              case 8:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5);
      }));

      function recentRepls() {
        return _recentRepls.apply(this, arguments);
      }

      return recentRepls;
    }()
  }]);

  return Repl;
}();

exports["default"] = Repl;