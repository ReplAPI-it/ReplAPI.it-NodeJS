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

var exportable;

if (_constants["default"].initVariables.experimentalFeatures) {
  exportable = /*#__PURE__*/function () {
    function Notifications() {
      _classCallCheck(this, Notifications);
    }

    _createClass(Notifications, [{
      key: "postReplyNotification",
      value: function () {
        var _postReplyNotification = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(after, count) {
          var info;
          return regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
              switch (_context.prev = _context.next) {
                case 0:
                  if (global.cookies) {
                    _context.next = 4;
                    break;
                  }

                  throw new Error('Not logged in.');

                case 4:
                  _headers["default"].Cookie = global.cookies;
                  _context.next = 7;
                  return (0, _nodeFetch["default"])(_constants["default"].graphql, {
                    method: 'POST',
                    headers: _headers["default"],
                    body: JSON.stringify({
                      query: "\n              query RepliedToPostNotification($after: String!, $count: Int!) {\n                notifications(after: $after, count: $count) {\n                  items {\n                    ... on RepliedToPostNotification {\n                      id\n                      url\n                      text\n                      seen\n                      context\n                      creator {\n                        ".concat(_constants["default"].userAttributes, "\n                      }\n                      timeCreated\n                      timeUpdated\n                    }\n                  }\n                  pageInfo {\n                    nextCursor\n                  }\n                }\n              }"),
                      variables: JSON.stringify({
                        after: after,
                        count: count
                      })
                    })
                  }).then(function (res) {
                    return res.json();
                  });

                case 7:
                  info = _context.sent;

                  if (info.data.notifications) {
                    _context.next = 12;
                    break;
                  }

                  throw new Error('Cannot fetch notifications.');

                case 12:
                  return _context.abrupt("return", info.data.notifications);

                case 13:
                case "end":
                  return _context.stop();
              }
            }
          }, _callee);
        }));

        function postReplyNotification(_x, _x2) {
          return _postReplyNotification.apply(this, arguments);
        }

        return postReplyNotification;
      }()
    }, {
      key: "commentReplyNotification",
      value: function () {
        var _commentReplyNotification = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(after, count) {
          var info;
          return regeneratorRuntime.wrap(function _callee2$(_context2) {
            while (1) {
              switch (_context2.prev = _context2.next) {
                case 0:
                  if (global.cookies) {
                    _context2.next = 4;
                    break;
                  }

                  throw new Error('Not logged in.');

                case 4:
                  _headers["default"].Cookie = global.cookies;
                  _context2.next = 7;
                  return (0, _nodeFetch["default"])(_constants["default"].graphql, {
                    method: 'POST',
                    headers: _headers["default"],
                    body: JSON.stringify({
                      query: "\n              query RepliedToCommentNotification($after: String!, $count: Int!) {\n                notifications(after: $after, count: $count) {\n                  items {\n                    ... on RepliedToCommentNotification {\n                      id\n                      url\n                      text\n                      seen\n                      context\n                      creator {\n                        ".concat(_constants["default"].userAttributes, "\n                      }\n                      timeCreated\n                      timeUpdated\n                    }\n                  }\n                  pageInfo {\n                    nextCursor\n                  }\n                }\n              }"),
                      variables: JSON.stringify({
                        after: after,
                        count: count
                      })
                    })
                  }).then(function (res) {
                    return res.json();
                  });

                case 7:
                  info = _context2.sent;

                  if (info.data.notifications) {
                    _context2.next = 12;
                    break;
                  }

                  throw new Error('Cannot fetch notifications.');

                case 12:
                  return _context2.abrupt("return", info.data.notifications);

                case 13:
                case "end":
                  return _context2.stop();
              }
            }
          }, _callee2);
        }));

        function commentReplyNotification(_x3, _x4) {
          return _commentReplyNotification.apply(this, arguments);
        }

        return commentReplyNotification;
      }()
    }, {
      key: "postMentionedNotification",
      value: function () {
        var _postMentionedNotification = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(after, count) {
          var info;
          return regeneratorRuntime.wrap(function _callee3$(_context3) {
            while (1) {
              switch (_context3.prev = _context3.next) {
                case 0:
                  if (global.cookies) {
                    _context3.next = 4;
                    break;
                  }

                  throw new Error('Not logged in.');

                case 4:
                  _headers["default"].Cookie = global.cookies;
                  _context3.next = 7;
                  return (0, _nodeFetch["default"])(_constants["default"].graphql, {
                    method: 'POST',
                    headers: _headers["default"],
                    body: JSON.stringify({
                      query: "\n              query MentionedInPostNotification($after: String!, $count: Int!) {\n                notifications(after: $after, count: $count) {\n                  items {\n                    ... on MentionedInPostNotification {\n                      id\n                      url\n                      text\n                      seen\n                      context\n                      creator {\n                        ".concat(_constants["default"].userAttributes, "\n                      }\n                      timeCreated\n                      timeUpdated\n                    }\n                  }\n                  pageInfo {\n                    nextCursor\n                  }\n                }\n              }"),
                      variables: JSON.stringify({
                        after: after,
                        count: count
                      })
                    })
                  }).then(function (res) {
                    return res.json();
                  });

                case 7:
                  info = _context3.sent;

                  if (info.data.notifications) {
                    _context3.next = 12;
                    break;
                  }

                  throw new Error('Cannot fetch notifications.');

                case 12:
                  return _context3.abrupt("return", info.data.notifications);

                case 13:
                case "end":
                  return _context3.stop();
              }
            }
          }, _callee3);
        }));

        function postMentionedNotification(_x5, _x6) {
          return _postMentionedNotification.apply(this, arguments);
        }

        return postMentionedNotification;
      }()
    }, {
      key: "commentMentionedNotification",
      value: function () {
        var _commentMentionedNotification = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(after, count) {
          var info;
          return regeneratorRuntime.wrap(function _callee4$(_context4) {
            while (1) {
              switch (_context4.prev = _context4.next) {
                case 0:
                  if (global.cookies) {
                    _context4.next = 4;
                    break;
                  }

                  throw new Error('Not logged in.');

                case 4:
                  _headers["default"].Cookie = global.cookies;
                  _context4.next = 7;
                  return (0, _nodeFetch["default"])(_constants["default"].graphql, {
                    method: 'POST',
                    headers: _headers["default"],
                    body: JSON.stringify({
                      query: "\n              query MentionedInCommentNotification($after: String!, $count: Int!) {\n                notifications(after: $after, count: $count) {\n                  items {\n                    ... on MentionedInPostNotification {\n                      id\n                      url\n                      text\n                      seen\n                      context\n                      creator {\n                        ".concat(_constants["default"].userAttributes, "\n                      }\n                      timeCreated\n                      timeUpdated\n                    }\n                  }\n                  pageInfo {\n                    nextCursor\n                  }\n                }\n              }"),
                      variables: JSON.stringify({
                        after: after,
                        count: count
                      })
                    })
                  }).then(function (res) {
                    return res.json();
                  });

                case 7:
                  info = _context4.sent;

                  if (info.data.notifications) {
                    _context4.next = 12;
                    break;
                  }

                  throw new Error('Cannot fetch notifications.');

                case 12:
                  return _context4.abrupt("return", info.data.notifications);

                case 13:
                case "end":
                  return _context4.stop();
              }
            }
          }, _callee4);
        }));

        function commentMentionedNotification(_x7, _x8) {
          return _commentMentionedNotification.apply(this, arguments);
        }

        return commentMentionedNotification;
      }()
    }, {
      key: "answerNotification",
      value: function () {
        var _answerNotification = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(after, count) {
          var info;
          return regeneratorRuntime.wrap(function _callee5$(_context5) {
            while (1) {
              switch (_context5.prev = _context5.next) {
                case 0:
                  if (global.cookies) {
                    _context5.next = 4;
                    break;
                  }

                  throw new Error('Not logged in.');

                case 4:
                  _headers["default"].Cookie = global.cookies;
                  _context5.next = 7;
                  return (0, _nodeFetch["default"])(_constants["default"].graphql, {
                    method: 'POST',
                    headers: _headers["default"],
                    body: JSON.stringify({
                      query: "\n              query AnswerAcceptedNotification($after: String!, $count: Int!) {\n                notifications(after: $after, count: $count) {\n                  items {\n                    ... on AnswerAcceptedNotification {\n                      id\n                      url\n                      text\n                      seen\n                      context\n                      creator {\n                        ".concat(_constants["default"].userAttributes, "\n                      }\n                      timeCreated\n                      timeUpdated\n                    }\n                  }\n                  pageInfo {\n                    nextCursor\n                  }\n                }\n              }"),
                      variables: JSON.stringify({
                        after: after,
                        count: count
                      })
                    })
                  }).then(function (res) {
                    return res.json();
                  });

                case 7:
                  info = _context5.sent;

                  if (info.data.notifications) {
                    _context5.next = 12;
                    break;
                  }

                  throw new Error('Cannot fetch notifications.');

                case 12:
                  return _context5.abrupt("return", info.data.notifications);

                case 13:
                case "end":
                  return _context5.stop();
              }
            }
          }, _callee5);
        }));

        function answerNotification(_x9, _x10) {
          return _answerNotification.apply(this, arguments);
        }

        return answerNotification;
      }()
    }, {
      key: "multiplayerInviteNotification",
      value: function () {
        var _multiplayerInviteNotification = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6(after, count) {
          var info;
          return regeneratorRuntime.wrap(function _callee6$(_context6) {
            while (1) {
              switch (_context6.prev = _context6.next) {
                case 0:
                  if (global.cookies) {
                    _context6.next = 4;
                    break;
                  }

                  throw new Error('Not logged in.');

                case 4:
                  _headers["default"].Cookie = global.cookies;
                  _context6.next = 7;
                  return (0, _nodeFetch["default"])(_constants["default"].graphql, {
                    method: 'POST',
                    headers: _headers["default"],
                    body: JSON.stringify({
                      query: "\n              query MultiplayerInvitedNotification($after: String!, $count: Int!) {\n                notifications(after: $after, count: $count) {\n                  items {\n                    ... on MultiplayerInvitedNotification {\n                      id\n                      url\n                      text\n                      seen\n                      context\n                      creator {\n                        ".concat(_constants["default"].userAttributes, "\n                      }\n                      timeCreated\n                      timeUpdated\n                    }\n                  }\n                  pageInfo {\n                    nextCursor\n                  }\n                }\n              }"),
                      variables: JSON.stringify({
                        after: after,
                        count: count
                      })
                    })
                  }).then(function (res) {
                    return res.json();
                  });

                case 7:
                  info = _context6.sent;

                  if (info.data.notifications) {
                    _context6.next = 12;
                    break;
                  }

                  throw new Error('Cannot fetch notifications.');

                case 12:
                  return _context6.abrupt("return", info.data.notifications);

                case 13:
                case "end":
                  return _context6.stop();
              }
            }
          }, _callee6);
        }));

        function multiplayerInviteNotification(_x11, _x12) {
          return _multiplayerInviteNotification.apply(this, arguments);
        }

        return multiplayerInviteNotification;
      }()
    }, {
      key: "allNotification",
      value: function () {
        var _allNotification = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee7(after, count) {
          var info;
          return regeneratorRuntime.wrap(function _callee7$(_context7) {
            while (1) {
              switch (_context7.prev = _context7.next) {
                case 0:
                  if (global.cookies) {
                    _context7.next = 4;
                    break;
                  }

                  throw new Error('Not logged in.');

                case 4:
                  _headers["default"].Cookie = global.cookies;
                  _context7.next = 7;
                  return (0, _nodeFetch["default"])(_constants["default"].graphql, {
                    method: 'POST',
                    headers: _headers["default"],
                    body: JSON.stringify({
                      query: "\n              query Notification($after: String!, $count: Int!) {\n                notifications(after: $after, count: $count) {\n                  items {\n                    ... on Notification {\n                      id\n                      url\n                      text\n                      seen\n                      context\n                      creator {\n                        ".concat(_constants["default"].userAttributes, "\n                      }\n                      timeCreated\n                      timeUpdated\n                    }\n                  }\n                  pageInfo {\n                    nextCursor\n                  }\n                }\n              }"),
                      variables: JSON.stringify({
                        after: after,
                        count: count
                      })
                    })
                  }).then(function (res) {
                    return res.json();
                  });

                case 7:
                  info = _context7.sent;

                  if (info.data.notifications) {
                    _context7.next = 12;
                    break;
                  }

                  throw new Error('Cannot fetch notifications.');

                case 12:
                  return _context7.abrupt("return", info.data.notifications);

                case 13:
                case "end":
                  return _context7.stop();
              }
            }
          }, _callee7);
        }));

        function allNotification(_x13, _x14) {
          return _allNotification.apply(this, arguments);
        }

        return allNotification;
      }()
    }]);

    return Notifications;
  }();
} else {
  exportable = function noExperimentalFeatures() {
    console.log('Experimental Features are not enabled. To learn more about experimental features please visit the documentation.');
  };
}

var _default = exportable;
exports["default"] = _default;