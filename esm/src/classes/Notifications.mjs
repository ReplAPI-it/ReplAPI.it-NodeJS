import fetch from 'node-fetch';

import headers from '../utils/headers.mjs';
import constants from '../utils/constants.mjs';

let exportable;

if (constants.initVariables.experimentalFeatures) {
	exportable = class Notifications {
		async postReplyNotification(after, count) {
			if (!global.cookies) {
				throw new Error('Not logged in.');
			} else {
				headers.Cookie = global.cookies;
				const info = await fetch(constants.graphql, {
					method: 'POST',
					headers,
					body: JSON.stringify({
						query: `
              query RepliedToPostNotification($after: String!, $count: Int!) {
                notifications(after: $after, count: $count) {
                  items {
                    ... on RepliedToPostNotification {
                      id
                      url
                      text
                      seen
                      context
                      creator {
                        ${constants.userAttributes}
                      }
                      timeCreated
                      timeUpdated
                    }
                  }
                  pageInfo {
                    nextCursor
                  }
                }
              }`,
						variables: JSON.stringify({
							after,
							count,
						}),
					}),
				}).then((res) => res.json());

				if (!info.data.notifications) {
					throw new Error('Cannot fetch notifications.');
				} else {
					return info.data.notifications;
				}
			}
		}

		async commentReplyNotification(after, count) {
			if (!global.cookies) {
				throw new Error('Not logged in.');
			} else {
				headers.Cookie = global.cookies;
				const info = await fetch(constants.graphql, {
					method: 'POST',
					headers,
					body: JSON.stringify({
						query: `
              query RepliedToCommentNotification($after: String!, $count: Int!) {
                notifications(after: $after, count: $count) {
                  items {
                    ... on RepliedToCommentNotification {
                      id
                      url
                      text
                      seen
                      context
                      creator {
                        ${constants.userAttributes}
                      }
                      timeCreated
                      timeUpdated
                    }
                  }
                  pageInfo {
                    nextCursor
                  }
                }
              }`,
						variables: JSON.stringify({
							after,
							count,
						}),
					}),
				}).then((res) => res.json());

				if (!info.data.notifications) {
					throw new Error('Cannot fetch notifications.');
				} else {
					return info.data.notifications;
				}
			}
		}

		async postMentionedNotification(after, count) {
			if (!global.cookies) {
				throw new Error('Not logged in.');
			} else {
				headers.Cookie = global.cookies;
				const info = await fetch(constants.graphql, {
					method: 'POST',
					headers,
					body: JSON.stringify({
						query: `
              query MentionedInPostNotification($after: String!, $count: Int!) {
                notifications(after: $after, count: $count) {
                  items {
                    ... on MentionedInPostNotification {
                      id
                      url
                      text
                      seen
                      context
                      creator {
                        ${constants.userAttributes}
                      }
                      timeCreated
                      timeUpdated
                    }
                  }
                  pageInfo {
                    nextCursor
                  }
                }
              }`,
						variables: JSON.stringify({
							after,
							count,
						}),
					}),
				}).then((res) => res.json());

				if (!info.data.notifications) {
					throw new Error('Cannot fetch notifications.');
				} else {
					return info.data.notifications;
				}
			}
		}

		async commentMentionedNotification(after, count) {
			if (!global.cookies) {
				throw new Error('Not logged in.');
			} else {
				headers.Cookie = global.cookies;
				const info = await fetch(constants.graphql, {
					method: 'POST',
					headers,
					body: JSON.stringify({
						query: `
              query MentionedInCommentNotification($after: String!, $count: Int!) {
                notifications(after: $after, count: $count) {
                  items {
                    ... on MentionedInPostNotification {
                      id
                      url
                      text
                      seen
                      context
                      creator {
                        ${constants.userAttributes}
                      }
                      timeCreated
                      timeUpdated
                    }
                  }
                  pageInfo {
                    nextCursor
                  }
                }
              }`,
						variables: JSON.stringify({
							after,
							count,
						}),
					}),
				}).then((res) => res.json());

				if (!info.data.notifications) {
					throw new Error('Cannot fetch notifications.');
				} else {
					return info.data.notifications;
				}
			}
		}

		async answerNotification(after, count) {
			if (!global.cookies) {
				throw new Error('Not logged in.');
			} else {
				headers.Cookie = global.cookies;
				const info = await fetch(constants.graphql, {
					method: 'POST',
					headers,
					body: JSON.stringify({
						query: `
              query AnswerAcceptedNotification($after: String!, $count: Int!) {
                notifications(after: $after, count: $count) {
                  items {
                    ... on AnswerAcceptedNotification {
                      id
                      url
                      text
                      seen
                      context
                      creator {
                        ${constants.userAttributes}
                      }
                      timeCreated
                      timeUpdated
                    }
                  }
                  pageInfo {
                    nextCursor
                  }
                }
              }`,
						variables: JSON.stringify({
							after,
							count,
						}),
					}),
				}).then((res) => res.json());

				if (!info.data.notifications) {
					throw new Error('Cannot fetch notifications.');
				} else {
					return info.data.notifications;
				}
			}
		}

		async multiplayerInviteNotification(after, count) {
			if (!global.cookies) {
				throw new Error('Not logged in.');
			} else {
				headers.Cookie = global.cookies;
				const info = await fetch(constants.graphql, {
					method: 'POST',
					headers,
					body: JSON.stringify({
						query: `
              query MultiplayerInvitedNotification($after: String!, $count: Int!) {
                notifications(after: $after, count: $count) {
                  items {
                    ... on MultiplayerInvitedNotification {
                      id
                      url
                      text
                      seen
                      context
                      creator {
                        ${constants.userAttributes}
                      }
                      timeCreated
                      timeUpdated
                    }
                  }
                  pageInfo {
                    nextCursor
                  }
                }
              }`,
						variables: JSON.stringify({
							after,
							count,
						}),
					}),
				}).then((res) => res.json());

				if (!info.data.notifications) {
					throw new Error('Cannot fetch notifications.');
				} else {
					return info.data.notifications;
				}
			}
		}

		async allNotification(after, count) {
			if (!global.cookies) {
				throw new Error('Not logged in.');
			} else {
				headers.Cookie = global.cookies;
				const info = await fetch(constants.graphql, {
					method: 'POST',
					headers,
					body: JSON.stringify({
						query: `
              query Notification($after: String!, $count: Int!) {
                notifications(after: $after, count: $count) {
                  items {
                    ... on Notification {
                      id
                      url
                      text
                      seen
                      context
                      creator {
                        ${constants.userAttributes}
                      }
                      timeCreated
                      timeUpdated
                    }
                  }
                  pageInfo {
                    nextCursor
                  }
                }
              }`,
						variables: JSON.stringify({
							after,
							count,
						}),
					}),
				}).then((res) => res.json());

				if (!info.data.notifications) {
					throw new Error('Cannot fetch notifications.');
				} else {
					return info.data.notifications;
				}
			}
		}
	};
} else {
	exportable = function noExperimentalFeatures() {
		console.log(
			'Experimental Features are not enabled. To learn more about experimental features please visit the documentation.'
		);
	};
}

export default exportable;
