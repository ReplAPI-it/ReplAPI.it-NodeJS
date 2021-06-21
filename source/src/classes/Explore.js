import constants from '../utils/constants.js';
import BaseClass from './BaseClass.js';

export default class Board extends BaseClass {
	constructor(slug) {
		super();
		this.slug = slug;
	}

	async boardData() {
		const { slug } = this;
		const items = {
			boardBySlug: {
				args: [{ slug: 'slug' }],
				items: { ...constants.boardAttributes },
			},
		};

		const variables = { slug: ['String!', slug] };
		const info = await this.runGraphQL({ name: 'BoardData', variables, items });

		if (!info.data.boardBySlug) {
			throw new Error(`${slug} is not a board. Please query boards on Replit.`);
		} else {
			return info.data.boardBySlug;
		}
	}

	async boardPosts(after = '', count = 5, order = '') {
		const { slug } = this;
		const items = {
			boardBySlug: {
				args: [{ slug: 'slug' }],
				items: {
					posts: {
						args: [{ count: 'count', after: 'after', order: 'order' }],
						items: {
							items: {
								args: [],
								id: '',
								title: '',
								preview: [
									{
										propOverride: true,
										length: constants.initVariables.markdown.length || 150,
										removeMarkdown:
											constants.initVariables.markdown.removeMarkdown || true,
									},
								],
							},
						},
					},
				},
			},
		};

		const variables = {
			slug: ['String!', slug],
			after: ['String!', after],
			count: ['Int!', count],
			order: ['String!', order],
		};
		const info = await this.runGraphQL({ name: 'BoardData', variables, items });

		if (!info.data.boardBySlug) {
			throw new Error(`${slug} is not a board. Please query boards on Replit.`);
		} else {
			return info.data.boardBySlug.posts.items;
		}
	}
}

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
				`Replit GraphQL Error(s): ${JSON.stringify(info.errors)}`,
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
				`Replit GraphQL Error(s): ${JSON.stringify(info.errors)}`,
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
				`Replit GraphQL Error(s): ${JSON.stringify(info.errors)}`,
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
				`Replit GraphQL Error(s): ${JSON.stringify(info.errors)}`,
			);

		if (!info.data.tag.repls.items) {
			throw new Error(`Cannot fetch explore.`);
		} else {
			return info.data.tag.repls.items;
		}
	}
}
