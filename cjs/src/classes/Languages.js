"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _nodeHtmlParser = _interopRequireDefault(require("node-html-parser"));

var _nodeFetch = _interopRequireDefault(require("node-fetch"));

var _atob = _interopRequireDefault(require("atob"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function fetchVariable() {
  return _fetchVariable.apply(this, arguments);
}

function _fetchVariable() {
  _fetchVariable = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {
    var html, root;
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.next = 2;
            return (0, _nodeFetch["default"])('https://staging.replit.com/', {
              method: 'GET',
              headers: {
                'X-Requested-With': 'ReplAPI.it',
                Referrer: 'https://staging.replit.com/'
              }
            }).then(function (res) {
              return res.text();
            });

          case 2:
            html = _context3.sent;
            root = _nodeHtmlParser["default"].parse(html, {
              lowerCaseTagName: false,
              comment: false,
              blockTextElements: {
                script: true,
                noscript: true,
                style: true,
                pre: true
              }
            });
            return _context3.abrupt("return", JSON.parse((0, _atob["default"])(root.childNodes[1].childNodes[0].childNodes[1].childNodes[0].rawText.split("'")[1].split("'")[0])));

          case 5:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));
  return _fetchVariable.apply(this, arguments);
}

var Languages = /*#__PURE__*/function () {
  function Languages(lang) {
    _classCallCheck(this, Languages);

    this.lang = lang;
  }

  _createClass(Languages, [{
    key: "langData",
    value: function () {
      var _langData = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
        var langs;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return fetchVariable();

              case 2:
                langs = _context.sent;
                return _context.abrupt("return", langs[this.lang]);

              case 4:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function langData() {
        return _langData.apply(this, arguments);
      }

      return langData;
    }()
  }, {
    key: "langDataAll",
    value: function () {
      var _langDataAll = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
        var langs;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.next = 2;
                return fetchVariable();

              case 2:
                langs = _context2.sent;
                return _context2.abrupt("return", langs);

              case 4:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2);
      }));

      function langDataAll() {
        return _langDataAll.apply(this, arguments);
      }

      return langDataAll;
    }()
  }]);

  return Languages;
}();

exports["default"] = Languages;