import fetch from 'node-fetch'

import headers from '../utils/headers.js'
import constants from '../utils/constants.js'

export default class Notifications {
	async postReplyNotification(after, count) {
		if (!global.cookies) {
			throw new Error('Not logged in.');
		} else {
			headers.Cookie = global.cookies;
			let info = await fetch(variables.graphql, {
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
                      ${variable.userAttributes}
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
							after: after,
							count: count
						})
					})
				})
				.then(res => res.json());

			if (!info.data.notifications) {
				throw new Error(`Cannot fetch notifications.`);
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
			let info = await fetch(variables.graphql, {
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
                      ${variable.userAttributes}
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
							after: after,
							count: count
						})
					})
				})
				.then(res => res.json());

			if (!info.data.notifications) {
				throw new Error(`Cannot fetch notifications.`);
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
			let info = await fetch(variables.graphql, {
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
                      ${variable.userAttributes}
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
							after: after,
							count: count
						})
					})
				})
				.then(res => res.json());

			if (!info.data.notifications) {
				throw new Error(`Cannot fetch notifications.`);
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
			let info = await fetch(variables.graphql, {
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
                      ${variable.userAttributes}
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
							after: after,
							count: count
						})
					})
				})
				.then(res => res.json());

			if (!info.data.notifications) {
				throw new Error(`Cannot fetch notifications.`);
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
			let info = await fetch(variables.graphql, {
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
                      ${variable.userAttributes}
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
							after: after,
							count: count
						})
					})
				})
				.then(res => res.json());

			if (!info.data.notifications) {
				throw new Error(`Cannot fetch notifications.`);
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
			let info = await fetch(variables.graphql, {
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
                      ${variable.userAttributes}
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
							after: after,
							count: count
						})
					})
				})
				.then(res => res.json());

			if (!info.data.notifications) {
				throw new Error(`Cannot fetch notifications.`);
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
			let info = await fetch(variables.graphql, {
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
                      ${variable.userAttributes}
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
							after: after,
							count: count
						})
					})
				})
				.then(res => res.json());

			if (!info.data.notifications) {
				throw new Error(`Cannot fetch notifications.`);
			} else {
				return info.data.notifications;
			}
		}
	}
}
