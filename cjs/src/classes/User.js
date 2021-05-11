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

var User = /*#__PURE__*/function () {
  function User(username) {
    _classCallCheck(this, User);

    this.username = username;
  }

  _createClass(User, [{
    key: "userGraphQLDataAbridged",
    value: function () {
      var _userGraphQLDataAbridged = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
        var user, info;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                user = this.username;
                _context.next = 3;
                return (0, _nodeFetch["default"])(_constants["default"].graphql, {
                  method: 'POST',
                  headers: _headers["default"],
                  body: JSON.stringify({
                    query: "\n          query User($user: String!) {\n            userByUsername(username: $user) {\n              ".concat(_constants["default"].userAttributes, "\n            }\n          }"),
                    variables: JSON.stringify({
                      user: user
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
                if (info.data.userByUsername) {
                  _context.next = 10;
                  break;
                }

                throw new Error("".concat(user, " is not a user. Please query users on Replit."));

              case 10:
                return _context.abrupt("return", info.data.userByUsername);

              case 11:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function userGraphQLDataAbridged() {
        return _userGraphQLDataAbridged.apply(this, arguments);
      }

      return userGraphQLDataAbridged;
    }()
  }, {
    key: "userGraphQLDataFull",
    value: function () {
      var _userGraphQLDataFull = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
        var user, info;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                user = this.username;
                _context2.next = 3;
                return (0, _nodeFetch["default"])(_constants["default"].graphql, {
                  method: 'POST',
                  headers: _headers["default"],
                  body: JSON.stringify({
                    query: "\n          query User($user: String!) {\n            userByUsername(username: $user) {\n              ".concat(_constants["default"].userAttributes, "\n              roles { ").concat(_constants["default"].roleAttributes, " }\n              organization { ").concat(_constants["default"].organizationAttributes, " }\n              languages { ").concat(_constants["default"].languageAttributes, " }\n            }\n          }"),
                    variables: JSON.stringify({
                      user: user
                    })
                  })
                }).then(function (res) {
                  return res.json();
                });

              case 3:
                info = _context2.sent;

                if (!info.errors) {
                  _context2.next = 6;
                  break;
                }

                throw new Error("Replit GraphQL Error(s): ".concat(JSON.stringify(info.errors)));

              case 6:
                if (info.data.userByUsername) {
                  _context2.next = 10;
                  break;
                }

                throw new Error("".concat(user, " is not a user. Please query users on Replit."));

              case 10:
                return _context2.abrupt("return", info.data.userByUsername);

              case 11:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function userGraphQLDataFull() {
        return _userGraphQLDataFull.apply(this, arguments);
      }

      return userGraphQLDataFull;
    }()
  }, {
    key: "userRestfulData",
    value: function () {
      var _userRestfulData = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {
        var username, info;
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                username = this.username;
                _context3.next = 3;
                return (0, _nodeFetch["default"])("".concat(_constants["default"].restful, "/data/profiles/").concat(username), {
                  method: 'GET',
                  headers: _headers["default"]
                }).then(function (res) {
                  return res.json();
                });

              case 3:
                info = _context3.sent;

                if (info) {
                  _context3.next = 8;
                  break;
                }

                throw new Error("".concat(username, " is not a user. Please query users on Replit."));

              case 8:
                return _context3.abrupt("return", info);

              case 9:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      function userRestfulData() {
        return _userRestfulData.apply(this, arguments);
      }

      return userRestfulData;
    }()
  }, {
    key: "postsDataAbridged",
    value: function () {
      var _postsDataAbridged = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5() {
        var after,
            count,
            order,
            user,
            output,
            recurse,
            _recurse,
            _args5 = arguments;

        return regeneratorRuntime.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                _recurse = function _recurse3() {
                  _recurse = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(recurseAfter) {
                    var info;
                    return regeneratorRuntime.wrap(function _callee4$(_context4) {
                      while (1) {
                        switch (_context4.prev = _context4.next) {
                          case 0:
                            if (!(recurseAfter === null)) {
                              _context4.next = 2;
                              break;
                            }

                            return _context4.abrupt("return");

                          case 2:
                            _context4.next = 4;
                            return (0, _nodeFetch["default"])(_constants["default"].graphql, {
                              method: 'POST',
                              headers: _headers["default"],
                              body: JSON.stringify({
                                query: "\n            query UserPost($user: String!, $after: String!, $count: Int!, $order: String!) {\n              userByUsername(username: $user) {\n                posts(count: $count, after: $after, order: $order) {\n                  items { \n                    id\n                    title\n                    preview(length: ".concat(_constants["default"].initVariables.markdown.length || 150, ", removeMarkdown: ").concat(_constants["default"].initVariables.markdown.removeMarkdown || true, ")\n                  }\n                  pageInfo {\n                    nextCursor\n                  }\n                }\n              }\n            }"),
                                variables: JSON.stringify({
                                  user: user,
                                  count: count,
                                  order: order,
                                  after: recurseAfter
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
                            if (info.data.userByUsername) {
                              _context4.next = 11;
                              break;
                            }

                            throw new Error("".concat(user, " is not a user. Please query users on Replit."));

                          case 11:
                            info.data.userByUsername.posts.items.forEach(function (post) {
                              output.push(post);
                            });

                            if (!(output.length !== count)) {
                              _context4.next = 15;
                              break;
                            }

                            _context4.next = 15;
                            return recurse(info.data.userByUsername.posts.pageInfo.nextCursor);

                          case 15:
                          case "end":
                            return _context4.stop();
                        }
                      }
                    }, _callee4);
                  }));
                  return _recurse.apply(this, arguments);
                };

                recurse = function _recurse2(_x) {
                  return _recurse.apply(this, arguments);
                };

                after = _args5.length > 0 && _args5[0] !== undefined ? _args5[0] : '';
                count = _args5.length > 1 && _args5[1] !== undefined ? _args5[1] : 10;
                order = _args5.length > 2 && _args5[2] !== undefined ? _args5[2] : '';
                user = this.username;
                output = [];
                _context5.next = 9;
                return recurse(after);

              case 9:
                return _context5.abrupt("return", output);

              case 10:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5, this);
      }));

      function postsDataAbridged() {
        return _postsDataAbridged.apply(this, arguments);
      }

      return postsDataAbridged;
    }()
  }, {
    key: "postsDataFull",
    value: function () {
      var _postsDataFull = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee7() {
        var after,
            count,
            order,
            user,
            output,
            recurse,
            _recurse4,
            _args7 = arguments;

        return regeneratorRuntime.wrap(function _callee7$(_context7) {
          while (1) {
            switch (_context7.prev = _context7.next) {
              case 0:
                _recurse4 = function _recurse6() {
                  _recurse4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6(recurseAfter) {
                    var info;
                    return regeneratorRuntime.wrap(function _callee6$(_context6) {
                      while (1) {
                        switch (_context6.prev = _context6.next) {
                          case 0:
                            if (!(recurseAfter === null)) {
                              _context6.next = 2;
                              break;
                            }

                            return _context6.abrupt("return");

                          case 2:
                            _context6.next = 4;
                            return (0, _nodeFetch["default"])(_constants["default"].graphql, {
                              method: 'POST',
                              headers: _headers["default"],
                              body: JSON.stringify({
                                query: "\n              query UserPost($user: String!, $after: String!, $count: Int!, $order: String!) {\n                userByUsername(username: $user) {\n                  posts(count: $count, after: $after, order: $order) {\n                    items { \n                      ".concat(_constants["default"].postAttributes, "\n                      user { ").concat(_constants["default"].userAttributes, " }\n                      board { ").concat(_constants["default"].boardAttributes, " }\n                      repl { ").concat(_constants["default"].replAttributes, " }\n                      comments(count: ").concat(_constants["default"].initVariables.previewCount.comments || 10, ") { items { ").concat(_constants["default"].commentAttributes, " } }\n                      votes { items { id, user { ").concat(_constants["default"].userAttributes, " } } }\n                      answeredBy { ").concat(_constants["default"].userAttributes, " }\n                      answer { ").concat(_constants["default"].commentAttributes, " }\n                    }\n                    pageInfo {\n                      nextCursor\n                    }\n                  }\n                }\n              }"),
                                variables: JSON.stringify({
                                  user: user,
                                  count: count,
                                  order: order,
                                  after: recurseAfter
                                })
                              })
                            }).then(function (res) {
                              return res.json();
                            });

                          case 4:
                            info = _context6.sent;

                            if (!info.errors) {
                              _context6.next = 7;
                              break;
                            }

                            throw new Error("Replit GraphQL Error(s): ".concat(JSON.stringify(info.errors)));

                          case 7:
                            if (info.data.userByUsername) {
                              _context6.next = 11;
                              break;
                            }

                            throw new Error("".concat(user, " is not a user. Please query users on Replit."));

                          case 11:
                            info.data.userByUsername.posts.items.forEach(function (post) {
                              output.push(post);
                            });

                            if (!(output.length !== count)) {
                              _context6.next = 15;
                              break;
                            }

                            _context6.next = 15;
                            return recurse(info.data.userByUsername.posts.pageInfo.nextCursor);

                          case 15:
                          case "end":
                            return _context6.stop();
                        }
                      }
                    }, _callee6);
                  }));
                  return _recurse4.apply(this, arguments);
                };

                recurse = function _recurse5(_x2) {
                  return _recurse4.apply(this, arguments);
                };

                after = _args7.length > 0 && _args7[0] !== undefined ? _args7[0] : '';
                count = _args7.length > 1 && _args7[1] !== undefined ? _args7[1] : 10;
                order = _args7.length > 2 && _args7[2] !== undefined ? _args7[2] : '';
                user = this.username;
                output = [];
                _context7.next = 9;
                return recurse(after);

              case 9:
                return _context7.abrupt("return", output);

              case 10:
              case "end":
                return _context7.stop();
            }
          }
        }, _callee7, this);
      }));

      function postsDataFull() {
        return _postsDataFull.apply(this, arguments);
      }

      return postsDataFull;
    }()
  }, {
    key: "commentsDataAbridged",
    value: function () {
      var _commentsDataAbridged = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee9() {
        var after,
            count,
            order,
            user,
            output,
            recurse,
            _recurse7,
            _args9 = arguments;

        return regeneratorRuntime.wrap(function _callee9$(_context9) {
          while (1) {
            switch (_context9.prev = _context9.next) {
              case 0:
                _recurse7 = function _recurse9() {
                  _recurse7 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee8(recurseAfter) {
                    var info;
                    return regeneratorRuntime.wrap(function _callee8$(_context8) {
                      while (1) {
                        switch (_context8.prev = _context8.next) {
                          case 0:
                            if (!(recurseAfter === null)) {
                              _context8.next = 2;
                              break;
                            }

                            return _context8.abrupt("return");

                          case 2:
                            _context8.next = 4;
                            return (0, _nodeFetch["default"])(_constants["default"].graphql, {
                              method: 'POST',
                              headers: _headers["default"],
                              body: JSON.stringify({
                                query: "\n            query UserComment($user: String!, $after: String!, $count: Int!, $order: String!) {\n              userByUsername(username: $user) {\n                comments(count: $count, after: $after, order: $order) {\n                  items {\n                    id\n                    preview(length: ".concat(_constants["default"].initVariables.markdown.length || 150, ", removeMarkdown: ").concat(_constants["default"].initVariables.markdown.removeMarkdown || true, ")\n                  }\n                  pageInfo {\n                    nextCursor\n                  }\n                }\n              }\n            }"),
                                variables: JSON.stringify({
                                  user: user,
                                  count: count,
                                  order: order,
                                  after: recurseAfter
                                })
                              })
                            }).then(function (res) {
                              return res.json();
                            });

                          case 4:
                            info = _context8.sent;

                            if (!info.errors) {
                              _context8.next = 7;
                              break;
                            }

                            throw new Error("Replit GraphQL Error(s): ".concat(JSON.stringify(info.errors)));

                          case 7:
                            if (info.data.userByUsername) {
                              _context8.next = 11;
                              break;
                            }

                            throw new Error("".concat(user, " is not a user. Please query users on Replit."));

                          case 11:
                            info.data.userByUsername.comments.items.forEach(function (comment) {
                              output.push(comment);
                            });

                            if (!(output.length !== count)) {
                              _context8.next = 15;
                              break;
                            }

                            _context8.next = 15;
                            return recurse(info.data.userByUsername.comments.pageInfo.nextCursor);

                          case 15:
                          case "end":
                            return _context8.stop();
                        }
                      }
                    }, _callee8);
                  }));
                  return _recurse7.apply(this, arguments);
                };

                recurse = function _recurse8(_x3) {
                  return _recurse7.apply(this, arguments);
                };

                after = _args9.length > 0 && _args9[0] !== undefined ? _args9[0] : '';
                count = _args9.length > 1 && _args9[1] !== undefined ? _args9[1] : 20;
                order = _args9.length > 2 && _args9[2] !== undefined ? _args9[2] : '';
                user = this.username;
                output = [];
                _context9.next = 9;
                return recurse(after);

              case 9:
                return _context9.abrupt("return", output);

              case 10:
              case "end":
                return _context9.stop();
            }
          }
        }, _callee9, this);
      }));

      function commentsDataAbridged() {
        return _commentsDataAbridged.apply(this, arguments);
      }

      return commentsDataAbridged;
    }()
  }, {
    key: "commentsDataFull",
    value: function () {
      var _commentsDataFull = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee11() {
        var after,
            count,
            order,
            user,
            output,
            recurse,
            _recurse10,
            _args11 = arguments;

        return regeneratorRuntime.wrap(function _callee11$(_context11) {
          while (1) {
            switch (_context11.prev = _context11.next) {
              case 0:
                _recurse10 = function _recurse12() {
                  _recurse10 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee10(recurseAfter) {
                    var info;
                    return regeneratorRuntime.wrap(function _callee10$(_context10) {
                      while (1) {
                        switch (_context10.prev = _context10.next) {
                          case 0:
                            if (!(recurseAfter === null)) {
                              _context10.next = 2;
                              break;
                            }

                            return _context10.abrupt("return");

                          case 2:
                            _context10.next = 4;
                            return (0, _nodeFetch["default"])(_constants["default"].graphql, {
                              method: 'POST',
                              headers: _headers["default"],
                              body: JSON.stringify({
                                query: "\n            query UserComment($user: String!, $after: String!, $count: Int!, $order: String!) {\n              userByUsername(username: $user) {\n                comments(count: $count, after: $after, order: $order) {\n                  items {\n                    ".concat(_constants["default"].commentAttributes, "\n                    parentComment { ").concat(_constants["default"].commentAttributes, " }\n                    comments { ").concat(_constants["default"].commentAttributes, " }\n                    user { ").concat(_constants["default"].userAttributes, " }\n                    post {\n                      ").concat(_constants["default"].postAttributes, "\n                      user { ").concat(_constants["default"].userAttributes, " }\n                      board { ").concat(_constants["default"].boardAttributes, " }\n                      repl { ").concat(_constants["default"].replAttributes, " }\n                      comments(count: ").concat(_constants["default"].initVariables.previewCount.comments || 10, ") { items { ").concat(_constants["default"].commentAttributes, " } }\n                      votes { items { id, user { ").concat(_constants["default"].userAttributes, " } } }\n                      answeredBy { ").concat(_constants["default"].userAttributes, " }\n                      answer { ").concat(_constants["default"].commentAttributes, " }\n                    }\n                  }\n                  pageInfo {\n                    nextCursor\n                  }\n                }\n              }\n            }"),
                                variables: JSON.stringify({
                                  user: user,
                                  count: count,
                                  order: order,
                                  after: recurseAfter
                                })
                              })
                            }).then(function (res) {
                              return res.json();
                            });

                          case 4:
                            info = _context10.sent;

                            if (!info.errors) {
                              _context10.next = 7;
                              break;
                            }

                            throw new Error("Replit GraphQL Error(s): ".concat(JSON.stringify(info.errors)));

                          case 7:
                            if (info.data.userByUsername) {
                              _context10.next = 11;
                              break;
                            }

                            throw new Error("".concat(user, " is not a user. Please query users on Replit."));

                          case 11:
                            info.data.userByUsername.comments.items.forEach(function (comment) {
                              output.push(comment);
                            });

                            if (!(output.length !== count)) {
                              _context10.next = 15;
                              break;
                            }

                            _context10.next = 15;
                            return recurse(info.data.userByUsername.comments.pageInfo.nextCursor);

                          case 15:
                          case "end":
                            return _context10.stop();
                        }
                      }
                    }, _callee10);
                  }));
                  return _recurse10.apply(this, arguments);
                };

                recurse = function _recurse11(_x4) {
                  return _recurse10.apply(this, arguments);
                };

                after = _args11.length > 0 && _args11[0] !== undefined ? _args11[0] : '';
                count = _args11.length > 1 && _args11[1] !== undefined ? _args11[1] : 20;
                order = _args11.length > 2 && _args11[2] !== undefined ? _args11[2] : '';
                user = this.username;
                output = [];
                _context11.next = 9;
                return recurse(after);

              case 9:
                return _context11.abrupt("return", output);

              case 10:
              case "end":
                return _context11.stop();
            }
          }
        }, _callee11, this);
      }));

      function commentsDataFull() {
        return _commentsDataFull.apply(this, arguments);
      }

      return commentsDataFull;
    }()
  }, {
    key: "userSearch",
    value: function () {
      var _userSearch = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee12(query) {
        var limit,
            info,
            _args12 = arguments;
        return regeneratorRuntime.wrap(function _callee12$(_context12) {
          while (1) {
            switch (_context12.prev = _context12.next) {
              case 0:
                limit = _args12.length > 1 && _args12[1] !== undefined ? _args12[1] : '';

                if (global.cookies) {
                  _context12.next = 5;
                  break;
                }

                throw new Error('ReplAPI.it: Not logged in.');

              case 5:
                if (!['RayhanADev'].includes(_constants["default"].initVariables.username)) {
                  _context12.next = 19;
                  break;
                }

                if (query) {
                  _context12.next = 8;
                  break;
                }

                throw new Error('User Search needs a query to search. Please supply a query.');

              case 8:
                _headers["default"]['Set-Cookie'] = global.cookies;
                _context12.next = 11;
                return (0, _nodeFetch["default"])(_constants["default"].graphql, {
                  method: 'POST',
                  headers: _headers["default"],
                  body: JSON.stringify({
                    query: "\n            query UserSearch($query: String!, $limit: Int!) {\n              usernameSearch(query: $query, limit: $limit) {\n                id\n                username\n              }\n            }",
                    variables: JSON.stringify({
                      query: query,
                      limit: limit
                    })
                  })
                }).then(function (res) {
                  return res.json();
                });

              case 11:
                info = _context12.sent;

                if (!info.errors) {
                  _context12.next = 16;
                  break;
                }

                throw new Error("Replit GraphQL Error(s): ".concat(JSON.stringify(info.errors)));

              case 16:
                return _context12.abrupt("return", info.data.usernameSearch);

              case 17:
                _context12.next = 20;
                break;

              case 19:
                throw new Error("".concat(_constants["default"].initVariables.username, " is not whitelisted. Please contact @RayhanADev in ReplTalk to talk about getting added to the whitelist."));

              case 20:
              case "end":
                return _context12.stop();
            }
          }
        }, _callee12);
      }));

      function userSearch(_x5) {
        return _userSearch.apply(this, arguments);
      }

      return userSearch;
    }()
  }]);

  return User;
}();

exports["default"] = User;