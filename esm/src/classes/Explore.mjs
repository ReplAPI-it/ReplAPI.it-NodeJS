import fetch from 'node-fetch';

import headers from '../utils/headers.mjs';
import constants from '../utils/constants.mjs';

export default class Explore {
	constructor(tag) {
		this.tag = tag;
	}

	async exploreFeaturedRepls() {
		const info = await fetch(constants.graphql, {
			method: 'POST',
			headers,
			body: JSON.stringify({
				query: `
					query ExploreFeaturedRepls {
						featuredRepls {
							${constants.replAttributes}
						}
					}`,
			}),
		}).then((res) => res.json());

		if (info.errors)
			throw new Error(
				`Replit GraphQL Error(s): ${JSON.stringify(info.errors)}`
			);

		if (!info.data.featuredRepls) {
			throw new Error(`Cannot fetch explore.`);
		} else {
			return info.data.featuredRepls;
		}
	}

	async exploreTrendingTags() {
		const info = await fetch(constants.graphql, {
			method: 'POST',
			headers,
			body: JSON.stringify({
				query: `
					query ExploreFeaturedRepls {
						trendingTagsFeed {
							tags
						}
					}`,
			}),
		}).then((res) => res.json());

		if (info.errors)
			throw new Error(
				`Replit GraphQL Error(s): ${JSON.stringify(info.errors)}`
			);

		if (!info.data.trendingTagsFeed.tags) {
			throw new Error(`Cannot fetch explore.`);
		} else {
			return info.data.trendingTagsFeed.tags;
		}
	}

	async exploreTagData() {
		const { tag } = this;

		const info = await fetch(constants.graphql, {
			method: 'POST',
			headers,
			body: JSON.stringify({
				query: `
					query ExploreTrendingRepls($id: String!) {
						tag(id: $id) {
							${constants.tagAttributes}
						}
					}`,
				variables: JSON.stringify({
					id: tag,
				}),
			}),
		}).then((res) => res.json());

		if (info.errors)
			throw new Error(
				`Replit GraphQL Error(s): ${JSON.stringify(info.errors)}`
			);

		if (!info.data.tag) {
			throw new Error(`Cannot fetch explore.`);
		} else {
			return info.data.tag;
		}
	}

	async exploreTagRepls(after = '') {
		const { tag } = this;

		const info = await fetch(constants.graphql, {
			method: 'POST',
			headers,
			body: JSON.stringify({
				query: `
					query ExploreTrendingRepls($id: String!, $after: String!) {
						tag(id: $id) {
							repls(after: $after) {
								items {
									${constants.replAttributes}
								}
							}
						}
					}`,
				variables: JSON.stringify({
					id: tag,
					after,
				}),
			}),
		}).then((res) => res.json());

		if (info.errors)
			throw new Error(
				`Replit GraphQL Error(s): ${JSON.stringify(info.errors)}`
			);

		if (!info.data.tag.repls.items) {
			throw new Error(`Cannot fetch explore.`);
		} else {
			return info.data.tag.repls.items;
		}
	}
}
