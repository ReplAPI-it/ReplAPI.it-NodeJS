import constants from '../utils/constants.js';
import BaseClass from './BaseClass.js';

export default class Explore extends BaseClass {
	constructor(tag) {
		super();
		this.tag = tag;
	}

	async exploreFeaturedRepls() {
		const items = {
			featuredRepls: {
				args: [],
				items: { ...constants.replAttributes },
			},
		};
		const variables = {};

		const info = await this.runGraphQL({
			name: 'ExploreFeaturedRepls',
			variables,
			items,
		});

		if (!info.data.featuredRepls) {
			throw new Error(`UserError: Cannot fetch explore featured repls.`);
		} else {
			return info.data.featuredRepls;
		}
	}

	async exploreTrendingTags() {
		const items = {
			trendingTagsFeed: {
				args: [],
				items: { tags: '' },
			},
		};
		const variables = {};

		const info = await this.runGraphQL({
			name: 'ExploreTrendingTags',
			variables,
			items,
		});

		if (!info.data.trendingTagsFeed) {
			throw new Error(`UserError: Cannot fetch explore trending tags.`);
		} else {
			return info.data.trendingTagsFeed;
		}
	}

	async exploreTagData() {
		const { tag } = this;

		const items = {
			tag: {
				args: [{ id: 'id' }],
				items: { ...constants.tagAttributes },
			},
		};
		const variables = {
			id: ['String!', tag],
		};

		const info = await this.runGraphQL({
			name: 'ExploreTagData',
			variables,
			items,
		});

		if (!info.data.tag) {
			throw new Error(`UserError: Cannot fetch explore tag data.`);
		} else {
			return info.data.tag;
		}
	}

	async exploreTagTrendingRepls() {
		const { tag } = this;

		const items = {
			tag: {
				args: [{ id: 'id' }],
				items: {
					trendingRepls: {
						args: [],
						items: {
							...constants.replAttributes,
						},
					},
				},
			},
		};
		const variables = {
			id: ['String!', tag],
		};

		const info = await this.runGraphQL({
			name: 'ExploreTagTrendingRepls',
			variables,
			items,
		});

		if (!info.data.tag) {
			throw new Error(`UserError: Cannot fetch explore tag repls.`);
		} else {
			return info.data.tag;
		}
	}

	async exploreTagTrendingReplsFeed() {
		const { tag } = this;

		const items = {
			tag: {
				args: [{ id: 'id' }],
				items: {
					trendingReplsFeed: {
						args: [],
						items: {
							replIds: '',
						},
					},
				},
			},
		};
		const variables = {
			id: ['String!', tag],
		};

		const info = await this.runGraphQL({
			name: 'ExploreTagTrendingReplsFeed',
			variables,
			items,
		});

		if (!info.data.tag) {
			throw new Error(`UserError: Cannot fetch explore tag repls feed.`);
		} else {
			return info.data.tag;
		}
	}
}
