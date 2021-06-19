import fs from 'fs';
import path from 'path';
import _ from 'lodash';
import stringify from 'json-stable-stringify-without-jsonify';
import classes from './src/loader.js';

const defaultInitVariables = {
	username: '',
	captcha: {
		token: '',
	},
	endpoints: {
		gql: '',
		restful: '',
		login: '',
	},
	markdown: {
		length: '',
		removeMarkdown: '',
	},
	previewCount: {
		comments: '',
	},
	experimentalFeatures: '',
	createDatabaseFlag: '',
};

function sortByKey(a, b) {
	return a.key > b.key ? 1 : -1;
}

export default function ReplAPI(initVariables, filetype = '.json') {
	if (initVariables) _.assign(defaultInitVariables, initVariables);

	switch (filetype) {
		case '.json':
			fs.writeFileSync(
				path.join(process.cwd(), '.replapirc.json'),
				`${stringify(defaultInitVariables, {
					cmp: sortByKey,
					space: 4,
				})}\n`,
				{ encoding: 'utf8' },
			);
			break;
		case '.mjs':
			fs.writeFileSync(
				path.join(process.cwd(), 'replapi.config.mjs'),
				`export default ${stringify(defaultInitVariables, {
					cmp: sortByKey,
					space: 4,
				})}\n`,
				{ encoding: 'utf8' },
			);
			break;
		case '.cjs':
			fs.writeFileSync(
				path.join(process.cwd(), 'replapi.config.cjs'),
				`module.exports = ${stringify(defaultInitVariables, {
					cmp: sortByKey,
					space: 4,
				})}\n`,
				{ encoding: 'utf8' },
			);
			break;
		case '.js':
			fs.writeFileSync(
				path.join(process.cwd(), 'replapi.config.js'),
				`module.exports = ${stringify(defaultInitVariables, {
					cmp: sortByKey,
					space: 4,
				})}\n`,
				{ encoding: 'utf8' },
			);
			break;
		default:
			console.warn(`Invalid file type '${filetype}'`);
			fs.writeFileSync(
				path.join(process.cwd(), '.replapirc.json'),
				`${stringify(defaultInitVariables, {
					cmp: sortByKey,
					space: 4,
				})}\n`,
				{ encoding: 'utf8' },
			);
			break;
	}

	return {
		defaults: defaultInitVariables,
		Board: classes.Board,
	};
}
