"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _nodeFetch = _interopRequireDefault(require("node-fetch"));

var _lodash = _interopRequireDefault(require("lodash"));

var _fs = _interopRequireDefault(require("fs"));

var _path = _interopRequireDefault(require("path"));

var _crypto = _interopRequireDefault(require("crypto"));

var _constants = _interopRequireDefault(require("../utils/constants.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function hash(value, salt) {
  var hashItem = _crypto["default"].createHmac('sha512', salt);

  hashItem.update(value);
  var result = hashItem.digest('hex');
  return {
    salt: salt,
    hashedpassword: result
  };
}

function compare(value, hashData) {
  var resultData = hash(value, hashData.salt);

  if (resultData.hashedpassword === hashData.hashedpassword) {
    return true;
  }

  return false;
}

var exportable;

if (_constants["default"].initVariables.experimentalFeatures) {
  exportable = /*#__PURE__*/function () {
    function Database(dbToken) {
      var salt = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
      var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

      _classCallCheck(this, Database);

      if (!process.env.REPL_PUBKEYS && !process.env.REPL_ID) throw new Error('Please run the Database Class on a Replit Project only.');
      this.dbToken = dbToken || process.env.REPLIT_DB_URL;
      this.salt = salt;
      this.options = {
        id: String(dbToken).split('/')[4] || process.env.REPLIT_DB_URL.split('/')[4],
        owner: process.env.REPL_OWNER,
        collaborators: _objectSpread({}, options.collaborators),
        password: _objectSpread({}, hash(String(options.password), String(salt))),
        type: options.type,
        encrypted: options.encrypted || [false],
        'max-items': options['max-items'] || 10
      };
    }

    _createClass(Database, [{
      key: "init",
      value: function () {
        var _init = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(password) {
          var currentDatabase, createDatabaseFlag, info, _info;

          return regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
              switch (_context.prev = _context.next) {
                case 0:
                  _context.next = 2;
                  return (0, _nodeFetch["default"])("".concat(this.dbToken, "/").concat(encodeURIComponent('replapi_database_config')), {
                    method: 'GET'
                  }).then(function (res) {
                    return res.text();
                  });

                case 2:
                  currentDatabase = _context.sent;

                  if (currentDatabase) {
                    _context.next = 24;
                    break;
                  }

                  if (!(this.options.type === 'plus')) {
                    _context.next = 15;
                    break;
                  }

                  if (_fs["default"].existsSync(_path["default"].join(process.cwd(), '.replapirc.json'))) {
                    createDatabaseFlag = JSON.parse(_fs["default"].readFileSync(_path["default"].join(process.cwd(), '.replapirc.json'))).createDatabaseFlag;
                  }

                  if (!createDatabaseFlag) {
                    _context.next = 12;
                    break;
                  }

                  _context.next = 9;
                  return (0, _nodeFetch["default"])("".concat(this.dbToken), {
                    method: 'POST',
                    headers: {
                      'Content-Type': 'application/x-www-form-urlencoded'
                    },
                    body: "".concat(encodeURIComponent('replapi_database_config'), "=").concat(encodeURIComponent(JSON.stringify(_objectSpread({}, this.options))))
                  });

                case 9:
                  info = _context.sent;
                  _context.next = 13;
                  break;

                case 12:
                  throw new Error('Are you sure you want to use these options to configure a Database? You will not be able to change these options in the future. If you are, then in your .replapirc.json file set a "createDatabaseFlag" key to "true". For more information, read the documentation.');

                case 13:
                  _context.next = 22;
                  break;

                case 15:
                  if (!(this.options.type === 'repldb')) {
                    _context.next = 21;
                    break;
                  }

                  _context.next = 18;
                  return (0, _nodeFetch["default"])("".concat(this.dbToken), {
                    method: 'POST',
                    headers: {
                      'Content-Type': 'application/x-www-form-urlencoded'
                    },
                    body: "".concat(encodeURIComponent('replapi_database_config'), "=").concat(encodeURIComponent(JSON.stringify(_objectSpread({}, this.options))))
                  });

                case 18:
                  _info = _context.sent;
                  _context.next = 22;
                  break;

                case 21:
                  throw new Error('Invalid Database Type. For a normal database, use the "repldb" option.');

                case 22:
                  _context.next = 26;
                  break;

                case 24:
                  if (compare(password, JSON.parse(currentDatabase).password)) {
                    _context.next = 26;
                    break;
                  }

                  throw new Error('Incorrect Password. Database access denied.');

                case 26:
                case "end":
                  return _context.stop();
              }
            }
          }, _callee, this);
        }));

        function init(_x) {
          return _init.apply(this, arguments);
        }

        return init;
      }()
    }, {
      key: "createCollection",
      value: function () {
        var _createCollection = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(collectionName) {
          var info;
          return regeneratorRuntime.wrap(function _callee2$(_context2) {
            while (1) {
              switch (_context2.prev = _context2.next) {
                case 0:
                  _context2.next = 2;
                  return (0, _nodeFetch["default"])("".concat(this.dbToken), {
                    method: 'POST',
                    headers: {
                      'Content-Type': 'application/x-www-form-urlencoded'
                    },
                    body: "".concat(encodeURIComponent(collectionName), "=").concat(encodeURIComponent(JSON.stringify({})))
                  });

                case 2:
                  info = _context2.sent;

                case 3:
                case "end":
                  return _context2.stop();
              }
            }
          }, _callee2, this);
        }));

        function createCollection(_x2) {
          return _createCollection.apply(this, arguments);
        }

        return createCollection;
      }()
    }, {
      key: "createDoc",
      value: function () {
        var _createDoc = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(collectionName, docName, docItems) {
          var collection, info;
          return regeneratorRuntime.wrap(function _callee3$(_context3) {
            while (1) {
              switch (_context3.prev = _context3.next) {
                case 0:
                  _context3.next = 2;
                  return this.getCollection(collectionName);

                case 2:
                  collection = _context3.sent;
                  collection[docName] = _objectSpread({}, docItems);
                  _context3.next = 6;
                  return (0, _nodeFetch["default"])("".concat(this.dbToken), {
                    method: 'POST',
                    headers: {
                      'Content-Type': 'application/x-www-form-urlencoded'
                    },
                    body: "".concat(encodeURIComponent(collectionName), "=").concat(encodeURIComponent(JSON.stringify(collection)))
                  });

                case 6:
                  info = _context3.sent;

                case 7:
                case "end":
                  return _context3.stop();
              }
            }
          }, _callee3, this);
        }));

        function createDoc(_x3, _x4, _x5) {
          return _createDoc.apply(this, arguments);
        }

        return createDoc;
      }()
    }, {
      key: "getDatabaseKeys",
      value: function () {
        var _getDatabaseKeys = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4() {
          var info, keys;
          return regeneratorRuntime.wrap(function _callee4$(_context4) {
            while (1) {
              switch (_context4.prev = _context4.next) {
                case 0:
                  _context4.next = 2;
                  return (0, _nodeFetch["default"])("".concat(this.dbToken, "?encode=true&prefix=").concat(encodeURIComponent('')), {
                    method: 'GET'
                  }).then(function (res) {
                    return res.text();
                  });

                case 2:
                  info = _context4.sent;
                  keys = info.split('\n').map(decodeURIComponent);

                  if (keys.indexOf('replapi_database_config') > -1) {
                    keys.splice(keys.indexOf('replapi_database_config'), 1);
                  }

                  return _context4.abrupt("return", keys);

                case 6:
                case "end":
                  return _context4.stop();
              }
            }
          }, _callee4, this);
        }));

        function getDatabaseKeys() {
          return _getDatabaseKeys.apply(this, arguments);
        }

        return getDatabaseKeys;
      }()
    }, {
      key: "getCollection",
      value: function () {
        var _getCollection = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(collectionName) {
          var info;
          return regeneratorRuntime.wrap(function _callee5$(_context5) {
            while (1) {
              switch (_context5.prev = _context5.next) {
                case 0:
                  _context5.next = 2;
                  return (0, _nodeFetch["default"])("".concat(this.dbToken, "/").concat(collectionName), {
                    method: 'GET'
                  }).then(function (res) {
                    return res.json();
                  });

                case 2:
                  info = _context5.sent;
                  return _context5.abrupt("return", info);

                case 4:
                case "end":
                  return _context5.stop();
              }
            }
          }, _callee5, this);
        }));

        function getCollection(_x6) {
          return _getCollection.apply(this, arguments);
        }

        return getCollection;
      }()
    }, {
      key: "getDoc",
      value: function () {
        var _getDoc = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6(collectionName, docName) {
          var info;
          return regeneratorRuntime.wrap(function _callee6$(_context6) {
            while (1) {
              switch (_context6.prev = _context6.next) {
                case 0:
                  _context6.next = 2;
                  return (0, _nodeFetch["default"])("".concat(this.dbToken, "/").concat(collectionName), {
                    method: 'GET'
                  }).then(function (res) {
                    return res.json();
                  });

                case 2:
                  info = _context6.sent;
                  return _context6.abrupt("return", info[docName]);

                case 4:
                case "end":
                  return _context6.stop();
              }
            }
          }, _callee6, this);
        }));

        function getDoc(_x7, _x8) {
          return _getDoc.apply(this, arguments);
        }

        return getDoc;
      }()
    }, {
      key: "updateDoc",
      value: function () {
        var _updateDoc = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee7(collectionName, docName, docItems) {
          var collection, info;
          return regeneratorRuntime.wrap(function _callee7$(_context7) {
            while (1) {
              switch (_context7.prev = _context7.next) {
                case 0:
                  _context7.next = 2;
                  return this.getCollection(collectionName);

                case 2:
                  collection = _context7.sent;

                  _lodash["default"].assignIn(collection[docName], docItems);

                  _context7.next = 6;
                  return (0, _nodeFetch["default"])("".concat(this.dbToken), {
                    method: 'POST',
                    headers: {
                      'Content-Type': 'application/x-www-form-urlencoded'
                    },
                    body: "".concat(encodeURIComponent(collectionName), "=").concat(encodeURIComponent(JSON.stringify(collection)))
                  });

                case 6:
                  info = _context7.sent;

                case 7:
                case "end":
                  return _context7.stop();
              }
            }
          }, _callee7, this);
        }));

        function updateDoc(_x9, _x10, _x11) {
          return _updateDoc.apply(this, arguments);
        }

        return updateDoc;
      }()
    }, {
      key: "deleteCollection",
      value: function () {
        var _deleteCollection = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee8(collectionName) {
          var info;
          return regeneratorRuntime.wrap(function _callee8$(_context8) {
            while (1) {
              switch (_context8.prev = _context8.next) {
                case 0:
                  _context8.next = 2;
                  return (0, _nodeFetch["default"])("".concat(this.dbToken, "/").concat(collectionName), {
                    method: 'DELETE'
                  });

                case 2:
                  info = _context8.sent;

                case 3:
                case "end":
                  return _context8.stop();
              }
            }
          }, _callee8, this);
        }));

        function deleteCollection(_x12) {
          return _deleteCollection.apply(this, arguments);
        }

        return deleteCollection;
      }()
    }, {
      key: "deleteDoc",
      value: function () {
        var _deleteDoc = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee9(collectionName, docName) {
          var collection, info;
          return regeneratorRuntime.wrap(function _callee9$(_context9) {
            while (1) {
              switch (_context9.prev = _context9.next) {
                case 0:
                  _context9.next = 2;
                  return this.getCollection(collectionName);

                case 2:
                  collection = _context9.sent;

                  _lodash["default"].unset(collection, docName);

                  _context9.next = 6;
                  return (0, _nodeFetch["default"])("".concat(this.dbToken), {
                    method: 'POST',
                    headers: {
                      'Content-Type': 'application/x-www-form-urlencoded'
                    },
                    body: "".concat(encodeURIComponent(collectionName), "=").concat(encodeURIComponent(JSON.stringify(collection)))
                  });

                case 6:
                  info = _context9.sent;

                case 7:
                case "end":
                  return _context9.stop();
              }
            }
          }, _callee9, this);
        }));

        function deleteDoc(_x13, _x14) {
          return _deleteDoc.apply(this, arguments);
        }

        return deleteDoc;
      }()
    }, {
      key: "deleteDocField",
      value: function () {
        var _deleteDocField = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee10(collectionName, docName, path) {
          var collection, info;
          return regeneratorRuntime.wrap(function _callee10$(_context10) {
            while (1) {
              switch (_context10.prev = _context10.next) {
                case 0:
                  _context10.next = 2;
                  return this.getCollection(collectionName);

                case 2:
                  collection = _context10.sent;

                  _lodash["default"].unset(collection[docName], path);

                  _context10.next = 6;
                  return (0, _nodeFetch["default"])("".concat(this.dbToken), {
                    method: 'POST',
                    headers: {
                      'Content-Type': 'application/x-www-form-urlencoded'
                    },
                    body: "".concat(encodeURIComponent(collectionName), "=").concat(encodeURIComponent(JSON.stringify(collection)))
                  });

                case 6:
                  info = _context10.sent;

                case 7:
                case "end":
                  return _context10.stop();
              }
            }
          }, _callee10, this);
        }));

        function deleteDocField(_x15, _x16, _x17) {
          return _deleteDocField.apply(this, arguments);
        }

        return deleteDocField;
      }()
    }]);

    return Database;
  }();
} else {
  exportable = function noExperimentalFeatures() {
    console.log('Experimental Features are not enabled. To learn more about experimental features please visit the documentation.');
  };
}

var _default = exportable;
exports["default"] = _default;