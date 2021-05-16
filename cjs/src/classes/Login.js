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

function getCookies(_x, _x2) {
  return _getCookies.apply(this, arguments);
}

function _getCookies() {
  _getCookies = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(username, password) {
    var info;
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            if (!['RayhanADev'].includes(global.initVariables.username)) {
              _context3.next = 11;
              break;
            }

            _context3.next = 3;
            return (0, _nodeFetch["default"])(_constants["default"].login, {
              method: 'POST',
              headers: _headers["default"],
              body: JSON.stringify({
                username: username,
                password: password,
                captcha: global.initVariables.captcha.token,
                hCaptchaSiteKey: '7f7c5b9f-8cff-49f3-ab09-5666dca1104b'
              })
            }).then(function (res) {
              return res.headers.raw()['set-cookie'][1];
            });

          case 3:
            info = _context3.sent;

            if (info) {
              _context3.next = 8;
              break;
            }

            throw new Error("Couldn't fetch cookie data.");

          case 8:
            return _context3.abrupt("return", info);

          case 9:
            _context3.next = 12;
            break;

          case 11:
            throw new Error("".concat(global.initVariables.username, " is not whitelisted. Please contact @RayhanADev in ReplTalk to talk about getting added to the whitelist."));

          case 12:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));
  return _getCookies.apply(this, arguments);
}

var Login = /*#__PURE__*/function () {
  function Login() {
    _classCallCheck(this, Login);
  }

  _createClass(Login, [{
    key: "withCredentials",
    value: function () {
      var _withCredentials = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(password) {
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                if (!['RayhanADev'].includes(global.initVariables.username)) {
                  _context.next = 6;
                  break;
                }

                _context.next = 3;
                return getCookies(global.initVariables.username, password);

              case 3:
                global.cookies = _context.sent;
                _context.next = 7;
                break;

              case 6:
                throw new Error("".concat(global.initVariables.username, " is not whitelisted. Please contact @RayhanADev in ReplTalk to talk about getting added to the whitelist."));

              case 7:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }));

      function withCredentials(_x3) {
        return _withCredentials.apply(this, arguments);
      }

      return withCredentials;
    }()
  }, {
    key: "withSID",
    value: function () {
      var _withSID = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(sid) {
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                if (!['RayhanADev'].includes(global.initVariables.username)) {
                  _context2.next = 4;
                  break;
                }

                global.cookies = sid;
                _context2.next = 5;
                break;

              case 4:
                throw new Error("".concat(global.initVariables.username, " is not whitelisted. Please contact @RayhanADev in ReplTalk to talk about getting added to the whitelist."));

              case 5:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2);
      }));

      function withSID(_x4) {
        return _withSID.apply(this, arguments);
      }

      return withSID;
    }()
  }]);

  return Login;
}();

exports["default"] = Login;