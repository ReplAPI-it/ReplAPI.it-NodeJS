module.exports = {
  fetch: require('node-fetch'),
  roleAttributes: `id, name, key, tagline`,
  languageAttributes: `id, displayName, key, category, tagline, icon, isNew`,
  organizationAttributes: `id, name, country, postalCode, state, city, googlePlaceId, timeCreated, timeUpdated, timeDeleted, time_created`,
  subscriptionAttributes: `id, userId, customerId, planId, timeUpdated, timeCreated, timeDeleted`,
  userAttributes: `id, username, firstName, lastName, bio, isVerified, displayName, fullName, url, isLoggedIn, isSubscribed, timeCreated, isBannedFromBoards, karma, isHacker, image`,
  boardAttributes: `id, name, description, slug, cta, titleCta, bodyCta, template, buttonCta, color, replRequired, isLocked, isAnswerable, isPrivate, timeCreated, timeUpdated, url, canPost`,
  replAttributes: `id, language, isProject, isPrivate, isStarred, title, slug, description, folderId, isRenamed, url, timeCreated, timeUpdated, isOwner, tags, pinnedToProfile, canWrite, screenshot, files, hostedUrl, terminalUrl`,
  commentAttributes: `id, body, voteCount, timeCreated, timeUpdated, url, isAuthor, canEdit, canVote, canComment, hasVoted, canReport, hasReported, isAnswer, canSelectAsAnswer, canUnselectAsAnswer, preview(length: ${global.initVariables.markdown.length || 150}, removeMarkdown: ${global.initVariables.markdown.removeMarkdown || true})`,
  postAttributes: `id, title, body, showHosted, voteCount, commentCount, isPinned, isLocked, timeCreated, timeUpdated, url, isAnnouncement, isAuthor, canEdit, canComment, canVote, canPin, canSetType, canChangeBoard, canLock, hasVoted, canReport, hasReported, isAnswer, isAnswerable, tutorialPages, preview(length: ${global.initVariables.markdown.length || 150}, removeMarkdown: ${global.initVariables.markdown.removeMarkdown || true})`,
  graphql: `${global.initVariables.endpoints.gql || 'https://staging.replit.com/graphql'}`,
  login: `${global.initVariables.endpoints.login || 'https://staging.replit.com/login'}`,
  restful: `${global.initVariables.endpoints.restful || 'https://staging.replit.com/'}`
}
