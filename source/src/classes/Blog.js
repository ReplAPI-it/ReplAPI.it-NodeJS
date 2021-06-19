import Parser from 'rss-parser';
import { findIndex } from 'lodash-es';

const parser = new Parser();

export default class Blog {
	async blogData() {
		const feed = await parser.parseURL('https://blog.replit.com/feed.xml');
		delete feed.items;

		return feed;
	}

	async blogItem(guid) {
		const { items } = await parser.parseURL('https://blog.replit.com/feed.xml');
		const postIndex = findIndex(items, ['guid', guid]);

		return items[postIndex];
	}

	async blogItems(order = 'newest', count = 10) {
		const feed = await parser.parseURL('https://blog.replit.com/feed.xml');

		if (order === 'oldest') feed.items.reverse();
		const posts = feed.items.slice(0, count);

		return posts;
	}
}
