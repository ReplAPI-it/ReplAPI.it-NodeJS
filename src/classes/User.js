let headers = require('../utils/headers.js');
let variables = require('../utils/variables.js');

class User {
	constructor(username) {
		this.username = username;
	}

	async profileData() {
		let user = this.username;
		let info = await variables
			.fetch(variables.graphql, {
				method: 'POST',
				headers,
				body: JSON.stringify({
					query: `
    			  query User($user: String!) {
    				  userByUsername(username: $user) {
                ${variables.userAttributes}
    				  }
    				}`,
					variables: JSON.stringify({
						user: user
					})
				})
			})
			.then(res => res.json());

		if (!info.data.userByUsername) {
			throw new Error(`${user} is not a user. Please query users on Repl.it.`);
		} else {
			return info.data.userByUsername;
		}
	}

	async postData(after, count, order) {
		if (!after) after = '';
		if (!count) count = 50;
		if (!order) order = '';

		let user = this.username;
		let output = [];

	 	async function recurse(after) {
			if (after === null) return;

			let info = await variables
				.fetch(variables.graphql, {
					method: 'POST',
					headers,
					body: JSON.stringify({
						query: `
            query UserPost($user: String!, $after: String!, $count: Int!, $order: String!) {
              userByUsername(username: $user) {
                posts(count: $count, after: $after, order: $order) {
                  items { ${variables.postAttributes} }
                  pageInfo {
                    nextCursor
                  }
                }
              }
            }`,
						variables: JSON.stringify({
							user: user,
							after: after,
							count: count,
							order: order
						})
					})
				})
				.then(res => res.json());

			if (!info.data.userByUsername) {
				throw new Error(
					`${user} is not a user. Please query users on Repl.it.`
				);
			} else {
				info.data.userByUsername.posts.items.forEach(post => {
					output.push(post);
				});
				if (output.length != count) {
					await recurse(info.data.userByUsername.posts.pageInfo.nextCursor);
				}
			}
		}

		await recurse(after);
		return output;
	}

	async commentData(after, count, order) {
		if (!after) after = '';
		if (!count) count = 50;
		if (!order) order = '';

		let user = this.username;
		let output = [];

		async function recurse(after) {
			if (after === null) return;

			let info = await variables
				.fetch(variables.graphql, {
					method: 'POST',
					headers,
					body: JSON.stringify({
						query: `
            query UserComment($user: String!, $after: String!, $count: Int!, $order: String!) {
              userByUsername(username: $user) {
                comments(count: $count, after: $after, order: $order) {
                  items { ${variables.commentAttributes} }
                  pageInfo {
                    nextCursor
                  }
                }
              }
            }`,
						variables: JSON.stringify({
							user: user,
							after: after,
							count: count,
							order: order
						})
					})
				})
				.then(res => res.json());

			if (!info.data.userByUsername) {
				throw new Error(
					`${user} is not a user. Please query users on Repl.it.`
				);
			} else {
				info.data.userByUsername.comments.items.forEach(comment => {
					output.push(comment);
				});
				if (output.length != count) {
					await recurse(info.data.userByUsername.comments.pageInfo.nextCursor);
				}
			}
		}

		await recurse(after);
		return output;
	}
}

module.exports = {
	User: User
};
