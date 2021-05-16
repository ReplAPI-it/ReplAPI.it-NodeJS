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

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Post = /*#__PURE__*/function () {
  function Post(id) {
    _classCallCheck(this, Post);

    this.id = id;
  }

  _createClass(Post, [{
    key: "postDataAbridged",
    value: function () {
      var _postDataAbridged = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
        var id, info;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                id = this.id;

                if (!(typeof id !== 'number')) {
                  _context.next = 3;
                  break;
                }

                throw new Error("".concat(id, " is not a post. Please query posts on Replit."));

              case 3:
                _context.next = 5;
                return (0, _nodeFetch["default"])(_constants["default"].graphql, {
                  method: 'POST',
                  headers: _headers["default"],
                  body: JSON.stringify({
                    query: "\n          query Post($id: Int!) {\n            post(id: $id) {\n              id\n              title\n              preview(length: ".concat(_constants["default"].initVariables.markdown.length || 150, ", removeMarkdown: ").concat(_constants["default"].initVariables.markdown.removeMarkdown || true, ")\n            }\n          }"),
                    variables: JSON.stringify({
                      id: id
                    })
                  })
                }).then(function (res) {
                  return res.json();
                });

              case 5:
                info = _context.sent;

                if (!info.errors) {
                  _context.next = 8;
                  break;
                }

                throw new Error("Replit GraphQL Error(s): ".concat(JSON.stringify(info.errors)));

              case 8:
                if (info.data.post) {
                  _context.next = 12;
                  break;
                }

                throw new Error("".concat(id, " is not a post. Please query posts on Replit."));

              case 12:
                return _context.abrupt("return", info.data.post);

              case 13:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function postDataAbridged() {
        return _postDataAbridged.apply(this, arguments);
      }

      return postDataAbridged;
    }()
  }, {
    key: "postDataFull",
    value: function () {
      var _postDataFull = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
        var id, info;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                id = this.id;

                if (!(typeof id !== 'number')) {
                  _context2.next = 3;
                  break;
                }

                throw new Error("".concat(id, " is not a post. Please query posts on Replit."));

              case 3:
                _context2.next = 5;
                return (0, _nodeFetch["default"])(_constants["default"].graphql, {
                  method: 'POST',
                  headers: _headers["default"],
                  body: JSON.stringify({
                    query: "\n          query Post($id: Int!) {\n            post(id: $id) {\n              ".concat(_constants["default"].postAttributes, "\n              user { ").concat(_constants["default"].userAttributes, " }\n              board { ").concat(_constants["default"].boardAttributes, " }\n              repl { ").concat(_constants["default"].replAttributes, " }\n              comments(count: ").concat(_constants["default"].initVariables.previewCount.comments || 10, ") { items { ").concat(_constants["default"].commentAttributes, " } }\n              votes { items { id user { ").concat(_constants["default"].userAttributes, " } } }\n              answeredBy { ").concat(_constants["default"].userAttributes, " }\n              answer { ").concat(_constants["default"].commentAttributes, " }\n            }\n          }"),
                    variables: JSON.stringify({
                      id: id
                    })
                  })
                }).then(function (res) {
                  return res.json();
                });

              case 5:
                info = _context2.sent;

                if (!info.errors) {
                  _context2.next = 8;
                  break;
                }

                throw new Error("Replit GraphQL Error(s): ".concat(JSON.stringify(info.errors)));

              case 8:
                if (info.data.post) {
                  _context2.next = 12;
                  break;
                }

                throw new Error("".concat(id, " is not a post. Please query posts on Replit."));

              case 12:
                return _context2.abrupt("return", info.data.post);

              case 13:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function postDataFull() {
        return _postDataFull.apply(this, arguments);
      }

      return postDataFull;
    }()
  }, {
    key: "recentComments",
    value: function () {
      var _recentComments = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {
        var id, info;
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                id = this.id;

                if (!(typeof id !== 'number')) {
                  _context3.next = 3;
                  break;
                }

                throw new Error("".concat(id, " is not a post. Please query posts on Replit."));

              case 3:
                _context3.next = 5;
                return (0, _nodeFetch["default"])(_constants["default"].graphql, {
                  method: 'POST',
                  headers: _headers["default"],
                  body: JSON.stringify({
                    query: "\n          query PostRecentComments($id: Int!) {\n            post(id: $id) {\n              recentComments {\n                ".concat(_constants["default"].commentAttributes, "\n                parentComment { ").concat(_constants["default"].commentAttributes, " }\n                comments { ").concat(_constants["default"].commentAttributes, " }\n                user { ").concat(_constants["default"].userAttributes, " }\n                post { \n                  ").concat(_constants["default"].postAttributes, "\n                  user { ").concat(_constants["default"].userAttributes, " }\n                  board { ").concat(_constants["default"].boardAttributes, " }\n                  repl { ").concat(_constants["default"].replAttributes, " }\n                  comments(count: ").concat(_constants["default"].initVariables.previewCount.comments || 10, ") { items { ").concat(_constants["default"].commentAttributes, " } }\n                  votes { items { id user { ").concat(_constants["default"].userAttributes, " } } }\n                  answeredBy { ").concat(_constants["default"].userAttributes, " }\n                  answer { ").concat(_constants["default"].commentAttributes, " }\n                }\n              }\n            }\n          }"),
                    variables: JSON.stringify({
                      id: id
                    })
                  })
                }).then(function (res) {
                  return res.json();
                });

              case 5:
                info = _context3.sent;

                if (!info.errors) {
                  _context3.next = 8;
                  break;
                }

                throw new Error("Replit GraphQL Error(s): ".concat(JSON.stringify(info.errors)));

              case 8:
                if (info.data.post) {
                  _context3.next = 12;
                  break;
                }

                throw new Error("".concat(id, " is not a post. Please query posts on Replit."));

              case 12:
                return _context3.abrupt("return", info.data.post.recentComments);

              case 13:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      function recentComments() {
        return _recentComments.apply(this, arguments);
      }

      return recentComments;
    }()
  }, {
    key: "createPost",
    value: function () {
      var _createPost = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(title, body, boardId, replId, showHosted) {
        var info;
        return regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                if (global.cookies) {
                  _context4.next = 4;
                  break;
                }

                throw new Error('ReplAPI.it: Not logged in.');

              case 4:
                if (!['RayhanADev'].includes(_constants["default"].initVariables.username)) {
                  _context4.next = 26;
                  break;
                }

                if (!(typeof title !== 'string')) {
                  _context4.next = 7;
                  break;
                }

                throw new Error("Title must be of type string. Got type ".concat(_typeof(title), "."));

              case 7:
                if (!(typeof body !== 'string')) {
                  _context4.next = 9;
                  break;
                }

                throw new Error("Body must be of type string. Got type ".concat(_typeof(body), "."));

              case 9:
                if (!(typeof boardId !== 'number')) {
                  _context4.next = 11;
                  break;
                }

                throw new Error("Board ID must be of type number. Got type ".concat(_typeof(boardId), "."));

              case 11:
                if (!(typeof replId !== 'string')) {
                  _context4.next = 13;
                  break;
                }

                throw new Error("Repl ID must be of type string. Got type ".concat(_typeof(replId), "."));

              case 13:
                if (!(typeof showHosted !== 'string')) {
                  _context4.next = 15;
                  break;
                }

                throw new Error("Show Hosted must be of type boolean. Got type ".concat(_typeof(showHosted), "."));

              case 15:
                _headers["default"]['Set-Cookie'] = global.cookies;
                _context4.next = 18;
                return (0, _nodeFetch["default"])(_constants["default"].graphql, {
                  method: 'POST',
                  headers: _headers["default"],
                  body: JSON.stringify({
                    query: "\n            mutation CreatePost($input: CreatePostInput!) {\n              createPost(input: $input) {\n                post {\n                  id\n                  title\n                  preview(length: ".concat(_constants["default"].initVariables.markdown.length || 150, ", removeMarkdown: ").concat(_constants["default"].initVariables.markdown.removeMarkdown || true, ")\n                }\n              }\n            }"),
                    variables: JSON.stringify({
                      input: {
                        title: title,
                        body: body,
                        boardId: boardId,
                        replId: replId,
                        showHosted: showHosted
                      }
                    })
                  })
                }).then(function (res) {
                  return res.json();
                });

              case 18:
                info = _context4.sent;

                if (!info.errors) {
                  _context4.next = 23;
                  break;
                }

                throw new Error("Replit GraphQL Error(s): ".concat(JSON.stringify(info.errors)));

              case 23:
                return _context4.abrupt("return", info.data.createPost.post);

              case 24:
                _context4.next = 27;
                break;

              case 26:
                throw new Error("".concat(_constants["default"].initVariables.username, " is not whitelisted. Please contact @RayhanADev in ReplTalk to talk about getting added to the whitelist."));

              case 27:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4);
      }));

      function createPost(_x, _x2, _x3, _x4, _x5) {
        return _createPost.apply(this, arguments);
      }

      return createPost;
    }()
  }, {
    key: "updatePost",
    value: function () {
      var _updatePost = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(title, body, isPinned, postType, isLocked, boardId, replId, showHosted) {
        var info;
        return regeneratorRuntime.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                if (global.cookies) {
                  _context5.next = 4;
                  break;
                }

                throw new Error('ReplAPI.it: Not logged in.');

              case 4:
                if (!['RayhanADev'].includes(_constants["default"].initVariables.username)) {
                  _context5.next = 32;
                  break;
                }

                if (!(typeof title !== 'string' || typeof title !== 'undefined')) {
                  _context5.next = 7;
                  break;
                }

                throw new Error("Title must be of type string. Got type ".concat(_typeof(title), "."));

              case 7:
                if (!(typeof body !== 'string' || typeof body !== 'undefined')) {
                  _context5.next = 9;
                  break;
                }

                throw new Error("Body must be of type string. Got type ".concat(_typeof(body), "."));

              case 9:
                if (!(typeof isPinned !== 'boolean' || typeof isPinned !== 'undefined')) {
                  _context5.next = 11;
                  break;
                }

                throw new Error("isPinned must be of type boolean. Got type ".concat(_typeof(isPinned), "."));

              case 11:
                if (!(typeof postType !== 'string' || typeof postType !== 'undefined')) {
                  _context5.next = 13;
                  break;
                }

                throw new Error("Post Type must be of type string. Got type ".concat(_typeof(postType), "."));

              case 13:
                if (!(typeof isLocked !== 'boolean' || typeof isLocked !== 'undefined')) {
                  _context5.next = 15;
                  break;
                }

                throw new Error("isLocked must be of type boolean. Got type ".concat(_typeof(isPinned), "."));

              case 15:
                if (!(typeof boardId !== 'number' || typeof boardId !== 'undefined')) {
                  _context5.next = 17;
                  break;
                }

                throw new Error("Board ID must be of type number. Got type ".concat(_typeof(boardId), "."));

              case 17:
                if (!(typeof replId !== 'string' || typeof replId !== 'undefined')) {
                  _context5.next = 19;
                  break;
                }

                throw new Error("Repl ID must be of type string. Got type ".concat(_typeof(replId), "."));

              case 19:
                if (!(typeof showHosted !== 'string' || typeof showHosted !== 'undefined')) {
                  _context5.next = 21;
                  break;
                }

                throw new Error("Show Hosted must be of type boolean. Got type ".concat(_typeof(showHosted), "."));

              case 21:
                _headers["default"]['Set-Cookie'] = global.cookies;
                _context5.next = 24;
                return (0, _nodeFetch["default"])(_constants["default"].graphql, {
                  method: 'POST',
                  headers: _headers["default"],
                  body: JSON.stringify({
                    query: "\n            mutation UpdatePost($input: UpdatePostInput!) {\n              updatePost(input: $input) {\n                post {\n                  id\n                  title\n                  preview(length: ".concat(_constants["default"].initVariables.markdown.length || 150, ", removeMarkdown: ").concat(_constants["default"].initVariables.markdown.removeMarkdown || true, ")\n                }\n              }\n            }"),
                    variables: JSON.stringify({
                      input: {
                        title: title,
                        body: body,
                        isPinned: isPinned,
                        postType: postType,
                        isLocked: isLocked,
                        boardId: boardId,
                        replId: replId,
                        showHosted: showHosted
                      }
                    })
                  })
                }).then(function (res) {
                  return res.json();
                });

              case 24:
                info = _context5.sent;

                if (!info.errors) {
                  _context5.next = 29;
                  break;
                }

                throw new Error("Replit GraphQL Error(s): ".concat(JSON.stringify(info.errors)));

              case 29:
                return _context5.abrupt("return", info.data.updatePost.post);

              case 30:
                _context5.next = 33;
                break;

              case 32:
                throw new Error("".concat(_constants["default"].initVariables.username, " is not whitelisted. Please contact @RayhanADev in ReplTalk to talk about getting added to the whitelist."));

              case 33:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5);
      }));

      function updatePost(_x6, _x7, _x8, _x9, _x10, _x11, _x12, _x13) {
        return _updatePost.apply(this, arguments);
      }

      return updatePost;
    }()
  }, {
    key: "deletePost",
    value: function () {
      var _deletePost = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6(id) {
        var info;
        return regeneratorRuntime.wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                if (global.cookies) {
                  _context6.next = 4;
                  break;
                }

                throw new Error('ReplAPI.it: Not logged in.');

              case 4:
                if (!['RayhanADev'].includes(_constants["default"].initVariables.username)) {
                  _context6.next = 18;
                  break;
                }

                if (!(typeof id !== 'number')) {
                  _context6.next = 7;
                  break;
                }

                throw new Error("Id must be of type number. Got type ".concat(_typeof(id), "."));

              case 7:
                _headers["default"]['Set-Cookie'] = global.cookies;
                _context6.next = 10;
                return (0, _nodeFetch["default"])(_constants["default"].graphql, {
                  method: 'POST',
                  headers: _headers["default"],
                  body: JSON.stringify({
                    query: "\n            mutation CreatePost($id: Int!) {\n              deletePost(id: $id) {\n                id\n                title\n                preview(length: ".concat(_constants["default"].initVariables.markdown.length || 150, ", removeMarkdown: ").concat(global.initVariables.markdown.removeMarkdown || true, ")\n              }\n            }"),
                    variables: JSON.stringify({
                      id: id
                    })
                  })
                }).then(function (res) {
                  return res.json();
                });

              case 10:
                info = _context6.sent;

                if (!info.errors) {
                  _context6.next = 15;
                  break;
                }

                throw new Error("Replit GraphQL Error(s): ".concat(JSON.stringify(info.errors)));

              case 15:
                return _context6.abrupt("return", info.data.post);

              case 16:
                _context6.next = 19;
                break;

              case 18:
                throw new Error("".concat(_constants["default"].initVariables.username, " is not whitelisted. Please contact @RayhanADev in ReplTalk to talk about getting added to the whitelist."));

              case 19:
              case "end":
                return _context6.stop();
            }
          }
        }, _callee6);
      }));

      function deletePost(_x14) {
        return _deletePost.apply(this, arguments);
      }

      return deletePost;
    }()
  }, {
    key: "createPostVote",
    value: function () {
      var _createPostVote = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee7(id) {
        var info;
        return regeneratorRuntime.wrap(function _callee7$(_context7) {
          while (1) {
            switch (_context7.prev = _context7.next) {
              case 0:
                if (global.cookies) {
                  _context7.next = 4;
                  break;
                }

                throw new Error('ReplAPI.it: Not logged in.');

              case 4:
                if (!['RayhanADev'].includes(_constants["default"].initVariables.username)) {
                  _context7.next = 18;
                  break;
                }

                if (!(typeof id !== 'number')) {
                  _context7.next = 7;
                  break;
                }

                throw new Error("Id must be of type number. Got type ".concat(_typeof(id), "."));

              case 7:
                _headers["default"]['Set-Cookie'] = global.cookies;
                _context7.next = 10;
                return (0, _nodeFetch["default"])(_constants["default"].graphql, {
                  method: 'POST',
                  headers: _headers["default"],
                  body: JSON.stringify({
                    query: "\n            mutation CreatePostVote($id: Int!) {\n              createPostVote(id: $id) {\n                id\n                user { username }\n                  post {\n                    id\n                    title\n                    preview(length: ".concat(_constants["default"].initVariables.markdown.length || 150, ", removeMarkdown: ").concat(global.initVariables.markdown.removeMarkdown || true, ")\n                  }\n              }\n            }"),
                    variables: JSON.stringify({
                      id: id
                    })
                  })
                }).then(function (res) {
                  return res.json();
                });

              case 10:
                info = _context7.sent;

                if (!info.errors) {
                  _context7.next = 15;
                  break;
                }

                throw new Error("Replit GraphQL Error(s): ".concat(JSON.stringify(info.errors)));

              case 15:
                return _context7.abrupt("return", info.data.createPostVote);

              case 16:
                _context7.next = 19;
                break;

              case 18:
                throw new Error("".concat(_constants["default"].initVariables.username, " is not whitelisted. Please contact @RayhanADev in ReplTalk to talk about getting added to the whitelist."));

              case 19:
              case "end":
                return _context7.stop();
            }
          }
        }, _callee7);
      }));

      function createPostVote(_x15) {
        return _createPostVote.apply(this, arguments);
      }

      return createPostVote;
    }()
  }, {
    key: "deletePostVote",
    value: function () {
      var _deletePostVote = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee8(id) {
        var info;
        return regeneratorRuntime.wrap(function _callee8$(_context8) {
          while (1) {
            switch (_context8.prev = _context8.next) {
              case 0:
                if (global.cookies) {
                  _context8.next = 4;
                  break;
                }

                throw new Error('ReplAPI.it: Not logged in.');

              case 4:
                if (!['RayhanADev'].includes(_constants["default"].initVariables.username)) {
                  _context8.next = 18;
                  break;
                }

                if (!(typeof id !== 'number')) {
                  _context8.next = 7;
                  break;
                }

                throw new Error("Id must be of type number. Got type ".concat(_typeof(id), "."));

              case 7:
                _headers["default"]['Set-Cookie'] = global.cookies;
                _context8.next = 10;
                return (0, _nodeFetch["default"])(_constants["default"].graphql, {
                  method: 'POST',
                  headers: _headers["default"],
                  body: JSON.stringify({
                    query: "\n            mutation DeletePostVote($id: Int!) {\n              deletePostVote(id: $id) {\n                id\n                user { username }\n                post {\n                  id\n                  title\n                  preview(length: ".concat(_constants["default"].initVariables.markdown.length || 150, ", removeMarkdown: ").concat(_constants["default"].initVariables.markdown.removeMarkdown || true, ")\n                }\n              }\n            }"),
                    variables: JSON.stringify({
                      id: id
                    })
                  })
                }).then(function (res) {
                  return res.json();
                });

              case 10:
                info = _context8.sent;

                if (!info.errors) {
                  _context8.next = 15;
                  break;
                }

                throw new Error("Replit GraphQL Error(s): ".concat(JSON.stringify(info.errors)));

              case 15:
                return _context8.abrupt("return", info.data.createPostVote);

              case 16:
                _context8.next = 19;
                break;

              case 18:
                throw new Error("".concat(_constants["default"].initVariables.username, " is not whitelisted. Please contact @RayhanADev in ReplTalk to talk about getting added to the whitelist."));

              case 19:
              case "end":
                return _context8.stop();
            }
          }
        }, _callee8);
      }));

      function deletePostVote(_x16) {
        return _deletePostVote.apply(this, arguments);
      }

      return deletePostVote;
    }()
  }, {
    key: "posts",
    value: function () {
      var _posts = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee9() {
        var after,
            count,
            order,
            info,
            _args9 = arguments;
        return regeneratorRuntime.wrap(function _callee9$(_context9) {
          while (1) {
            switch (_context9.prev = _context9.next) {
              case 0:
                after = _args9.length > 0 && _args9[0] !== undefined ? _args9[0] : '';
                count = _args9.length > 1 && _args9[1] !== undefined ? _args9[1] : 10;
                order = _args9.length > 2 && _args9[2] !== undefined ? _args9[2] : '';
                _context9.next = 5;
                return (0, _nodeFetch["default"])(_constants["default"].graphql, {
                  method: 'POST',
                  headers: _headers["default"],
                  body: JSON.stringify({
                    query: "\n          query Posts($after: String!, $count: Int!, $order: String!) {\n            posts(after: $after, count: $count, order: $order) {\n              items {\n                id\n                title\n                preview(length: ".concat(_constants["default"].initVariables.markdown.length || 150, ", removeMarkdown: ").concat(_constants["default"].initVariables.markdown.removeMarkdown || true, ")\n              }\n              pageInfo {\n                nextCursor\n              }\n            }\n          }"),
                    variables: JSON.stringify({
                      after: after,
                      count: count,
                      order: order
                    })
                  })
                }).then(function (res) {
                  return res.json();
                });

              case 5:
                info = _context9.sent;

                if (!info.errors) {
                  _context9.next = 8;
                  break;
                }

                throw new Error("Replit GraphQL Error(s): ".concat(JSON.stringify(info.errors)));

              case 8:
                if (info.data.posts) {
                  _context9.next = 12;
                  break;
                }

                throw new Error('Could not fetch posts.');

              case 12:
                return _context9.abrupt("return", info.data.posts);

              case 13:
              case "end":
                return _context9.stop();
            }
          }
        }, _callee9);
      }));

      function posts() {
        return _posts.apply(this, arguments);
      }

      return posts;
    }()
  }]);

  return Post;
}();

exports["default"] = Post;