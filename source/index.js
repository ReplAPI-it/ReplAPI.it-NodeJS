import fs from 'fs';
import path from 'path';
import { assign } from 'lodash-es';
// import stringify from 'json-stable-stringify-without-jsonify';
import classes from './src/loader.js';

Object.prototype.sortKeys = function () {
	return Object.fromEntries(Object.entries(this).sort());
}

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
	statsForNerds: '',
};

export default function ReplAPI(initVariables, filetype = '.json') {
	if (initVariables) assign(defaultInitVariables, initVariables);

	switch (filetype) {
		case '.json':
			fs.writeFileSync(
				path.join(process.cwd(), '.replapirc.json'),
				`${JSON.stringify(defaultInitVariables.sortKeys(), null, '\t')}\n`,
				{ encoding: 'utf8' },
			);
			break;
		case '.mjs':
			fs.writeFileSync(
				path.join(process.cwd(), 'replapi.config.mjs'),
				`export default ${JSON.stringify(defaultInitVariables.sortKeys(), null, '\t')}\n`,
				{ encoding: 'utf8' },
			);
			break;
		case '.cjs':
			fs.writeFileSync(
				path.join(process.cwd(), 'replapi.config.cjs'),
				`module.exports = ${JSON.stringify(defaultInitVariables.sortKeys(), null, '\t')}\n`,
				{ encoding: 'utf8' },
			);
			break;
		case '.js':
			fs.writeFileSync(
				path.join(process.cwd(), 'replapi.config.js'),
				`module.exports = ${JSON.stringify(defaultInitVariables.sortKeys(), null, '\t')}\n`,
				{ encoding: 'utf8' },
			);
			break;
		default:
			console.warn(`Invalid file type '${filetype}'`);
			fs.writeFileSync(
				path.join(process.cwd(), '.replapirc.json'),
				`${JSON.stringify(defaultInitVariables.sortKeys(), null, '\t')}\n`,
				{ encoding: 'utf8' },
			);
			break;
	}

	return {
		defaults: defaultInitVariables,
		Blog: classes.Blog,
		Board: classes.Board,
		Explore: classes.Explore,
		User: classes.User,
		Languages: classes.Languages,
	};
}
