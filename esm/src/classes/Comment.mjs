import fetch from 'node-fetch';

import headers from '../utils/headers.mjs';
import constants from '../utils/constants.mjs';

export default class Comment {
	constructor(id) {
		this.id = id;
	}

	async commentDataAbridged() {
		const { id } = this;
		if (typeof id !== 'number') {
			throw new Error(
				`${id} is not a comment. Please query comments on Replit.`
			);
		}

		const info = await fetch(constants.graphql, {
			method: 'POST',
			headers,
			body: JSON.stringify({
				query: `
          query Comment($id: Int!) {
            comment(id: $id) {
              id
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

		if (!info.data.comment) {
			throw new Error(
				`${id} is not a comment. Please query comments on Replit.`
			);
		} else {
			return info.data.comment;
		}
	}

	async commentDataFull() {
		const { id } = this;
		if (typeof id !== 'number') {
			throw new Error(
				`${id} is not a comment. Please query comments on Replit.`
			);
		}

		const info = await fetch(constants.graphql, {
			method: 'POST',
			headers,
			body: JSON.stringify({
				query: `
          query Comment($id: Int!) {
            comment(id: $id) {
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
                votes { items { id, user { ${constants.userAttributes} } } }
                answeredBy { ${constants.userAttributes} }
                answer { ${constants.commentAttributes} }
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

		if (!info.data.comment) {
			throw new Error(
				`${id} is not a comment. Please query comments on Replit.`
			);
		} else {
			return info.data.comment;
		}
	}

	async createCommentOnPost(body, postId) {
		if (!global.cookies) {
			throw new Error('ReplAPI.it: Not logged in.');
		} else if (['RayhanADev'].includes(constants.initVariables.username)) {
			if (typeof body !== 'string') {
				throw new Error(
					`Body must be of type string. Got type ${typeof title}.`
				);
			}
			if (typeof postId !== 'number') {
				throw new Error(
					`Post ID must be of type number. Got type ${typeof title}.`
				);
			}

			headers['Set-Cookie'] = global.cookies;
			const info = await fetch(constants.graphql, {
				method: 'POST',
				headers,
				body: JSON.stringify({
					query: `
            mutation CreateComment($input: CreateCommentInput!) {
              createComment(input: $input) {
                comment {
                  id
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
							body,
							postId,
						},
					}),
				}),
			}).then((res) => res.json());

			if (info.errors)
				throw new Error(
					`Replit GraphQL Error(s): ${JSON.stringify(info.errors)}`
				);
			else return info.data.createComment.comment;
		} else {
			throw new Error(
				`${constants.initVariables.username} is not whitelisted. Please contact @RayhanADev in ReplTalk to talk about getting added to the whitelist.`
			);
		}
	}

	async createCommentOnComment(body, commentId) {
		if (!global.cookies) {
			throw new Error('ReplAPI.it: Not logged in.');
		} else if (['RayhanADev'].includes(constants.initVariables.username)) {
			if (typeof body !== 'string') {
				throw new Error(
					`Body must be of type string. Got type ${typeof title}.`
				);
			}
			if (typeof commentId !== 'number') {
				throw new Error(
					`Post ID must be of type number. Got type ${typeof title}.`
				);
			}

			headers['Set-Cookie'] = global.cookies;
			const info = await fetch(constants.graphql, {
				method: 'POST',
				headers,
				body: JSON.stringify({
					query: `
            mutation CreateComment($input: CreateCommentInput!) {
              createComment(input: $input) {
                comment {
                  id
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
							body,
							commentId,
						},
					}),
				}),
			}).then((res) => res.json());

			if (info.errors)
				throw new Error(
					`Replit GraphQL Error(s): ${JSON.stringify(info.errors)}`
				);
			else return info.data.createComment.comment;
		} else {
			throw new Error(
				`${constants.initVariables.username} is not whitelisted. Please contact @RayhanADev in ReplTalk to talk about getting added to the whitelist.`
			);
		}
	}

	async updateComment(id, body) {
		if (!global.cookies) {
			throw new Error('ReplAPI.it: Not logged in.');
		} else if (['RayhanADev'].includes(constants.initVariables.username)) {
			if (typeof id !== 'number') {
				throw new Error(
					`Title must be of type number. Got type ${typeof title}.`
				);
			}
			if (typeof body !== 'string' || typeof body !== 'undefined') {
				throw new Error(
					`Body must be of type string. Got type ${typeof body}.`
				);
			}

			headers['Set-Cookie'] = global.cookies;
			const info = await fetch(constants.graphql, {
				method: 'POST',
				headers,
				body: JSON.stringify({
					query: `
            mutation UpdateComment($input: UpdateCommentInput!) {
              updateComment(input: $input) {
                comment {
                  id
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
							id,
							body,
						},
					}),
				}),
			}).then((res) => res.json());

			if (info.errors)
				throw new Error(
					`Replit GraphQL Error(s): ${JSON.stringify(info.errors)}`
				);
			else return info.data.updateComment.comment;
		} else {
			throw new Error(
				`${constants.initVariables.username} is not whitelisted. Please contact @RayhanADev in ReplTalk to talk about getting added to the whitelist.`
			);
		}
	}

	async deleteComment(id) {
		if (!global.cookies) {
			throw new Error('ReplAPI.it: Not logged in.');
		} else if (['RayhanADev'].includes(constants.initVariables.username)) {
			if (typeof id !== 'number') {
				throw new Error(`Id must be of type number. Got type ${typeof title}.`);
			}

			headers['Set-Cookie'] = global.cookies;
			const info = await fetch(constants.graphql, {
				method: 'POST',
				headers,
				body: JSON.stringify({
					query: `
            mutation DeleteComment($id: Int!) {
              deleteComment(id: $id) {
                id
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
			else return info.data.comment;
		} else {
			throw new Error(
				`${constants.initVariables.username} is not whitelisted. Please contact @RayhanADev in ReplTalk to talk about getting added to the whitelist.`
			);
		}
	}

	async createCommentVote(id) {
		if (!global.cookies) {
			throw new Error('ReplAPI.it: Not logged in.');
		} else if (['RayhanADev'].includes(constants.initVariables.username)) {
			if (typeof id !== 'number') {
				throw new Error(`Id must be of type number. Got type ${typeof title}.`);
			}

			headers['Set-Cookie'] = global.cookies;
			const info = await fetch(constants.graphql, {
				method: 'POST',
				headers,
				body: JSON.stringify({
					query: `
            mutation CreateCommentVote($id: Int!) {
              createCommentVote(id: $id) {
                id
                user { username }
                comment {
                  id
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
			else return info.data.createCommentVote;
		} else {
			throw new Error(
				`${constants.initVariables.username} is not whitelisted. Please contact @RayhanADev in ReplTalk to talk about getting added to the whitelist.`
			);
		}
	}

	async deleteCommentVote(id) {
		if (!global.cookies) {
			throw new Error('ReplAPI.it: Not logged in.');
		} else if (['RayhanADev'].includes(constants.initVariables.username)) {
			if (typeof id !== 'number') {
				throw new Error(`Id must be of type number. Got type ${typeof title}.`);
			}

			headers['Set-Cookie'] = global.cookies;
			const info = await fetch(constants.graphql, {
				method: 'POST',
				headers,
				body: JSON.stringify({
					query: `
            mutation DeleteCommentVote($id: Int!) {
              deleteCommentVote(id: $id) {
                id
                user { username }
                comment {
                  id
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
			else return info.data.createCommentVote;
		} else {
			throw new Error(
				`${constants.initVariables.username} is not whitelisted. Please contact @RayhanADev in ReplTalk to talk about getting added to the whitelist.`
			);
		}
	}
}
