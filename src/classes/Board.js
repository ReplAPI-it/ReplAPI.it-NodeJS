let headers = require('../utils/headers.js');
let variables = require('../utils/variables.js');

class Board {
	constructor(slug) {
		this.slug = slug;
	}

	async boardData() {
		let slug = this.slug;
		let info = await variables
			.fetch(variables.graphql, {
				method: 'POST',
				headers,
				body: JSON.stringify({
					query: `
    			  query Board($slug: String!) {
    				  boardBySlug(slug: $slug) {
                ${variables.boardAttributes}
    				  }
    				}`,
					variables: {
						slug
					}
				})
			})
			.then(res => res.json());

		if (!info.data.boardBySlug) {
			throw new Error(`${slug} is not a board. Please query boards on Repl.it.`);
		} else {
			return info.data.boardBySlug;
		}
	}
	
	async boardPosts(after, count, order) {
		if (!after) after = '';
		if (!count) count = 5;
		if (!order) order = '';

		let slug = this.slug;
		let output = [];

		async function recurse(after) {
			if (after === null) return;

			let info = await variables
				.fetch(variables.graphql, {
					method: 'POST',
					headers,
					body: JSON.stringify({
						query: `
            query BoardPosts($slug: String!, $after: String!, $count: Int!, $order: String!) {
              boardBySlug(slug: $slug) {
                posts(count: $count, after: $after, order: $order) {
                  items { ${variables.postAttributes} }
                  pageInfo {
                    nextCursor
                  }
                }
              }
            }`,
						variables: {
							slug,
							after,
							count,
							order
						}
					})
				}).then(res => res.json());

			if (!info.data.boardBySlug) {
				throw new Error(
					`${slug} is not a board. Please query boards on Repl.it.`
				);
			} else {
				info.data.boardBySlug.posts.items.forEach(post => {
					output.push(post);
				});
				if (output.length != count) {
					await recurse(info.data.boardBySlug.posts.pageInfo.nextCursor);
				}
			}
		}

		await recurse(after);
		return output;
	}
}

module.exports = {
	Board: Board
};
