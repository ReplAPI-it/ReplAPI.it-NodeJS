import parser from 'rss-url-parser';
import { findIndex } from 'lodash-es';

export default class Blog {
	async blogData() {
		const feed = await parser('https://blog.replit.com/feed.xml');
		const { title, description, link, xmlUrl } = feed[0].meta;

		return {
			title,
			description,
			link,
			xmlUrl,
		};
	}

	async blogItem(guid) {
		const feed = await parser('https://blog.replit.com/feed.xml');
		const mappedFeed = feed.map((item) => {
			delete item.meta;
			delete item['rss:@'];
			delete item['rss:title'];
			delete item['rss:guid'];
			delete item['rss:description'];
			delete item['rss:pubDate'];
			delete item['rss:pubdate'];
			delete item['@'];
			delete item['#'];
			return item;
		});
		const postIndex = findIndex(mappedFeed, ['guid', guid]);

		return mappedFeed[postIndex];
	}

	async blogItems(order = 'newest', count = 10) {
		const feed = await parser('https://blog.replit.com/feed.xml');
		const mappedFeed = feed.map((item) => {
			delete item.meta;
			delete item['rss:@'];
			delete item['rss:title'];
			delete item['rss:guid'];
			delete item['rss:description'];
			delete item['rss:pubDate'];
			delete item['rss:pubdate'];
			delete item['@'];
			delete item['#'];
			return item;
		});
		if (order === 'oldest') mappedFeed.reverse();
		const posts = mappedFeed.slice(0, count);

		return posts;
	}
}
