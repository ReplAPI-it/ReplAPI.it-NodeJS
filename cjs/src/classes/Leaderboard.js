"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _nodeFetch = _interopRequireDefault(require("node-fetch"));

var _headers = _interopRequireDefault(require("../utils/headers.js"));

var _constants = _interopRequireDefault(require("../utils/constants.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Leaderboard = /*#__PURE__*/function () {
  function Leaderboard() {
    _classCallCheck(this, Leaderboard);
  }

  _createClass(Leaderboard, [{
    key: "leaderboardData",
    value: function () {
      var _leaderboardData = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
        var after,
            count,
            since,
            query,
            variables,
            output,
            recurse,
            _recurse,
            _args2 = arguments;

        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _recurse = function _recurse3() {
                  _recurse = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(recurseAfter) {
                    var info;
                    return regeneratorRuntime.wrap(function _callee$(_context) {
                      while (1) {
                        switch (_context.prev = _context.next) {
                          case 0:
                            if (!(recurseAfter === null)) {
                              _context.next = 2;
                              break;
                            }

                            return _context.abrupt("return");

                          case 2:
                            _context.next = 4;
                            return (0, _nodeFetch["default"])(_constants["default"].graphql, {
                              method: 'POST',
                              headers: _headers["default"],
                              body: JSON.stringify({
                                query: query,
                                variables: JSON.stringify(_objectSpread(_objectSpread({}, variables), {}, {
                                  after: recurseAfter
                                }))
                              })
                            }).then(function (res) {
                              return res.json();
                            });

                          case 4:
                            info = _context.sent;

                            if (info.data.leaderboard) {
                              _context.next = 9;
                              break;
                            }

                            throw new Error('Cannot fetch leaderboard');

                          case 9:
                            info.data.leaderboard.items.forEach(function (user) {
                              output.push(user);
                            });

                            if (!(output.length !== count)) {
                              _context.next = 13;
                              break;
                            }

                            _context.next = 13;
                            return recurse(info.data.leaderboard.pageInfo.nextCursor);

                          case 13:
                          case "end":
                            return _context.stop();
                        }
                      }
                    }, _callee);
                  }));
                  return _recurse.apply(this, arguments);
                };

                recurse = function _recurse2(_x) {
                  return _recurse.apply(this, arguments);
                };

                after = _args2.length > 0 && _args2[0] !== undefined ? _args2[0] : '';
                count = _args2.length > 1 && _args2[1] !== undefined ? _args2[1] : 10;
                since = _args2.length > 2 ? _args2[2] : undefined;
                query = '';
                variables = {};

                if (since) {
                  query = "\n        query Leaderboard($after: String!, $count: Int!, $since: KarmaSince!) {\n          leaderboard(after: $after, count: $count, since: $since) {\n            items { ".concat(_constants["default"].userAttributes, " }\n            pageInfo {\n              nextCursor\n            }\n          }\n        }");
                  variables = {
                    count: count,
                    since: since
                  };
                } else {
                  query = "\n        query Leaderboard($after: String!, $count: Int!) {\n          leaderboard(after: $after, count: $count) {\n            items { ".concat(_constants["default"].userAttributes, " }\n            pageInfo {\n              nextCursor\n            }\n          }\n        }");
                  variables = {
                    count: count
                  };
                }

                output = [];
                _context2.next = 11;
                return recurse(after);

              case 11:
                return _context2.abrupt("return", output);

              case 12:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2);
      }));

      function leaderboardData() {
        return _leaderboardData.apply(this, arguments);
      }

      return leaderboardData;
    }()
  }]);

  return Leaderboard;
}();

exports["default"] = Leaderboard;