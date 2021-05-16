"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CustomRecursiveQuery = exports.CustomDataQuery = void 0;

var _nodeFetch = _interopRequireDefault(require("node-fetch"));

var _headers = _interopRequireDefault(require("../utils/headers.js"));

var _constants = _interopRequireDefault(require("../utils/constants.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/* eslint-disable max-classes-per-file */
var CustomDataQuery = /*#__PURE__*/function () {
  function CustomDataQuery(queryName, customQuery, customVariables) {
    _classCallCheck(this, CustomDataQuery);

    this.queryName = queryName;
    this.customQuery = customQuery;
    this.customVariables = customVariables;
  }

  _createClass(CustomDataQuery, [{
    key: "getData",
    value: function () {
      var _getData = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
        var queryName, customQuery, customVariables, specialQueryVariables, queryVariables, queryVariablesString, i, type, info;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                queryName = this.queryName, customQuery = this.customQuery, customVariables = this.customVariables;
                specialQueryVariables = {
                  since: 'KarmaSince',
                  count: 'Int',
                  id: 'Int',
                  limit: 'Int'
                };
                Object.freeze(specialQueryVariables);
                queryVariables = Object.keys(customVariables);
                queryVariablesString = '';

                for (i = 0; i < queryVariables.length; i += 1) {
                  type = void 0;

                  if (Object.prototype.hasOwnProperty.call(specialQueryVariables, queryVariables[i])) {
                    type = String(specialQueryVariables[queryVariables[i]]);
                  } else {
                    type = String(_typeof(queryVariables[i])).split('');
                    type[0] = type[0].toUpperCase();
                    type = type.join('');
                  }

                  if (i !== queryVariables.length - 1) {
                    queryVariablesString += "$".concat(queryVariables[i], ": ").concat(type, "!, ");
                  } else {
                    queryVariablesString += "$".concat(queryVariables[i], ": ").concat(type, "!");
                  }
                }

                _context.next = 8;
                return (0, _nodeFetch["default"])(_constants["default"].graphql, {
                  method: 'POST',
                  headers: _headers["default"],
                  body: JSON.stringify({
                    query: "\n          query ".concat(queryName, "(").concat(queryVariablesString, ") {\n            ").concat(customQuery, "\n          }"),
                    variables: JSON.stringify(customVariables)
                  })
                }).then(function (res) {
                  return res.json();
                });

              case 8:
                info = _context.sent;

                if (!info.errors) {
                  _context.next = 13;
                  break;
                }

                throw new Error("Custom Data Query ".concat(this.queryName, " returned an error: ").concat(JSON.stringify(info.errors)));

              case 13:
                return _context.abrupt("return", info.data);

              case 14:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function getData() {
        return _getData.apply(this, arguments);
      }

      return getData;
    }()
  }]);

  return CustomDataQuery;
}();

exports.CustomDataQuery = CustomDataQuery;

var CustomRecursiveQuery = /*#__PURE__*/function () {
  function CustomRecursiveQuery(queryName, customQuery, customVariables, treePath, customAfter, customCount) {
    _classCallCheck(this, CustomRecursiveQuery);

    this.queryName = queryName;
    this.customQuery = customQuery;
    this.customVariables = customVariables;
    this.treePath = treePath;
    this.customAfter = customAfter;
    this.customCount = customCount;
  }

  _createClass(CustomRecursiveQuery, [{
    key: "getData",
    value: function () {
      var _getData2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {
        var queryName, customQuery, customVariables, treePath, customAfter, customCount, specialQueryVariables, queryVariables, queryVariablesString, i, type, output, recurse, _recurse;

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
                                query: "\n            query ".concat(queryName, "(").concat(queryVariablesString, ") {\n              ").concat(customQuery, "\n            }"),
                                variables: JSON.stringify(_objectSpread(_objectSpread({}, customVariables), {}, {
                                  after: recurseAfter
                                }))
                              })
                            }).then(function (res) {
                              return res.json();
                            });

                          case 4:
                            info = _context2.sent;

                            if (!info.errors) {
                              _context2.next = 9;
                              break;
                            }

                            throw new Error("Custom Recusive Query ".concat(queryName, " returned an error: ").concat(JSON.stringify(info.errors)));

                          case 9:
                            info.data[customQuery.trim().split('(')[0]][treePath].items.forEach(function (item) {
                              output.push(item);
                            });

                            if (!(output.length !== customCount)) {
                              _context2.next = 13;
                              break;
                            }

                            _context2.next = 13;
                            return recurse(info.data[customQuery.trim().split('(')[0]][treePath].pageInfo.nextCursor);

                          case 13:
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

                queryName = this.queryName, customQuery = this.customQuery, customVariables = this.customVariables, treePath = this.treePath, customAfter = this.customAfter, customCount = this.customCount;
                specialQueryVariables = {
                  since: 'KarmaSince',
                  count: 'Int',
                  id: 'Int',
                  limit: 'Int'
                };
                Object.freeze(specialQueryVariables);
                queryVariables = Object.keys(customVariables);
                queryVariablesString = '';

                for (i = 0; i < queryVariables.length; i += 1) {
                  type = void 0;

                  if (Object.prototype.hasOwnProperty.call(specialQueryVariables, queryVariables[i])) {
                    type = String(specialQueryVariables[queryVariables[i]]);
                  } else {
                    type = String(_typeof(queryVariables[i])).split('');
                    type[0] = type[0].toUpperCase();
                    type = type.join('');
                  }

                  if (i !== queryVariables.length - 1) {
                    queryVariablesString += "$".concat(queryVariables[i], ": ").concat(type, "!, ");
                  } else {
                    queryVariablesString += "$".concat(queryVariables[i], ": ").concat(type, "!");
                  }
                }

                output = [];
                _context3.next = 11;
                return recurse(customAfter);

              case 11:
                return _context3.abrupt("return", output);

              case 12:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      function getData() {
        return _getData2.apply(this, arguments);
      }

      return getData;
    }()
  }]);

  return CustomRecursiveQuery;
}();

exports.CustomRecursiveQuery = CustomRecursiveQuery;