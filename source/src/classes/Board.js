import fetch from 'node-fetch';

import headers from '../utils/headers.mjs';
import constants from '../utils/constants.mjs';

export default class Board {
	constructor(slug) {
		this.slug = slug;
	}

	async boardData() {
		const { slug } = this;
		const info = await fetch(constants.graphql, {
			method: 'POST',
			headers,
			body: JSON.stringify({
				query: `
          query Board($slug: String!) {
            boardBySlug(slug: $slug) {
              ${constants.boardAttributes}
            }
          }`,
				variables: JSON.stringify({
					slug,
				}),
			}),
		}).then((res) => res.json());

		if (info.errors)
			throw new Error(
				`Replit GraphQL Error(s): ${JSON.stringify(info.errors)}`
			);

		if (!info.data.boardBySlug) {
			throw new Error(`${slug} is not a board. Please query boards on Replit.`);
		} else {
			return info.data.boardBySlug;
		}
	}

	async boardPosts(after = '', count = 5, order = '') {
		const { slug } = this;
		const output = [];

		async function recurse(recurseAfter) {
			if (recurseAfter === null) return;

			const info = await fetch(constants.graphql, {
				method: 'POST',
				headers,
				body: JSON.stringify({
					query: `
            query BoardPosts($slug: String!, $after: String!, $count: Int!, $order: String!) {
              boardBySlug(slug: $slug) {
                posts(count: $count, after: $after, order: $order) {
                  items { 
                    id
                    title
                    preview(length: ${
											global.initVariables.markdown.length || 150
										}, removeMarkdown: ${
						global.initVariables.markdown.removeMarkdown || true
					})
                  }
                  pageInfo {
                    nextCursor
                  }
                }
              }
            }`,
					variables: JSON.stringify({
						slug,
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

			if (!info.data.boardBySlug) {
				throw new Error(
					`${slug} is not a board. Please query boards on Replit.`
				);
			} else {
				info.data.boardBySlug.posts.items.forEach((post) => {
					output.push(post);
				});
				if (output.length !== count) {
					await recurse(info.data.boardBySlug.posts.pageInfo.nextCursor);
				}
			}
		}

		await recurse(after);
		return output;
	}
}
