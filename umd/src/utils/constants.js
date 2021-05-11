(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(["exports", "fs", "path"], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require("fs"), require("path"));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.fs, global.path);
    global.constants = mod.exports;
  }
})(typeof globalThis !== "undefined" ? globalThis : typeof self !== "undefined" ? self : this, function (_exports, _fs, _path) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports["default"] = void 0;
  _fs = _interopRequireDefault(_fs);
  _path = _interopRequireDefault(_path);

  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

  var initVariables;

  if (_fs["default"].existsSync(_path["default"].join(process.cwd(), ".replapirc.json"))) {
    initVariables = JSON.parse(_fs["default"].readFileSync(_path["default"].join(process.cwd(), ".replapirc.json")));
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
    roleAttributes: "id, name, key, tagline",
    languageAttributes: "id, displayName, key, category, tagline, icon, isNew",
    organizationAttributes: "id, name, country, postalCode, state, city, googlePlaceId, timeCreated, timeUpdated, timeDeleted, time_created",
    subscriptionAttributes: "id, userId, customerId, planId, timeUpdated, timeCreated, timeDeleted",
    userAttributes: "id, username, firstName, lastName, bio, isVerified, displayName, fullName, url, isLoggedIn, isSubscribed, timeCreated, isBannedFromBoards, karma, isHacker, image",
    boardAttributes: "id, name, description, slug, cta, titleCta, bodyCta, template, buttonCta, color, replRequired, isLocked, isAnswerable, isPrivate, timeCreated, timeUpdated, url, canPost",
    replAttributes: "id, language, isRenamed, isProject, isPrivate, isStarred, isAlwaysOn, isBoosted, title, slug, description, timeCreated, timeUpdated, isOwner, pinnedToProfile, folderId, folder { id, name }, files, size, url, liteUrl: url(lite: true), hostedUrl, dottyUrl: hostedUrl(dotty: true), wssUrl: hostedUrl(protocol: WSS), terminalUrl, runCount, publicForkCount, imageUrl, tags { id, replCount, replsTaggedTodayCount, creatorCount, isTrending }, reactions { id, type, count }, origin { url }, ioTests { id, name, template { id } }, hasUnitTesting, unitTests { tests { id, name, code } }",
    replCommentAttributes: "id, body, timeCreated, timeUpdated, canEdit, canComment",
    commentAttributes: "id, body, voteCount, timeCreated, timeUpdated, url, isAuthor, canEdit, canVote, canComment, hasVoted, canReport, hasReported, isAnswer, canSelectAsAnswer, canUnselectAsAnswer, preview(length: ".concat(initVariables.markdown.length || 150, ", removeMarkdown: ").concat(initVariables.markdown.removeMarkdown || true, ")"),
    postAttributes: "id, title, body, showHosted, voteCount, commentCount, isPinned, isLocked, timeCreated, timeUpdated, url, isAnnouncement, isAuthor, canEdit, canComment, canVote, canPin, canSetType, canChangeBoard, canLock, hasVoted, canReport, hasReported, isAnswerable, tutorialPages, preview(length: ".concat(initVariables.markdown.length || 150, ", removeMarkdown: ").concat(initVariables.markdown.removeMarkdown || true, ")"),
    graphql: "".concat(initVariables.endpoints.gql || "https://staging.replit.com/graphql"),
    login: "".concat(initVariables.endpoints.login || "https://staging.replit.com/login"),
    restful: "".concat(initVariables.endpoints.restful || "https://staging.replit.com")
  };
  _exports["default"] = _default;
});