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
								items: {
									id: '',
									title: '',
									preview: [
										{
											propOverride: true,
											length: constants.initVariables.markdown.length || 150,
											removeMarkdown: constants.initVariables.markdown.removeMarkdown || true,
										},
									],
								}
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
