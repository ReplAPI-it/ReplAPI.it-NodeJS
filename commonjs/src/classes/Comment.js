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

var Comment = /*#__PURE__*/function () {
  function Comment(id) {
    _classCallCheck(this, Comment);

    this.id = id;
  }

  _createClass(Comment, [{
    key: "commentDataAbridged",
    value: function () {
      var _commentDataAbridged = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
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

                throw new Error("".concat(id, " is not a comment. Please query comments on Replit."));

              case 3:
                _context.next = 5;
                return (0, _nodeFetch["default"])(_constants["default"].graphql, {
                  method: 'POST',
                  headers: _headers["default"],
                  body: JSON.stringify({
                    query: "\n          query Comment($id: Int!) {\n            comment(id: $id) {\n              id\n              preview(length: ".concat(_constants["default"].initVariables.markdown.length || 150, ", removeMarkdown: ").concat(_constants["default"].initVariables.markdown.removeMarkdown || true, ")\n            }\n          }"),
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
                if (info.data.comment) {
                  _context.next = 12;
                  break;
                }

                throw new Error("".concat(id, " is not a comment. Please query comments on Replit."));

              case 12:
                return _context.abrupt("return", info.data.comment);

              case 13:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function commentDataAbridged() {
        return _commentDataAbridged.apply(this, arguments);
      }

      return commentDataAbridged;
    }()
  }, {
    key: "commentDataFull",
    value: function () {
      var _commentDataFull = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
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

                throw new Error("".concat(id, " is not a comment. Please query comments on Replit."));

              case 3:
                _context2.next = 5;
                return (0, _nodeFetch["default"])(_constants["default"].graphql, {
                  method: 'POST',
                  headers: _headers["default"],
                  body: JSON.stringify({
                    query: "\n          query Comment($id: Int!) {\n            comment(id: $id) {\n              ".concat(_constants["default"].commentAttributes, "\n              parentComment { ").concat(_constants["default"].commentAttributes, " }\n              comments { ").concat(_constants["default"].commentAttributes, " }\n              user { ").concat(_constants["default"].userAttributes, " }\n              post {\n                ").concat(_constants["default"].postAttributes, "\n                user { ").concat(_constants["default"].userAttributes, " }\n                board { ").concat(_constants["default"].boardAttributes, " }\n                repl { ").concat(_constants["default"].replAttributes, " }\n                comments(count: ").concat(_constants["default"].initVariables.previewCount.comments || 10, ") { items { ").concat(_constants["default"].commentAttributes, " } }\n                votes { items { id, user { ").concat(_constants["default"].userAttributes, " } } }\n                answeredBy { ").concat(_constants["default"].userAttributes, " }\n                answer { ").concat(_constants["default"].commentAttributes, " }\n              }\n            }\n          }"),
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
                if (info.data.comment) {
                  _context2.next = 12;
                  break;
                }

                throw new Error("".concat(id, " is not a comment. Please query comments on Replit."));

              case 12:
                return _context2.abrupt("return", info.data.comment);

              case 13:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function commentDataFull() {
        return _commentDataFull.apply(this, arguments);
      }

      return commentDataFull;
    }()
  }, {
    key: "createCommentOnPost",
    value: function () {
      var _createCommentOnPost = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(body, postId) {
        var info;
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                if (global.cookies) {
                  _context3.next = 4;
                  break;
                }

                throw new Error('ReplAPI.it: Not logged in.');

              case 4:
                if (!['RayhanADev'].includes(_constants["default"].initVariables.username)) {
                  _context3.next = 20;
                  break;
                }

                if (!(typeof body !== 'string')) {
                  _context3.next = 7;
                  break;
                }

                throw new Error("Body must be of type string. Got type ".concat(typeof title === "undefined" ? "undefined" : _typeof(title), "."));

              case 7:
                if (!(typeof postId !== 'number')) {
                  _context3.next = 9;
                  break;
                }

                throw new Error("Post ID must be of type number. Got type ".concat(typeof title === "undefined" ? "undefined" : _typeof(title), "."));

              case 9:
                _headers["default"]['Set-Cookie'] = global.cookies;
                _context3.next = 12;
                return (0, _nodeFetch["default"])(_constants["default"].graphql, {
                  method: 'POST',
                  headers: _headers["default"],
                  body: JSON.stringify({
                    query: "\n            mutation CreateComment($input: CreateCommentInput!) {\n              createComment(input: $input) {\n                comment {\n                  id\n                  preview(length: ".concat(_constants["default"].initVariables.markdown.length || 150, ", removeMarkdown: ").concat(_constants["default"].initVariables.markdown.removeMarkdown || true, ")\n                }\n              }\n            }"),
                    variables: JSON.stringify({
                      input: {
                        body: body,
                        postId: postId
                      }
                    })
                  })
                }).then(function (res) {
                  return res.json();
                });

              case 12:
                info = _context3.sent;

                if (!info.errors) {
                  _context3.next = 17;
                  break;
                }

                throw new Error("Replit GraphQL Error(s): ".concat(JSON.stringify(info.errors)));

              case 17:
                return _context3.abrupt("return", info.data.createComment.comment);

              case 18:
                _context3.next = 21;
                break;

              case 20:
                throw new Error("".concat(_constants["default"].initVariables.username, " is not whitelisted. Please contact @RayhanADev in ReplTalk to talk about getting added to the whitelist."));

              case 21:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3);
      }));

      function createCommentOnPost(_x, _x2) {
        return _createCommentOnPost.apply(this, arguments);
      }

      return createCommentOnPost;
    }()
  }, {
    key: "createCommentOnComment",
    value: function () {
      var _createCommentOnComment = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(body, commentId) {
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
                  _context4.next = 20;
                  break;
                }

                if (!(typeof body !== 'string')) {
                  _context4.next = 7;
                  break;
                }

                throw new Error("Body must be of type string. Got type ".concat(typeof title === "undefined" ? "undefined" : _typeof(title), "."));

              case 7:
                if (!(typeof commentId !== 'number')) {
                  _context4.next = 9;
                  break;
                }

                throw new Error("Post ID must be of type number. Got type ".concat(typeof title === "undefined" ? "undefined" : _typeof(title), "."));

              case 9:
                _headers["default"]['Set-Cookie'] = global.cookies;
                _context4.next = 12;
                return (0, _nodeFetch["default"])(_constants["default"].graphql, {
                  method: 'POST',
                  headers: _headers["default"],
                  body: JSON.stringify({
                    query: "\n            mutation CreateComment($input: CreateCommentInput!) {\n              createComment(input: $input) {\n                comment {\n                  id\n                  preview(length: ".concat(_constants["default"].initVariables.markdown.length || 150, ", removeMarkdown: ").concat(_constants["default"].initVariables.markdown.removeMarkdown || true, ")\n                }\n              }\n            }"),
                    variables: JSON.stringify({
                      input: {
                        body: body,
                        commentId: commentId
                      }
                    })
                  })
                }).then(function (res) {
                  return res.json();
                });

              case 12:
                info = _context4.sent;

                if (!info.errors) {
                  _context4.next = 17;
                  break;
                }

                throw new Error("Replit GraphQL Error(s): ".concat(JSON.stringify(info.errors)));

              case 17:
                return _context4.abrupt("return", info.data.createComment.comment);

              case 18:
                _context4.next = 21;
                break;

              case 20:
                throw new Error("".concat(_constants["default"].initVariables.username, " is not whitelisted. Please contact @RayhanADev in ReplTalk to talk about getting added to the whitelist."));

              case 21:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4);
      }));

      function createCommentOnComment(_x3, _x4) {
        return _createCommentOnComment.apply(this, arguments);
      }

      return createCommentOnComment;
    }()
  }, {
    key: "updateComment",
    value: function () {
      var _updateComment = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(id, body) {
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
                  _context5.next = 20;
                  break;
                }

                if (!(typeof id !== 'number')) {
                  _context5.next = 7;
                  break;
                }

                throw new Error("Title must be of type number. Got type ".concat(typeof title === "undefined" ? "undefined" : _typeof(title), "."));

              case 7:
                if (!(typeof body !== 'string' || typeof body !== 'undefined')) {
                  _context5.next = 9;
                  break;
                }

                throw new Error("Body must be of type string. Got type ".concat(_typeof(body), "."));

              case 9:
                _headers["default"]['Set-Cookie'] = global.cookies;
                _context5.next = 12;
                return (0, _nodeFetch["default"])(_constants["default"].graphql, {
                  method: 'POST',
                  headers: _headers["default"],
                  body: JSON.stringify({
                    query: "\n            mutation UpdateComment($input: UpdateCommentInput!) {\n              updateComment(input: $input) {\n                comment {\n                  id\n                  preview(length: ".concat(_constants["default"].initVariables.markdown.length || 150, ", removeMarkdown: ").concat(_constants["default"].initVariables.markdown.removeMarkdown || true, ")\n                }\n              }\n            }"),
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
                info = _context5.sent;

                if (!info.errors) {
                  _context5.next = 17;
                  break;
                }

                throw new Error("Replit GraphQL Error(s): ".concat(JSON.stringify(info.errors)));

              case 17:
                return _context5.abrupt("return", info.data.updateComment.comment);

              case 18:
                _context5.next = 21;
                break;

              case 20:
                throw new Error("".concat(_constants["default"].initVariables.username, " is not whitelisted. Please contact @RayhanADev in ReplTalk to talk about getting added to the whitelist."));

              case 21:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5);
      }));

      function updateComment(_x5, _x6) {
        return _updateComment.apply(this, arguments);
      }

      return updateComment;
    }()
  }, {
    key: "deleteComment",
    value: function () {
      var _deleteComment = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6(id) {
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

                throw new Error("Id must be of type number. Got type ".concat(typeof title === "undefined" ? "undefined" : _typeof(title), "."));

              case 7:
                _headers["default"]['Set-Cookie'] = global.cookies;
                _context6.next = 10;
                return (0, _nodeFetch["default"])(_constants["default"].graphql, {
                  method: 'POST',
                  headers: _headers["default"],
                  body: JSON.stringify({
                    query: "\n            mutation DeleteComment($id: Int!) {\n              deleteComment(id: $id) {\n                id\n                preview(length: ".concat(_constants["default"].initVariables.markdown.length || 150, ", removeMarkdown: ").concat(_constants["default"].initVariables.markdown.removeMarkdown || true, ")\n              }\n            }"),
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
                return _context6.abrupt("return", info.data.comment);

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

      function deleteComment(_x7) {
        return _deleteComment.apply(this, arguments);
      }

      return deleteComment;
    }()
  }, {
    key: "createCommentVote",
    value: function () {
      var _createCommentVote = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee7(id) {
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

                throw new Error("Id must be of type number. Got type ".concat(typeof title === "undefined" ? "undefined" : _typeof(title), "."));

              case 7:
                _headers["default"]['Set-Cookie'] = global.cookies;
                _context7.next = 10;
                return (0, _nodeFetch["default"])(_constants["default"].graphql, {
                  method: 'POST',
                  headers: _headers["default"],
                  body: JSON.stringify({
                    query: "\n            mutation CreateCommentVote($id: Int!) {\n              createCommentVote(id: $id) {\n                id\n                user { username }\n                comment {\n                  id\n                  preview(length: ".concat(_constants["default"].initVariables.markdown.length || 150, ", removeMarkdown: ").concat(_constants["default"].initVariables.markdown.removeMarkdown || true, ")\n                }\n              }\n            }"),
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
                return _context7.abrupt("return", info.data.createCommentVote);

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

      function createCommentVote(_x8) {
        return _createCommentVote.apply(this, arguments);
      }

      return createCommentVote;
    }()
  }, {
    key: "deleteCommentVote",
    value: function () {
      var _deleteCommentVote = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee8(id) {
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

                throw new Error("Id must be of type number. Got type ".concat(typeof title === "undefined" ? "undefined" : _typeof(title), "."));

              case 7:
                _headers["default"]['Set-Cookie'] = global.cookies;
                _context8.next = 10;
                return (0, _nodeFetch["default"])(_constants["default"].graphql, {
                  method: 'POST',
                  headers: _headers["default"],
                  body: JSON.stringify({
                    query: "\n            mutation DeleteCommentVote($id: Int!) {\n              deleteCommentVote(id: $id) {\n                id\n                user { username }\n                comment {\n                  id\n                  preview(length: ".concat(_constants["default"].initVariables.markdown.length || 150, ", removeMarkdown: ").concat(_constants["default"].initVariables.markdown.removeMarkdown || true, ")\n                }\n              }\n            }"),
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
                return _context8.abrupt("return", info.data.createCommentVote);

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

      function deleteCommentVote(_x9) {
        return _deleteCommentVote.apply(this, arguments);
      }

      return deleteCommentVote;
    }()
  }]);

  return Comment;
}();

exports["default"] = Comment;