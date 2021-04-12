let headers = require('../utils/headers.js');
let constants = require('../utils/constants.js');

class Post {
	constructor(id) {
		this.id = id;
	}

	async postData() {
		let id = this.id;
		if (typeof id != 'number') {
			throw new Error(`${id} is not a post. Please query posts on Repl.it.`);
		}

		let info = await variables
			.fetch(variables.graphql, {
				method: 'POST',
				headers,
				body: JSON.stringify({
					query: `
				  query Post($id: Int!) {
					  post(id: $id) {
              ${variables.postAttributes}
					  }
					}`,
					variables: JSON.stringify({
						id: id
					})
				})
			})
			.then(res => res.json());

		if (!info.data.post) {
			throw new Error(`${id} is not a post. Please query posts on Repl.it.`);
		} else {
			return info.data.post;
		}
	}

	async recentComments() {
		let id = this.id;
		if (typeof id != 'number') {
			throw new Error(`${id} is not a post. Please query posts on Repl.it.`);
		}

		let info = await variables
			.fetch(variables.graphql, {
				method: 'POST',
				headers,
				body: JSON.stringify({
					query: `
				  query Post($id: Int!) {
				    post(id: $id) {
  					  recentComments {
                 ${variables.commentAttributes}
  					  }
				    }
					}`,
					variables: JSON.stringify({
						id: id
					})
				})
			})
			.then(res => res.json());

		if (!info.data.post) {
			throw new Error(`${id} is not a post. Please query posts on Repl.it.`);
		} else {
			return info.data.post.recentComments;
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
					.fetch(variables.graphql, {
						method: 'POST',
						headers,
						body: JSON.stringify({
							query: `
      				  mutation createComment($id: Int!, $message: String!) {
                  createComment(input: { body: $message, postId: $id }) {
                    comment { ${variables.commentAttributes} }
                  }
                }`,
							variables: JSON.stringify({
								id: id,
								message: message
							})
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
}

module.exports = {
	Post: Post
};
