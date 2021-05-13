"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _fs = _interopRequireDefault(require("fs"));

var _path = _interopRequireDefault(require("path"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var initVariables;

if (_fs["default"].existsSync(_path["default"].join(process.cwd(), '.replapirc.json'))) {
  initVariables = JSON.parse(_fs["default"].readFileSync(_path["default"].join(process.cwd(), '.replapirc.json')));
} else if (_fs["default"].existsSync(_path["default"].join(process.cwd(), 'replapi-it.config.js'))) {
  _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return Promise.resolve("".concat(_path["default"].join(process.cwd(), 'replapi-it.config.js'))).then(function (s) {
              return _interopRequireWildcard(require(s));
            });

          case 2:
            initVariables = _context.sent["default"];

          case 3:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }))();
} else if (_fs["default"].existsSync(_path["default"].join(process.cwd(), 'replapi-it.config.js'))) {
  _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return Promise.resolve("".concat(_path["default"].join(process.cwd(), 'replapi-it.config.js'))).then(function (s) {
              return _interopRequireWildcard(require(s));
            });

          case 2:
            initVariables = _context2.sent["default"];

          case 3:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }))();
} else if (_fs["default"].existsSync(_path["default"].join(process.cwd(), 'replapi-it.config.cjs'))) {
  _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.next = 2;
            return Promise.resolve("".concat(_path["default"].join(process.cwd(), 'replapi-it.config.cjs'))).then(function (s) {
              return _interopRequireWildcard(require(s));
            });

          case 2:
            initVariables = _context3.sent["default"];

          case 3:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }))();
} else {
  initVariables = {
    username: undefined,
    captcha: {
      token: undefined
    },
    endpoints: {
      gql: undefined,
      restful: undefined,
      login: undefined
    },
    markdown: {
      length: undefined,
      removeMarkdown: undefined
    },
    previewCount: {
      comments: undefined
    }
  };
}

var _default = {
  initVariables: initVariables,
  roleAttributes: 'id, name, key, tagline',
  languageAttributes: 'id, displayName, key, category, tagline, icon, isNew',
  organizationAttributes: 'id, name, country, postalCode, state, city, googlePlaceId, timeCreated, timeUpdated, timeDeleted, time_created',
  subscriptionAttributes: 'id, userId, customerId, planId, timeUpdated, timeCreated, timeDeleted',
  userAttributes: 'id, username, firstName, lastName, bio, isVerified, displayName, fullName, url, isLoggedIn, isSubscribed, timeCreated, isBannedFromBoards, karma, isHacker, image',
  boardAttributes: 'id, name, description, slug, cta, titleCta, bodyCta, template, buttonCta, color, replRequired, isLocked, isAnswerable, isPrivate, timeCreated, timeUpdated, url, canPost',
  tagAttributes: 'id, replCount, replsTaggedTodayCount, creatorCount, isTrending',
  replAttributes: 'id, language, isRenamed, isProject, isPrivate, isStarred, isAlwaysOn, isBoosted, title, slug, description, timeCreated, timeUpdated, isOwner, pinnedToProfile, folderId, folder { id, name }, files, size, url, liteUrl: url(lite: true), hostedUrl, dottyUrl: hostedUrl(dotty: true), wssUrl: hostedUrl(protocol: WSS), terminalUrl, runCount, publicForkCount, imageUrl, reactions { id, type, count }, origin { url }, ioTests { id, name, template { id } }, hasUnitTesting, unitTests { tests { id, name, code } meta { imports, setup, tearDown } }',
  replCommentAttributes: 'id, body, timeCreated, timeUpdated, canEdit, canComment',
  commentAttributes: "id, body, voteCount, timeCreated, timeUpdated, url, isAuthor, canEdit, canVote, canComment, hasVoted, canReport, hasReported, isAnswer, canSelectAsAnswer, canUnselectAsAnswer, preview(length: ".concat(initVariables.markdown.length || 150, ", removeMarkdown: ").concat(initVariables.markdown.removeMarkdown || true, ")"),
  postAttributes: "id, title, body, showHosted, voteCount, commentCount, isPinned, isLocked, timeCreated, timeUpdated, url, isAnnouncement, isAuthor, canEdit, canComment, canVote, canPin, canSetType, canChangeBoard, canLock, hasVoted, canReport, hasReported, isAnswerable, tutorialPages, preview(length: ".concat(initVariables.markdown.length || 150, ", removeMarkdown: ").concat(initVariables.markdown.removeMarkdown || true, ")"),
  graphql: "".concat(initVariables.endpoints.gql || 'https://staging.replit.com/graphql'),
  login: "".concat(initVariables.endpoints.login || 'https://staging.replit.com/login'),
  restful: "".concat(initVariables.endpoints.restful || 'https://staging.replit.com')
};
exports["default"] = _default;