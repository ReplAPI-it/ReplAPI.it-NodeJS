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

export default function ReplAPI(initVariables) {
	if (initVariables) {
		_.assign(defaultInitVariables, initVariables);
		fs.writeFileSync(
			path.join(process.cwd(), '.replapirc.json'),
			`${stringify(defaultInitVariables, { cmp: sortByKey, space: 4 })}\n`,
			{ encoding: 'utf8' }
		);
	} else {
		fs.writeFileSync(
			path.join(process.cwd(), '.replapirc.json'),
			`${stringify(defaultInitVariables, { cmp: sortByKey, space: 4 })}\n`,
			{ encoding: 'utf8' }
		);
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
