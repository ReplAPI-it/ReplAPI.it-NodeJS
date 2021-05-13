import 'core-js/stable/index.js';
import 'regenerator-runtime/runtime.js';
import fs from 'fs';
import path from 'path';
import _ from 'lodash';
import stringify from 'json-stable-stringify-without-jsonify';
import classes from './src/loader.mjs';

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
	if (initVariables) {
		_.assign(defaultInitVariables, initVariables);
	}

	switch (filetype) {
		case '.json':
			fs.writeFileSync(
				path.join(process.cwd(), '.replapirc.json'),
				`${stringify(defaultInitVariables, { cmp: sortByKey, space: 4 })}\n`,
				{ encoding: 'utf8' }
			);
			break;
		case '.mjs':
			fs.writeFileSync(
				path.join(process.cwd(), 'replapi-it.config.mjs'),
				`export default ${stringify(defaultInitVariables, {
					cmp: sortByKey,
					space: 4,
				})}\n`,
				{ encoding: 'utf8' }
			);
			break;
		case '.cjs':
			fs.writeFileSync(
				path.join(process.cwd(), 'replapi-it.config.cjs'),
				`module.exports = ${stringify(defaultInitVariables, {
					cmp: sortByKey,
					space: 4,
				})}\n`,
				{ encoding: 'utf8' }
			);
			break;
		case '.js':
			fs.writeFileSync(
				path.join(process.cwd(), 'replapi-it.config.js'),
				`module.exports = ${stringify(defaultInitVariables, {
					cmp: sortByKey,
					space: 4,
				})}\n`,
				{ encoding: 'utf8' }
			);
			break;
		default:
			fs.writeFileSync(
				path.join(process.cwd(), '.replapirc.json'),
				`${stringify(defaultInitVariables, { cmp: sortByKey, space: 4 })}\n`,
				{ encoding: 'utf8' }
			);
			break;
	}

	return {
		defaults: defaultInitVariables,
		Blog: classes.Blog,
		Board: classes.Board,
		Comment: classes.Comment,
		CustomDataQuery: classes.CustomDataQuery,
		CustomRecursiveQuery: classes.CustomRecursiveQuery,
		Explore: classes.Explore,
		Database: classes.Database,
		Languages: classes.Languages,
		Leaderboard: classes.Leaderboard,
		Login: classes.Login,
		Notifications: classes.Notifications,
		Post: classes.Post,
		Repl: classes.Repl,
		User: classes.User,
	};
}
