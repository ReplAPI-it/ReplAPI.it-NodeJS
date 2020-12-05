let headers = require('../utils/headers.js');
let variables = require('../utils/variables.js');

class Comment {
	constructor(id) {
		this.id = id;
	}

	async commentData() {
		let id = this.id;
		if (typeof id != 'number') {
			throw new Error(
				`${id} is not a comment. Please query comments on Repl.it.`
			);
		}

		let info = await variables
			.fetch('https://repl.it/graphql', {
				method: 'POST',
				headers,
				body: JSON.stringify({
					query: `
				  query Comment($id: Int!) {
					  comment(id: $id) {
              ${variables.commentAttributes}
					  }
					}`,
					variables: {
						id
					}
				})
			})
			.then(res => res.json());

		if (!info.data.comment) {
			throw new Error(
				`${id} is not a comment. Please query comments on Repl.it.`
			);
		} else {
			return info.data.comment;
		}
	}

	async createComment(message) {
		if (!global.cookies) {
			throw new Error('Not logged in.');
		} else {
			if (this.username == 'RayhanADev') {
				let id = this.id;
				if (typeof id != 'number') {
					throw new Error(
						`${id} is not a post. Please query posts on Repl.it.`
					);
				}
				if (typeof message != 'string') {
					throw new Error(
						`Message must be of type string. Got type ${typeof message}.`
					);
				}

				headers.Cookie = global.cookies;
				let info = await variables
					.fetch('https://repl.it/graphql', {
						method: 'POST',
						headers,
						body: JSON.stringify({
							query: `
				  mutation createComment($id: Int!, $message: String!) {
            createComment(input: { body: $message, commentId: $id }) {
              comment { ${variables.commentAttributes} }
            }
          }`,
							variables: {
								id,
								message
							}
						})
					})
					.then(res => res.json());

				if (!info.data.createComment) {
					throw new Error(
						`${id} is not a post. Please query posts on Repl.it.`
					);
				} else {
					return info.data.createComment;
				}
			} else {
				throw new Error(
					`${user} is not whitelisted. Please contact @RayhanADev in Repl.it to talk about getting added to the whitelist.`
				);
			}
		}
	}

	async deleteComment() {
		if (!global.cookies) {
			throw new Error('Not logged in.');
		} else {
			if (this.username == 'RayhanADev') {
				let id = this.id;
				if (typeof id != 'number') {
					throw new Error(
						`${id} is not a post. Please query posts on Repl.it.`
					);
				}

				headers.Cookie = global.cookies;
				let info = await variables
					.fetch('https://repl.it/graphql', {
						method: 'POST',
						headers,
						body: JSON.stringify({
							query: `
				  mutation deleteComment($id: Int!) {
            deleteComment(id: $id ) {
              ${variables.commentAttributes}
            }
          }`,
							variables: {
								id
							}
						})
					})
					.then(res => res.json());

				if (!info.data.deleteComment) {
					throw new Error(
						`${id} is not a post. Please query posts on Repl.it.`
					);
				} else {
					return info.data.deleteComment;
				}
			} else {
				throw new Error(
					`${user} is not whitelisted. Please contact @RayhanADev in Repl.it to talk about getting added to the whitelist.`
				);
			}
		}
	}

	async updateComment(message) {
		if (!global.cookies) {
			throw new Error('Not logged in.');
		} else {
			if (this.username == 'RayhanADev') {
				let id = this.id;
				if (typeof id != 'number') {
					throw new Error(
						`${id} is not a post. Please query posts on Repl.it.`
					);
				}
				if (typeof message != 'string') {
					throw new Error(
						`Message must be of type string. Got type ${typeof message}.`
					);
				}

				headers.Cookie = global.cookies;
				let info = await variables
					.fetch('https://repl.it/graphql', {
						method: 'POST',
						headers,
						body: JSON.stringify({
							query: `
				  mutation updateComment($id: Int!, $message: String!) {
            updateComment(input: { body: $message, commentId: $id }) {
              comment { ${variables.commentAttributes} }
            }
          }`,
							variables: {
								id,
								message
							}
						})
					})
					.then(res => res.json());

				if (!info.data.updateComment) {
					throw new Error(
						`${id} is not a post. Please query posts on Repl.it.`
					);
				} else {
					return info.data.updateComment;
				}
			}
		}
	}
}

module.exports = {
	Comment: Comment
};
