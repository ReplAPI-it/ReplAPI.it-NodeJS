const fetch = require('node-fetch');

const headers = {
	'Content-Type': 'application/json',
	Accept: 'application/json',
	'Accept-Encoding': 'gzip, deflate, br',
	Connection: 'keep-alive',
	'X-Requested-With': 'REPLAPIit',
	Referrer: 'https://repl.it',
	Origin: 'https://repl.it'
};

let roleAttributes = `id, name, key, tagline`;
let languageAttributes = `id, displayName, key, category, tagline, icon, isNew`;

let userAttributes = `id, username, url, image, karma, firstName, lastName, fullName, displayName, isLoggedIn, bio, timeCreated, organization { name }, subscription { planId }, languages { ${languageAttributes} }, roles { ${roleAttributes} }`;
let boardAttributes = `id, url, slug, cta, titleCta, bodyCta, buttonCta, description, name, replRequired, isLocked, isPrivate`;
let replAttributes = `id, hostedUrl, title, lang { ${languageAttributes} }, language, timeCreated`;
let commentAttributes = `id, body, voteCount, timeCreated, timeUpdated, user { ${userAttributes} }, url, post { id }, parentComment { id }, comments { id }, isAuthor, canEdit, canVote, canComment, hasVoted, canReport, hasReported, isAnswer, canSelectAsAnswer, canUnselectAsAnswer, preview(removeMarkdown: true, length: 150)`;
let postAttributes = `id, title, body, showHosted, voteCount, commentCount, isPinned, isLocked, timeCreated, timeUpdated, url, user { ${userAttributes} }, board { ${boardAttributes} }, repl { ${replAttributes} }, isAnnouncement, isAuthor, canEdit, canComment, canVote, canPin, canSetType, canChangeBoard, canLock, hasVoted, canReport, hasReported, isAnswered, isAnswerable, answeredBy { ${userAttributes} }, answer { ${commentAttributes} }, tutorialPages, preview(removeMarkdown: true, length: 150)`;

class User {
	constructor(username, filter) {
		this.username = username;
		this.filter = filter;
	}

	async profileData() {
	  let user = this.username;
		let info = await fetch('https://repl.it/graphql', {
			method: 'POST',
			headers,
			body: JSON.stringify({
				query: `
				  query User($user: String!) {
					  userByUsername(username: $user) {
              ${userAttributes}
					  }
					}`,
				variables: {
				  user
				}
			})
		}).then(res => res.json());

		if (info.data.userByUsername == null) {
			throw new Error(
				`${username} is not a user. Please query users on Repl.it.`
			);
		} else {
			return info.data.userByUsername;
		}
	}

	async postData() {
	  let user = this.username;
		let output = [];

		async function recurse(next = '') {
			if (next === null) return;

			let info = await fetch('https://repl.it/graphql', {
				method: 'POST',
				headers,
				body: JSON.stringify({
					query: `
            query UserPost($user: String!, $next: String) {
              userByUsername(username: $user) {
                posts(count: 50, after: $next) {
                  items { ${postAttributes} }
                  pageInfo {
                    nextCursor
                  }
                }
              }
            }`,
					variables: {
						user,
						next
					}
				})
			}).then(res => res.json());

			if (info.data.userByUsername == null) {
				throw new Error(
					`${username} is not a user. Please query users on Repl.it.`
				);
			} else {
				info.data.userByUsername.posts.items.forEach(post => {
					output.push(post);
				});
				await recurse(info.data.userByUsername.posts.pageInfo.nextCursor);
			}
		}

		await recurse();
		return output;
	}

	async commentData(username) {
	  let user = this.username;
		let output = [];

		async function recurse(next = '') {
			if (next === null) return;

			let info = await fetch('https://repl.it/graphql', {
				method: 'POST',
				headers,
				body: JSON.stringify({
					query: `
            query UserComment($user: String!, $next: String) {
              userByUsername(username: $user) {
                comments(count: 50, after: $next) {
                  items { ${commentAttributes} }
                  pageInfo {
                    nextCursor
                  }
                }
              }
            }`,
					variables: {
						user,
						next
					}
				})
			}).then(res => res.json());

			if (info.data.userByUsername == null) {
				throw new Error(
					`${username} is not a user. Please query users on Repl.it.`
				);
			} else {
				info.data.userByUsername.comments.items.forEach(comment => {
					output.push(comment);
				});
				await recurse(info.data.userByUsername.comments.pageInfo.nextCursor);
			}
		}

		await recurse();
		return output;
	}
}

module.exports = {
	User: User
};
