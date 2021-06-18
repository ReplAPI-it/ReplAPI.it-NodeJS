import fetch from 'node-fetch';

import headers from '../utils/headers.mjs';
import constants from '../utils/constants.mjs';

export default class User {
	constructor(username) {
		this.username = username;
	}

	async userGraphQLDataAbridged() {
		const user = this.username;
		const info = await fetch(constants.graphql, {
			method: 'POST',
			headers,
			body: JSON.stringify({
				query: `
          query User($user: String!) {
            userByUsername(username: $user) {
              ${constants.userAttributes}
            }
          }`,
				variables: JSON.stringify({
					user,
				}),
			}),
		}).then((res) => res.json());

		if (info.errors)
			throw new Error(
				`Replit GraphQL Error(s): ${JSON.stringify(info.errors)}`
			);

		if (!info.data.userByUsername) {
			throw new Error(`${user} is not a user. Please query users on Replit.`);
		} else {
			return info.data.userByUsername;
		}
	}

	async userGraphQLDataFull() {
		const user = this.username;
		const info = await fetch(constants.graphql, {
			method: 'POST',
			headers,
			body: JSON.stringify({
				query: `
          query User($user: String!) {
            userByUsername(username: $user) {
              ${constants.userAttributes}
              roles { ${constants.roleAttributes} }
              organization { ${constants.organizationAttributes} }
              languages { ${constants.languageAttributes} }
            }
          }`,
				variables: JSON.stringify({
					user,
				}),
			}),
		}).then((res) => res.json());

		if (info.errors)
			throw new Error(
				`Replit GraphQL Error(s): ${JSON.stringify(info.errors)}`
			);

		if (!info.data.userByUsername) {
			throw new Error(`${user} is not a user. Please query users on Replit.`);
		} else {
			return info.data.userByUsername;
		}
	}

	async userRestfulData() {
		const { username } = this;

		const info = await fetch(`${constants.restful}/data/profiles/${username}`, {
			method: 'GET',
			headers,
		}).then((res) => res.json());

		if (!info) {
			throw new Error(
				`${username} is not a user. Please query users on Replit.`
			);
		} else {
			return info;
		}
	}

	async postsDataAbridged(after = '', count = 10, order = '') {
		const user = this.username;
		const output = [];

		async function recurse(recurseAfter) {
			if (recurseAfter === null) return;
			const info = await fetch(constants.graphql, {
				method: 'POST',
				headers,
				body: JSON.stringify({
					query: `
            query UserPost($user: String!, $after: String!, $count: Int!, $order: String!) {
              userByUsername(username: $user) {
                posts(count: $count, after: $after, order: $order) {
                  items { 
                    id
                    title
                    preview(length: ${
											constants.initVariables.markdown.length || 150
										}, removeMarkdown: ${
						constants.initVariables.markdown.removeMarkdown || true
					})
                  }
                  pageInfo {
                    nextCursor
                  }
                }
              }
            }`,
					variables: JSON.stringify({
						user,
						count,
						order,
						after: recurseAfter,
					}),
				}),
			}).then((res) => res.json());

			if (info.errors)
				throw new Error(
					`Replit GraphQL Error(s): ${JSON.stringify(info.errors)}`
				);

			if (!info.data.userByUsername) {
				throw new Error(`${user} is not a user. Please query users on Replit.`);
			} else {
				info.data.userByUsername.posts.items.forEach((post) => {
					output.push(post);
				});
				if (output.length !== count) {
					await recurse(info.data.userByUsername.posts.pageInfo.nextCursor);
				}
			}
		}

		await recurse(after);
		return output;
	}

	async postsDataFull(after = '', count = 10, order = '') {
		const user = this.username;
		const output = [];

		async function recurse(recurseAfter) {
			if (recurseAfter === null) return;

			const info = await fetch(constants.graphql, {
				method: 'POST',
				headers,
				body: JSON.stringify({
					query: `
              query UserPost($user: String!, $after: String!, $count: Int!, $order: String!) {
                userByUsername(username: $user) {
                  posts(count: $count, after: $after, order: $order) {
                    items { 
                      ${constants.postAttributes}
                      user { ${constants.userAttributes} }
                      board { ${constants.boardAttributes} }
                      repl { ${constants.replAttributes} }
                      comments(count: ${
												constants.initVariables.previewCount.comments || 10
											}) { items { ${constants.commentAttributes} } }
                      votes { items { id, user { ${
												constants.userAttributes
											} } } }
                      answeredBy { ${constants.userAttributes} }
                      answer { ${constants.commentAttributes} }
                    }
                    pageInfo {
                      nextCursor
                    }
                  }
                }
              }`,
					variables: JSON.stringify({
						user,
						count,
						order,
						after: recurseAfter,
					}),
				}),
			}).then((res) => res.json());

			if (info.errors)
				throw new Error(
					`Replit GraphQL Error(s): ${JSON.stringify(info.errors)}`
				);

			if (!info.data.userByUsername) {
				throw new Error(`${user} is not a user. Please query users on Replit.`);
			} else {
				info.data.userByUsername.posts.items.forEach((post) => {
					output.push(post);
				});
				if (output.length !== count) {
					await recurse(info.data.userByUsername.posts.pageInfo.nextCursor);
				}
			}
		}

		await recurse(after);
		return output;
	}

	async commentsDataAbridged(after = '', count = 20, order = '') {
		const user = this.username;
		const output = [];

		async function recurse(recurseAfter) {
			if (recurseAfter === null) return;

			const info = await fetch(constants.graphql, {
				method: 'POST',
				headers,
				body: JSON.stringify({
					query: `
            query UserComment($user: String!, $after: String!, $count: Int!, $order: String!) {
              userByUsername(username: $user) {
                comments(count: $count, after: $after, order: $order) {
                  items {
                    id
                    preview(length: ${
											constants.initVariables.markdown.length || 150
										}, removeMarkdown: ${
						constants.initVariables.markdown.removeMarkdown || true
					})
                  }
                  pageInfo {
                    nextCursor
                  }
                }
              }
            }`,
					variables: JSON.stringify({
						user,
						count,
						order,
						after: recurseAfter,
					}),
				}),
			}).then((res) => res.json());

			if (info.errors)
				throw new Error(
					`Replit GraphQL Error(s): ${JSON.stringify(info.errors)}`
				);

			if (!info.data.userByUsername) {
				throw new Error(`${user} is not a user. Please query users on Replit.`);
			} else {
				info.data.userByUsername.comments.items.forEach((comment) => {
					output.push(comment);
				});
				if (output.length !== count) {
					await recurse(info.data.userByUsername.comments.pageInfo.nextCursor);
				}
			}
		}

		await recurse(after);
		return output;
	}

	async commentsDataFull(after = '', count = 20, order = '') {
		const user = this.username;
		const output = [];

		async function recurse(recurseAfter) {
			if (recurseAfter === null) return;

			const info = await fetch(constants.graphql, {
				method: 'POST',
				headers,
				body: JSON.stringify({
					query: `
            query UserComment($user: String!, $after: String!, $count: Int!, $order: String!) {
              userByUsername(username: $user) {
                comments(count: $count, after: $after, order: $order) {
                  items {
                    ${constants.commentAttributes}
                    parentComment { ${constants.commentAttributes} }
                    comments { ${constants.commentAttributes} }
                    user { ${constants.userAttributes} }
                    post {
                      ${constants.postAttributes}
                      user { ${constants.userAttributes} }
                      board { ${constants.boardAttributes} }
                      repl { ${constants.replAttributes} }
                      comments(count: ${
												constants.initVariables.previewCount.comments || 10
											}) { items { ${constants.commentAttributes} } }
                      votes { items { id, user { ${
												constants.userAttributes
											} } } }
                      answeredBy { ${constants.userAttributes} }
                      answer { ${constants.commentAttributes} }
                    }
                  }
                  pageInfo {
                    nextCursor
                  }
                }
              }
            }`,
					variables: JSON.stringify({
						user,
						count,
						order,
						after: recurseAfter,
					}),
				}),
			}).then((res) => res.json());

			if (info.errors)
				throw new Error(
					`Replit GraphQL Error(s): ${JSON.stringify(info.errors)}`
				);

			if (!info.data.userByUsername) {
				throw new Error(`${user} is not a user. Please query users on Replit.`);
			} else {
				info.data.userByUsername.comments.items.forEach((comment) => {
					output.push(comment);
				});
				if (output.length !== count) {
					await recurse(info.data.userByUsername.comments.pageInfo.nextCursor);
				}
			}
		}

		await recurse(after);
		return output;
	}

	async userSearch(query, limit = '') {
		if (!global.cookies) {
			throw new Error('ReplAPI.it: Not logged in.');
		} else if (['RayhanADev'].includes(constants.initVariables.username)) {
			if (!query) {
				throw new Error(
					'User Search needs a query to search. Please supply a query.'
				);
			}

			headers['Set-Cookie'] = global.cookies;
			const info = await fetch(constants.graphql, {
				method: 'POST',
				headers,
				body: JSON.stringify({
					query: `
            query UserSearch($query: String!, $limit: Int!) {
              usernameSearch(query: $query, limit: $limit) {
                id
                username
              }
            }`,
					variables: JSON.stringify({
						query,
						limit,
					}),
				}),
			}).then((res) => res.json());

			if (info.errors)
				throw new Error(
					`Replit GraphQL Error(s): ${JSON.stringify(info.errors)}`
				);
			else return info.data.usernameSearch;
		} else {
			throw new Error(
				`${constants.initVariables.username} is not whitelisted. Please contact @RayhanADev in ReplTalk to talk about getting added to the whitelist.`
			);
		}
	}
}
