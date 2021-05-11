"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _nodeFetch = _interopRequireDefault(require("node-fetch"));

var _headers = _interopRequireDefault(require("../utils/headers.js"));

var _constants = _interopRequireDefault(require("../utils/constants.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function getReplId(_x, _x2) {
  return _getReplId.apply(this, arguments);
}

function _getReplId() {
  _getReplId = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee15(username, slug) {
    var info;
    return regeneratorRuntime.wrap(function _callee15$(_context15) {
      while (1) {
        switch (_context15.prev = _context15.next) {
          case 0:
            _context15.next = 2;
            return (0, _nodeFetch["default"])("".concat(_constants["default"].restful, "/data/repls/@").concat(username, "/").concat(slug), {
              method: 'GET',
              headers: _headers["default"]
            }).then(function (res) {
              return res.json();
            });

          case 2:
            info = _context15.sent;
            return _context15.abrupt("return", info.id);

          case 4:
          case "end":
            return _context15.stop();
        }
      }
    }, _callee15);
  }));
  return _getReplId.apply(this, arguments);
}

var Repl = /*#__PURE__*/function () {
  function Repl(username, slug) {
    _classCallCheck(this, Repl);

    this.username = username;
    this.slug = slug.replace(/ /g, '-').replace(/\./g, '');
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
                  method: 'POST',
                  headers: _headers["default"],
                  body: JSON.stringify({
                    query: "\n          query Repl($id: String!) {\n            repl(id: $id) {\n              ... on Repl {\n                ".concat(_constants["default"].replAttributes, "\n                tags {\n                \t").concat(_constants["default"].tagAttributes, "\n                }\n              }\n            }\n          }"),
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

                throw new Error("".concat(slug, " is not a repl. Please query repls on Replit."));

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
    key: "replRestfulData",
    value: function () {
      var _replRestfulData = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
        var username, slug, info;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                username = this.username, slug = this.slug;
                _context2.next = 3;
                return (0, _nodeFetch["default"])("".concat(_constants["default"].restful, "/data/repls/@").concat(username, "/").concat(slug), {
                  method: 'GET',
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

                throw new Error("".concat(slug, " is not a repl. Please query repls on Replit."));

              case 8:
                return _context2.abrupt("return", info);

              case 9:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function replRestfulData() {
        return _replRestfulData.apply(this, arguments);
      }

      return replRestfulData;
    }()
  }, {
    key: "replPublicForks",
    value: function () {
      var _replPublicForks = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4() {
        var after,
            count,
            username,
            slug,
            output,
            id,
            recurse,
            _recurse,
            _args4 = arguments;

        return regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                _recurse = function _recurse3() {
                  _recurse = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(recurseAfter) {
                    var info;
                    return regeneratorRuntime.wrap(function _callee3$(_context3) {
                      while (1) {
                        switch (_context3.prev = _context3.next) {
                          case 0:
                            if (!(recurseAfter === null)) {
                              _context3.next = 2;
                              break;
                            }

                            return _context3.abrupt("return");

                          case 2:
                            _context3.next = 4;
                            return (0, _nodeFetch["default"])(_constants["default"].graphql, {
                              method: 'POST',
                              headers: _headers["default"],
                              body: JSON.stringify({
                                query: "\n\t\t\t\t\t\tquery ReplForks($id: String!, $after: String!, $count: Int!) {\n\t\t\t\t\t\t\trepl(id: $id) {\n\t\t\t\t\t\t\t\t... on Repl {\n\t\t\t\t\t\t\t\t\tpublicForks(after: $after, count: $count) {\n\t\t\t\t\t\t\t\t\t\titems {\n\t\t\t\t              ".concat(_constants["default"].replAttributes, "\n\t\t\t\t              tags {\n\t\t\t\t              \t").concat(_constants["default"].tagAttributes, "\n\t\t\t\t              }\n\t\t\t\t\t\t\t\t\t\t}\n\t\t\t\t\t\t\t\t\t\tpageInfo {\n\t\t\t\t\t\t\t\t\t\t\tnextCursor\n\t\t\t\t\t\t\t\t\t\t}\n\t\t\t\t\t\t\t\t\t}\n\t\t\t\t\t\t\t\t}\n\t\t\t\t\t\t\t}\n\t\t\t\t\t\t}"),
                                variables: JSON.stringify({
                                  id: id,
                                  count: count,
                                  after: recurseAfter
                                })
                              })
                            }).then(function (res) {
                              return res.json();
                            });

                          case 4:
                            info = _context3.sent;

                            if (!info.errors) {
                              _context3.next = 7;
                              break;
                            }

                            throw new Error("Replit GraphQL Error(s): ".concat(JSON.stringify(info.errors)));

                          case 7:
                            if (info.data.repl) {
                              _context3.next = 11;
                              break;
                            }

                            throw new Error("".concat(slug, " is not a repl. Please query repls on Replit."));

                          case 11:
                            info.data.repl.publicForks.items.forEach(function (post) {
                              output.push(post);
                            });

                            if (!(output.length !== count)) {
                              _context3.next = 15;
                              break;
                            }

                            _context3.next = 15;
                            return recurse(info.data.repl.publicForks.pageInfo.nextCursor);

                          case 15:
                          case "end":
                            return _context3.stop();
                        }
                      }
                    }, _callee3);
                  }));
                  return _recurse.apply(this, arguments);
                };

                recurse = function _recurse2(_x3) {
                  return _recurse.apply(this, arguments);
                };

                after = _args4.length > 0 && _args4[0] !== undefined ? _args4[0] : '';
                count = _args4.length > 1 && _args4[1] !== undefined ? _args4[1] : 10;
                username = this.username, slug = this.slug;
                output = [];
                _context4.next = 8;
                return getReplId(username, slug);

              case 8:
                id = _context4.sent;
                _context4.next = 11;
                return recurse(after);

              case 11:
                return _context4.abrupt("return", output);

              case 12:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, this);
      }));

      function replPublicForks() {
        return _replPublicForks.apply(this, arguments);
      }

      return replPublicForks;
    }()
  }, {
    key: "replComments",
    value: function () {
      var _replComments = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6() {
        var after,
            count,
            username,
            slug,
            output,
            id,
            recurse,
            _recurse4,
            _args6 = arguments;

        return regeneratorRuntime.wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                _recurse4 = function _recurse6() {
                  _recurse4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(recurseAfter) {
                    var info;
                    return regeneratorRuntime.wrap(function _callee5$(_context5) {
                      while (1) {
                        switch (_context5.prev = _context5.next) {
                          case 0:
                            if (!(recurseAfter === null)) {
                              _context5.next = 2;
                              break;
                            }

                            return _context5.abrupt("return");

                          case 2:
                            _context5.next = 4;
                            return (0, _nodeFetch["default"])(_constants["default"].graphql, {
                              method: 'POST',
                              headers: _headers["default"],
                              body: JSON.stringify({
                                query: "\n\t\t\t\t\t\tquery ReplForks($id: String!, $after: String!, $count: Int!) {\n\t\t\t\t\t\t\trepl(id: $id) {\n\t\t\t\t\t\t\t\t... on Repl {\n\t\t\t\t\t\t\t\t\tcomments(after: $after, count: $count) {\n\t\t\t\t\t\t\t\t\t\titems {\n\t\t\t\t\t\t\t\t\t\t\t".concat(_constants["default"].replCommentAttributes, "\n\t\t\t\t\t\t\t\t\t\t\tuser { ").concat(_constants["default"].userAttributes, " }\n\t\t\t\t\t\t\t\t\t\t\treplies { ").concat(_constants["default"].replCommentAttributes, " }\n\t\t\t\t\t\t\t\t\t\t}\n\t\t\t\t\t\t\t\t\t\tpageInfo {\n\t\t\t\t\t\t\t\t\t\t\tnextCursor\n\t\t\t\t\t\t\t\t\t\t}\n\t\t\t\t\t\t\t\t\t}\n\t\t\t\t\t\t\t\t}\n\t\t\t\t\t\t\t}\n\t\t\t\t\t\t}"),
                                variables: JSON.stringify({
                                  id: id,
                                  count: count,
                                  after: recurseAfter
                                })
                              })
                            }).then(function (res) {
                              return res.json();
                            });

                          case 4:
                            info = _context5.sent;

                            if (!info.errors) {
                              _context5.next = 7;
                              break;
                            }

                            throw new Error("Replit GraphQL Error(s): ".concat(JSON.stringify(info.errors)));

                          case 7:
                            if (info.data.repl) {
                              _context5.next = 11;
                              break;
                            }

                            throw new Error("".concat(slug, " is not a repl. Please query repls on Replit."));

                          case 11:
                            info.data.repl.comments.items.forEach(function (post) {
                              output.push(post);
                            });

                            if (!(output.length !== count)) {
                              _context5.next = 15;
                              break;
                            }

                            _context5.next = 15;
                            return recurse(info.data.repl.comments.pageInfo.nextCursor);

                          case 15:
                          case "end":
                            return _context5.stop();
                        }
                      }
                    }, _callee5);
                  }));
                  return _recurse4.apply(this, arguments);
                };

                recurse = function _recurse5(_x4) {
                  return _recurse4.apply(this, arguments);
                };

                after = _args6.length > 0 && _args6[0] !== undefined ? _args6[0] : '';
                count = _args6.length > 1 && _args6[1] !== undefined ? _args6[1] : 10;
                username = this.username, slug = this.slug;
                output = [];
                _context6.next = 8;
                return getReplId(username, slug);

              case 8:
                id = _context6.sent;
                _context6.next = 11;
                return recurse(after);

              case 11:
                return _context6.abrupt("return", output);

              case 12:
              case "end":
                return _context6.stop();
            }
          }
        }, _callee6, this);
      }));

      function replComments() {
        return _replComments.apply(this, arguments);
      }

      return replComments;
    }()
  }, {
    key: "replLangsAPI",
    value: function () {
      var _replLangsAPI = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee7() {
        var username, slug, info;
        return regeneratorRuntime.wrap(function _callee7$(_context7) {
          while (1) {
            switch (_context7.prev = _context7.next) {
              case 0:
                username = this.username, slug = this.slug;
                _context7.next = 3;
                return (0, _nodeFetch["default"])("https://langsapi.replapiit.repl.co/".concat(username, "/").concat(slug), {
                  method: 'GET',
                  headers: _headers["default"]
                }).then(function (res) {
                  return res.json();
                });

              case 3:
                info = _context7.sent;

                if (!info.error) {
                  _context7.next = 8;
                  break;
                }

                throw new Error("REPLangs Error: ".concat(info.error, "."));

              case 8:
                return _context7.abrupt("return", info);

              case 9:
              case "end":
                return _context7.stop();
            }
          }
        }, _callee7, this);
      }));

      function replLangsAPI() {
        return _replLangsAPI.apply(this, arguments);
      }

      return replLangsAPI;
    }()
  }, {
    key: "replFilesAPI",
    value: function () {
      var _replFilesAPI = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee8(filename, raw) {
        var username, slug, info;
        return regeneratorRuntime.wrap(function _callee8$(_context8) {
          while (1) {
            switch (_context8.prev = _context8.next) {
              case 0:
                username = this.username, slug = this.slug;
                _context8.next = 3;
                return (0, _nodeFetch["default"])("https://filesapi.replapiit.repl.co/".concat(filename ? 'file' : 'files', "/").concat(username, "/").concat(slug).concat(filename ? "?filename=".concat(filename).concat(raw ? '&raw=1' : '') : ''), {
                  method: 'GET',
                  headers: _headers["default"]
                }).then(function (res) {
                  return raw ? res.text() : res.json();
                });

              case 3:
                info = _context8.sent;

                if (!info.error) {
                  _context8.next = 8;
                  break;
                }

                throw new Error("ReplFiles Error: ".concat(info.error, "."));

              case 8:
                return _context8.abrupt("return", info);

              case 9:
              case "end":
                return _context8.stop();
            }
          }
        }, _callee8, this);
      }));

      function replFilesAPI(_x5, _x6) {
        return _replFilesAPI.apply(this, arguments);
      }

      return replFilesAPI;
    }()
  }, {
    key: "replTitleGen",
    value: function () {
      var _replTitleGen = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee9() {
        var info;
        return regeneratorRuntime.wrap(function _callee9$(_context9) {
          while (1) {
            switch (_context9.prev = _context9.next) {
              case 0:
                if (global.cookies) {
                  _context9.next = 4;
                  break;
                }

                throw new Error('ReplAPI.it: Not logged in.');

              case 4:
                _headers["default"]['Set-Cookie'] = global.cookies;
                _context9.next = 7;
                return (0, _nodeFetch["default"])(_constants["default"].graphql, {
                  method: 'POST',
                  headers: _headers["default"],
                  body: JSON.stringify({
                    query: '{ replTitle }'
                  })
                }).then(function (res) {
                  return res.json();
                });

              case 7:
                info = _context9.sent;

                if (!info.errors) {
                  _context9.next = 12;
                  break;
                }

                throw new Error("Replit GraphQL Error(s): ".concat(JSON.stringify(info.errors)));

              case 12:
                return _context9.abrupt("return", info.data.replTitle);

              case 13:
              case "end":
                return _context9.stop();
            }
          }
        }, _callee9);
      }));

      function replTitleGen() {
        return _replTitleGen.apply(this, arguments);
      }

      return replTitleGen;
    }()
  }, {
    key: "createReplComment",
    value: function () {
      var _createReplComment = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee10(body) {
        var username, slug, id, info;
        return regeneratorRuntime.wrap(function _callee10$(_context10) {
          while (1) {
            switch (_context10.prev = _context10.next) {
              case 0:
                username = this.username, slug = this.slug;
                _context10.next = 3;
                return getReplId(username, slug);

              case 3:
                id = _context10.sent;

                if (global.cookies) {
                  _context10.next = 8;
                  break;
                }

                throw new Error('ReplAPI.it: Not logged in.');

              case 8:
                if (!['RayhanADev'].includes(_constants["default"].initVariables.username)) {
                  _context10.next = 22;
                  break;
                }

                if (!(typeof body !== 'string')) {
                  _context10.next = 11;
                  break;
                }

                throw new Error("Body must be of type string. Got type ".concat(_typeof(body), "."));

              case 11:
                _headers["default"]['Set-Cookie'] = global.cookies;
                _context10.next = 14;
                return (0, _nodeFetch["default"])(_constants["default"].graphql, {
                  method: 'POST',
                  headers: _headers["default"],
                  body: JSON.stringify({
                    query: "\n            mutation CreateReplComment($input: CreateReplCommentInput!) {\n              createReplComment(input: $input) {\n\t\t\t\t\t\t\t\t..on ReplComment {\n\t\t\t\t\t\t\t\t\t".concat(_constants["default"].replCommentAttributes, "\n\t\t\t\t\t\t\t\t\tuser { ").concat(_constants["default"].userAttributes, " }\n\t\t\t\t\t\t\t\t\treplies { ").concat(_constants["default"].replCommentAttributes, " }\n\t\t\t\t\t\t\t\t}\n\t\t\t\t\t\t\t}\n\t\t\t\t\t\t}"),
                    variables: JSON.stringify({
                      input: {
                        replId: id,
                        body: body
                      }
                    })
                  })
                }).then(function (res) {
                  return res.json();
                });

              case 14:
                info = _context10.sent;

                if (!info.errors) {
                  _context10.next = 19;
                  break;
                }

                throw new Error("Replit GraphQL Error(s): ".concat(JSON.stringify(info.errors)));

              case 19:
                return _context10.abrupt("return", info.data.createReplComment);

              case 20:
                _context10.next = 23;
                break;

              case 22:
                throw new Error("".concat(_constants["default"].initVariables.username, " is not whitelisted. Please contact @RayhanADev in ReplTalk to talk about getting added to the whitelist."));

              case 23:
              case "end":
                return _context10.stop();
            }
          }
        }, _callee10, this);
      }));

      function createReplComment(_x7) {
        return _createReplComment.apply(this, arguments);
      }

      return createReplComment;
    }()
  }, {
    key: "replyReplComment",
    value: function () {
      var _replyReplComment = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee11(id, body) {
        var info;
        return regeneratorRuntime.wrap(function _callee11$(_context11) {
          while (1) {
            switch (_context11.prev = _context11.next) {
              case 0:
                if (global.cookies) {
                  _context11.next = 4;
                  break;
                }

                throw new Error('ReplAPI.it: Not logged in.');

              case 4:
                if (!['RayhanADev'].includes(_constants["default"].initVariables.username)) {
                  _context11.next = 20;
                  break;
                }

                if (!(typeof id !== 'string')) {
                  _context11.next = 7;
                  break;
                }

                throw new Error("Id must be of type string. Got type ".concat(_typeof(id), "."));

              case 7:
                if (!(typeof body !== 'string')) {
                  _context11.next = 9;
                  break;
                }

                throw new Error("Body must be of type string. Got type ".concat(_typeof(body), "."));

              case 9:
                _headers["default"]['Set-Cookie'] = global.cookies;
                _context11.next = 12;
                return (0, _nodeFetch["default"])(_constants["default"].graphql, {
                  method: 'POST',
                  headers: _headers["default"],
                  body: JSON.stringify({
                    query: "\n            mutation CreateReplCommentReply($input: CreateReplCommentReplyInput!) {\n              createReplCommentReply(input: $input) {\n\t\t\t\t\t\t\t\t..on ReplComment {\n\t\t\t\t\t\t\t\t\t".concat(_constants["default"].replCommentAttributes, "\n\t\t\t\t\t\t\t\t\tuser { ").concat(_constants["default"].userAttributes, " }\n\t\t\t\t\t\t\t\t\treplies { ").concat(_constants["default"].replCommentAttributes, " }\n\t\t\t\t\t\t\t\t}\n\t\t\t\t\t\t\t}\n\t\t\t\t\t\t}"),
                    variables: JSON.stringify({
                      input: {
                        id: id,
                        body: body
                      }
                    })
                  })
                }).then(function (res) {
                  return res.json();
                });

              case 12:
                info = _context11.sent;

                if (!info.errors) {
                  _context11.next = 17;
                  break;
                }

                throw new Error("Replit GraphQL Error(s): ".concat(JSON.stringify(info.errors)));

              case 17:
                return _context11.abrupt("return", info.data.createReplCommentReply);

              case 18:
                _context11.next = 21;
                break;

              case 20:
                throw new Error("".concat(_constants["default"].initVariables.username, " is not whitelisted. Please contact @RayhanADev in ReplTalk to talk about getting added to the whitelist."));

              case 21:
              case "end":
                return _context11.stop();
            }
          }
        }, _callee11);
      }));

      function replyReplComment(_x8, _x9) {
        return _replyReplComment.apply(this, arguments);
      }

      return replyReplComment;
    }()
  }, {
    key: "updateReplComment",
    value: function () {
      var _updateReplComment = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee12(body) {
        var username, slug, id, info;
        return regeneratorRuntime.wrap(function _callee12$(_context12) {
          while (1) {
            switch (_context12.prev = _context12.next) {
              case 0:
                username = this.username, slug = this.slug;
                _context12.next = 3;
                return getReplId(username, slug);

              case 3:
                id = _context12.sent;

                if (global.cookies) {
                  _context12.next = 8;
                  break;
                }

                throw new Error('ReplAPI.it: Not logged in.');

              case 8:
                if (!['RayhanADev'].includes(_constants["default"].initVariables.username)) {
                  _context12.next = 22;
                  break;
                }

                if (!(typeof body !== 'string')) {
                  _context12.next = 11;
                  break;
                }

                throw new Error("Body must be of type string. Got type ".concat(_typeof(body), "."));

              case 11:
                _headers["default"]['Set-Cookie'] = global.cookies;
                _context12.next = 14;
                return (0, _nodeFetch["default"])(_constants["default"].graphql, {
                  method: 'POST',
                  headers: _headers["default"],
                  body: JSON.stringify({
                    query: "\n            mutation UpdateReplComment($input: UpdateReplCommentInput!) {\n              updateReplComment(input: $input) {\n\t\t\t\t\t\t\t\t..on ReplComment {\n\t\t\t\t\t\t\t\t\t".concat(_constants["default"].replCommentAttributes, "\n\t\t\t\t\t\t\t\t\tuser { ").concat(_constants["default"].userAttributes, " }\n\t\t\t\t\t\t\t\t\treplies { ").concat(_constants["default"].replCommentAttributes, " }\n\t\t\t\t\t\t\t\t}\n\t\t\t\t\t\t\t}\n\t\t\t\t\t\t}"),
                    variables: JSON.stringify({
                      input: {
                        id: id,
                        body: body
                      }
                    })
                  })
                }).then(function (res) {
                  return res.json();
                });

              case 14:
                info = _context12.sent;

                if (!info.errors) {
                  _context12.next = 19;
                  break;
                }

                throw new Error("Replit GraphQL Error(s): ".concat(JSON.stringify(info.errors)));

              case 19:
                return _context12.abrupt("return", info.data.updateReplComment);

              case 20:
                _context12.next = 23;
                break;

              case 22:
                throw new Error("".concat(_constants["default"].initVariables.username, " is not whitelisted. Please contact @RayhanADev in ReplTalk to talk about getting added to the whitelist."));

              case 23:
              case "end":
                return _context12.stop();
            }
          }
        }, _callee12, this);
      }));

      function updateReplComment(_x10) {
        return _updateReplComment.apply(this, arguments);
      }

      return updateReplComment;
    }()
  }, {
    key: "deleteReplComment",
    value: function () {
      var _deleteReplComment = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee13() {
        var username, slug, id, info;
        return regeneratorRuntime.wrap(function _callee13$(_context13) {
          while (1) {
            switch (_context13.prev = _context13.next) {
              case 0:
                username = this.username, slug = this.slug;
                _context13.next = 3;
                return getReplId(username, slug);

              case 3:
                id = _context13.sent;

                if (global.cookies) {
                  _context13.next = 8;
                  break;
                }

                throw new Error('ReplAPI.it: Not logged in.');

              case 8:
                if (!['RayhanADev'].includes(_constants["default"].initVariables.username)) {
                  _context13.next = 20;
                  break;
                }

                _headers["default"]['Set-Cookie'] = global.cookies;
                _context13.next = 12;
                return (0, _nodeFetch["default"])(_constants["default"].graphql, {
                  method: 'POST',
                  headers: _headers["default"],
                  body: JSON.stringify({
                    query: "\n            mutation DeleteReplComment($id: String!) {\n              deleteReplComment(id: $id) {\n\t\t\t\t\t\t\t\t..on ReplComment {\n\t\t\t\t\t\t\t\t\tid\n\t\t\t\t\t\t\t\t}\n\t\t\t\t\t\t\t}\n\t\t\t\t\t\t}",
                    variables: JSON.stringify({
                      id: id
                    })
                  })
                }).then(function (res) {
                  return res.json();
                });

              case 12:
                info = _context13.sent;

                if (!info.errors) {
                  _context13.next = 17;
                  break;
                }

                throw new Error("Replit GraphQL Error(s): ".concat(JSON.stringify(info.errors)));

              case 17:
                return _context13.abrupt("return", info.data.deleteReplComment);

              case 18:
                _context13.next = 21;
                break;

              case 20:
                throw new Error("".concat(_constants["default"].initVariables.username, " is not whitelisted. Please contact @RayhanADev in ReplTalk to talk about getting added to the whitelist."));

              case 21:
              case "end":
                return _context13.stop();
            }
          }
        }, _callee13, this);
      }));

      function deleteReplComment() {
        return _deleteReplComment.apply(this, arguments);
      }

      return deleteReplComment;
    }()
  }, {
    key: "recentRepls",
    value: function () {
      var _recentRepls = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee14() {
        var info;
        return regeneratorRuntime.wrap(function _callee14$(_context14) {
          while (1) {
            switch (_context14.prev = _context14.next) {
              case 0:
                _context14.next = 2;
                return (0, _nodeFetch["default"])(_constants["default"].graphql, {
                  method: 'POST',
                  headers: _headers["default"],
                  body: JSON.stringify({
                    query: "\n          query newRepls {\n            newRepls {\n              items {\n                ".concat(_constants["default"].replAttributes, "\n              }\n            }\n          }")
                  })
                }).then(function (res) {
                  return res.json();
                });

              case 2:
                info = _context14.sent;

                if (!info.errors) {
                  _context14.next = 7;
                  break;
                }

                throw new Error("Replit GraphQL Error(s): ".concat(JSON.stringify(info.errors)));

              case 7:
                return _context14.abrupt("return", info.data.newRepls.items);

              case 8:
              case "end":
                return _context14.stop();
            }
          }
        }, _callee14);
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