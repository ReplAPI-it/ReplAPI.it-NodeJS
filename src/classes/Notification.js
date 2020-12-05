let headers = require('../utils/headers.js');
let variables = require('../utils/variables.js');

class Notifications {
	async answerNotification(after, count) {
		if (!global.cookies) {
			throw new Error('Not logged in.');
		} else {
			headers.Cookie = global.cookies;
			let info = await variables
				.fetch('https://repl.it/graphql', {
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
						variables: {
							after,
							count
						}
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

module.exports = {
	Notifications: Notifications
};
