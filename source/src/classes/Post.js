import fetch from 'node-fetch';

import headers from '../utils/headers.mjs';
import constants from '../utils/constants.mjs';

export default class Post {
	constructor(id) {
		this.id = id;
	}

	async postDataAbridged() {
		const { id } = this;
		if (typeof id !== 'number') {
			throw new Error(`${id} is not a post. Please query posts on Replit.`);
		}

		const info = await fetch(constants.graphql, {
			method: 'POST',
			headers,
			body: JSON.stringify({
				query: `
          query Post($id: Int!) {
            post(id: $id) {
              id
              title
              preview(length: ${
								constants.initVariables.markdown.length || 150
							}, removeMarkdown: ${
					constants.initVariables.markdown.removeMarkdown || true
				})
            }
          }`,
				variables: JSON.stringify({
					id,
				}),
			}),
		}).then((res) => res.json());

		if (info.errors)
			throw new Error(
				`Replit GraphQL Error(s): ${JSON.stringify(info.errors)}`
			);

		if (!info.data.post) {
			throw new Error(`${id} is not a post. Please query posts on Replit.`);
		} else {
			return info.data.post;
		}
	}

	async postDataFull() {
		const { id } = this;
		if (typeof id !== 'number') {
			throw new Error(`${id} is not a post. Please query posts on Replit.`);
		}

		const info = await fetch(constants.graphql, {
			method: 'POST',
			headers,
			body: JSON.stringify({
				query: `
          query Post($id: Int!) {
            post(id: $id) {
              ${constants.postAttributes}
              user { ${constants.userAttributes} }
              board { ${constants.boardAttributes} }
              repl { ${constants.replAttributes} }
              comments(count: ${
								constants.initVariables.previewCount.comments || 10
							}) { items { ${constants.commentAttributes} } }
              votes { items { id user { ${constants.userAttributes} } } }
              answeredBy { ${constants.userAttributes} }
              answer { ${constants.commentAttributes} }
            }
          }`,
				variables: JSON.stringify({
					id,
				}),
			}),
		}).then((res) => res.json());

		if (info.errors)
			throw new Error(
				`Replit GraphQL Error(s): ${JSON.stringify(info.errors)}`
			);

		if (!info.data.post) {
			throw new Error(`${id} is not a post. Please query posts on Replit.`);
		} else {
			return info.data.post;
		}
	}

	async recentComments() {
		const { id } = this;
		if (typeof id !== 'number') {
			throw new Error(`${id} is not a post. Please query posts on Replit.`);
		}

		const info = await fetch(constants.graphql, {
			method: 'POST',
			headers,
			body: JSON.stringify({
				query: `
          query PostRecentComments($id: Int!) {
            post(id: $id) {
              recentComments {
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
                  votes { items { id user { ${constants.userAttributes} } } }
                  answeredBy { ${constants.userAttributes} }
                  answer { ${constants.commentAttributes} }
                }
              }
            }
          }`,
				variables: JSON.stringify({
					id,
				}),
			}),
		}).then((res) => res.json());

		if (info.errors)
			throw new Error(
				`Replit GraphQL Error(s): ${JSON.stringify(info.errors)}`
			);

		if (!info.data.post) {
			throw new Error(`${id} is not a post. Please query posts on Replit.`);
		} else {
			return info.data.post.recentComments;
		}
	}

	async createPost(title, body, boardId, replId, showHosted) {
		if (!global.cookies) {
			throw new Error('ReplAPI.it: Not logged in.');
		} else if (['RayhanADev'].includes(constants.initVariables.username)) {
			if (typeof title !== 'string') {
				throw new Error(
					`Title must be of type string. Got type ${typeof title}.`
				);
			}
			if (typeof body !== 'string') {
				throw new Error(
					`Body must be of type string. Got type ${typeof body}.`
				);
			}
			if (typeof boardId !== 'number') {
				throw new Error(
					`Board ID must be of type number. Got type ${typeof boardId}.`
				);
			}
			if (typeof replId !== 'string') {
				throw new Error(
					`Repl ID must be of type string. Got type ${typeof replId}.`
				);
			}
			if (typeof showHosted !== 'string') {
				throw new Error(
					`Show Hosted must be of type boolean. Got type ${typeof showHosted}.`
				);
			}

			headers['Set-Cookie'] = global.cookies;
			const info = await fetch(constants.graphql, {
				method: 'POST',
				headers,
				body: JSON.stringify({
					query: `
            mutation CreatePost($input: CreatePostInput!) {
              createPost(input: $input) {
                post {
                  id
                  title
                  preview(length: ${
										constants.initVariables.markdown.length || 150
									}, removeMarkdown: ${
						constants.initVariables.markdown.removeMarkdown || true
					})
                }
              }
            }`,
					variables: JSON.stringify({
						input: {
							title,
							body,
							boardId,
							replId,
							showHosted,
						},
					}),
				}),
			}).then((res) => res.json());

			if (info.errors)
				throw new Error(
					`Replit GraphQL Error(s): ${JSON.stringify(info.errors)}`
				);
			else return info.data.createPost.post;
		} else {
			throw new Error(
				`${constants.initVariables.username} is not whitelisted. Please contact @RayhanADev in ReplTalk to talk about getting added to the whitelist.`
			);
		}
	}

	async updatePost(
		title,
		body,
		isPinned,
		postType,
		isLocked,
		boardId,
		replId,
		showHosted
	) {
		if (!global.cookies) {
			throw new Error('ReplAPI.it: Not logged in.');
		} else if (['RayhanADev'].includes(constants.initVariables.username)) {
			if (typeof title !== 'string' || typeof title !== 'undefined') {
				throw new Error(
					`Title must be of type string. Got type ${typeof title}.`
				);
			}
			if (typeof body !== 'string' || typeof body !== 'undefined') {
				throw new Error(
					`Body must be of type string. Got type ${typeof body}.`
				);
			}
			if (typeof isPinned !== 'boolean' || typeof isPinned !== 'undefined') {
				throw new Error(
					`isPinned must be of type boolean. Got type ${typeof isPinned}.`
				);
			}
			if (typeof postType !== 'string' || typeof postType !== 'undefined') {
				throw new Error(
					`Post Type must be of type string. Got type ${typeof postType}.`
				);
			}
			if (typeof isLocked !== 'boolean' || typeof isLocked !== 'undefined') {
				throw new Error(
					`isLocked must be of type boolean. Got type ${typeof isPinned}.`
				);
			}
			if (typeof boardId !== 'number' || typeof boardId !== 'undefined') {
				throw new Error(
					`Board ID must be of type number. Got type ${typeof boardId}.`
				);
			}
			if (typeof replId !== 'string' || typeof replId !== 'undefined') {
				throw new Error(
					`Repl ID must be of type string. Got type ${typeof replId}.`
				);
			}
			if (typeof showHosted !== 'string' || typeof showHosted !== 'undefined') {
				throw new Error(
					`Show Hosted must be of type boolean. Got type ${typeof showHosted}.`
				);
			}

			headers['Set-Cookie'] = global.cookies;
			const info = await fetch(constants.graphql, {
				method: 'POST',
				headers,
				body: JSON.stringify({
					query: `
            mutation UpdatePost($input: UpdatePostInput!) {
              updatePost(input: $input) {
                post {
                  id
                  title
                  preview(length: ${
										constants.initVariables.markdown.length || 150
									}, removeMarkdown: ${
						constants.initVariables.markdown.removeMarkdown || true
					})
                }
              }
            }`,
					variables: JSON.stringify({
						input: {
							title,
							body,
							isPinned,
							postType,
							isLocked,
							boardId,
							replId,
							showHosted,
						},
					}),
				}),
			}).then((res) => res.json());

			if (info.errors)
				throw new Error(
					`Replit GraphQL Error(s): ${JSON.stringify(info.errors)}`
				);
			else return info.data.updatePost.post;
		} else {
			throw new Error(
				`${constants.initVariables.username} is not whitelisted. Please contact @RayhanADev in ReplTalk to talk about getting added to the whitelist.`
			);
		}
	}

	async deletePost(id) {
		if (!global.cookies) {
			throw new Error('ReplAPI.it: Not logged in.');
		} else if (['RayhanADev'].includes(constants.initVariables.username)) {
			if (typeof id !== 'number') {
				throw new Error(`Id must be of type number. Got type ${typeof id}.`);
			}

			headers['Set-Cookie'] = global.cookies;
			const info = await fetch(constants.graphql, {
				method: 'POST',
				headers,
				body: JSON.stringify({
					query: `
            mutation CreatePost($id: Int!) {
              deletePost(id: $id) {
                id
                title
                preview(length: ${
									constants.initVariables.markdown.length || 150
								}, removeMarkdown: ${
						global.initVariables.markdown.removeMarkdown || true
					})
              }
            }`,
					variables: JSON.stringify({
						id,
					}),
				}),
			}).then((res) => res.json());

			if (info.errors)
				throw new Error(
					`Replit GraphQL Error(s): ${JSON.stringify(info.errors)}`
				);
			else return info.data.post;
		} else {
			throw new Error(
				`${constants.initVariables.username} is not whitelisted. Please contact @RayhanADev in ReplTalk to talk about getting added to the whitelist.`
			);
		}
	}

	async createPostVote(id) {
		if (!global.cookies) {
			throw new Error('ReplAPI.it: Not logged in.');
		} else if (['RayhanADev'].includes(constants.initVariables.username)) {
			if (typeof id !== 'number') {
				throw new Error(`Id must be of type number. Got type ${typeof id}.`);
			}

			headers['Set-Cookie'] = global.cookies;
			const info = await fetch(constants.graphql, {
				method: 'POST',
				headers,
				body: JSON.stringify({
					query: `
            mutation CreatePostVote($id: Int!) {
              createPostVote(id: $id) {
                id
                user { username }
                  post {
                    id
                    title
                    preview(length: ${
											constants.initVariables.markdown.length || 150
										}, removeMarkdown: ${
						global.initVariables.markdown.removeMarkdown || true
					})
                  }
              }
            }`,
					variables: JSON.stringify({
						id,
					}),
				}),
			}).then((res) => res.json());

			if (info.errors)
				throw new Error(
					`Replit GraphQL Error(s): ${JSON.stringify(info.errors)}`
				);
			else return info.data.createPostVote;
		} else {
			throw new Error(
				`${constants.initVariables.username} is not whitelisted. Please contact @RayhanADev in ReplTalk to talk about getting added to the whitelist.`
			);
		}
	}

	async deletePostVote(id) {
		if (!global.cookies) {
			throw new Error('ReplAPI.it: Not logged in.');
		} else if (['RayhanADev'].includes(constants.initVariables.username)) {
			if (typeof id !== 'number') {
				throw new Error(`Id must be of type number. Got type ${typeof id}.`);
			}

			headers['Set-Cookie'] = global.cookies;
			const info = await fetch(constants.graphql, {
				method: 'POST',
				headers,
				body: JSON.stringify({
					query: `
            mutation DeletePostVote($id: Int!) {
              deletePostVote(id: $id) {
                id
                user { username }
                post {
                  id
                  title
                  preview(length: ${
										constants.initVariables.markdown.length || 150
									}, removeMarkdown: ${
						constants.initVariables.markdown.removeMarkdown || true
					})
                }
              }
            }`,
					variables: JSON.stringify({
						id,
					}),
				}),
			}).then((res) => res.json());

			if (info.errors)
				throw new Error(
					`Replit GraphQL Error(s): ${JSON.stringify(info.errors)}`
				);
			else return info.data.createPostVote;
		} else {
			throw new Error(
				`${constants.initVariables.username} is not whitelisted. Please contact @RayhanADev in ReplTalk to talk about getting added to the whitelist.`
			);
		}
	}

	async posts(after = '', count = 10, order = '') {
		const info = await fetch(constants.graphql, {
			method: 'POST',
			headers,
			body: JSON.stringify({
				query: `
          query Posts($after: String!, $count: Int!, $order: String!) {
            posts(after: $after, count: $count, order: $order) {
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
          }`,
				variables: JSON.stringify({
					after,
					count,
					order,
				}),
			}),
		}).then((res) => res.json());

		if (info.errors)
			throw new Error(
				`Replit GraphQL Error(s): ${JSON.stringify(info.errors)}`
			);

		if (!info.data.posts) {
			throw new Error('Could not fetch posts.');
		} else {
			return info.data.posts;
		}
	}
}
