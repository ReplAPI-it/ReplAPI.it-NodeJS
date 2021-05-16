"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _lodash = _interopRequireDefault(require("lodash"));

var _cosmiconfig = require("cosmiconfig");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var initVariables = {
  username: '',
  captcha: {
    token: ''
  },
  endpoints: {
    gql: '',
    restful: '',
    login: ''
  },
  markdown: {
    length: '',
    removeMarkdown: ''
  },
  previewCount: {
    comments: ''
  },
  experimentalFeatures: '',
  createDatabaseFlag: ''
};
var moduleName = 'replapi';
var explorer = (0, _cosmiconfig.cosmiconfig)(moduleName);
explorer.search().then(function (result) {
  if (result !== null) _lodash["default"].assign(initVariables, result.config);
})["catch"](function () {
  throw new Error('Could not read configuration files!');
});
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