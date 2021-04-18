import fetch from 'node-fetch'

import headers from '../utils/headers.js'
import constants from '../utils/constants.js'

export default class Board {
	constructor(slug) {
		this.slug = slug;
	}

	async boardData() {
		let slug = this.slug;
		let info = await fetch(variables.graphql, {
				method: 'POST',
				headers,
				body: JSON.stringify({
					query: `
    			  query Board($slug: String!) {
    				  boardBySlug(slug: $slug) {
                ${variables.boardAttributes}
    				  }
    				}`,
					variables: JSON.stringify({
						slug: slug
					})
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

			let info = await fetch(variables.graphql, {
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
						variables: JSON.stringify({
							slug: slug,
							after: after,
							count: count,
							order: order
						})
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