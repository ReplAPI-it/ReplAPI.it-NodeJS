import HTMLParser from 'node-html-parser';
import { lightfetch } from 'lightfetch-node';

async function fetchVariable() {
	const html = await lightfetch('https://replit.com/', {
		method: 'GET',
		headers: {
			'X-Requested-With': 'ReplAPI.it',
			Referrer: 'https://replit.com/',
		},
	}).then((res) => res.toText());

	const root = HTMLParser.parse(html, {
		lowerCaseTagName: false,
		comment: false,
		blockTextElements: {
			script: true,
			noscript: true,
			style: true,
			pre: true,
		},
	});

	return JSON.parse(
		Buffer.from(
			root.childNodes[1].childNodes[0].childNodes[1].childNodes[0].rawText
				.split("'")[1]
				.split("'")[0],
			'base64',
		).toString(),
	);
}

export default class Languages {
	constructor(lang) {
		this.lang = lang;
	}

	async langData() {
		const langs = await fetchVariable();
		return langs[this.lang];
	}

	async langDataAll() {
		const langs = await fetchVariable();
		return langs;
	}
}
