import { lightfetch } from 'lightfetch-node';
import { gqlQueryCreator as queryCreator } from 'gql-query-creator';

import headers from '../utils/headers.js';
import constants from '../utils/constants.js';

async function runGraphQL({ name, variables, items }, options = {}) {
	const body = queryCreator(name, variables, items);

	if (options.authRequired === true) {
		if (!global.cookies)
			throw new Error(
				'ReplAPI.it Error: You are not logged in! Please use the Login class to set your login.',
			);
		if (
			!['RayhanADev', 'ReplAPIit'].includes(constants.initVariables.username) ||
			!['RayhanADev', 'ReplAPIit'].includes(process.env.REPL_OWNER)
		)
			throw new Error(
				'ReplAPI.it Error: This user is not whitelisted. To gain access to the whitelist contact RayhanADev.',
			);
		headers.cookie = 'connect.sid=' + global.cookies;
		body.captcha = constants.initVariables.captcha.token;
		body.clientVersion = '7561851';
		body.format = 'pbuf';
		body.hCaptchaSiteKey = '473079ba-e99f-4e25-a635-e9b661c7dd3e';
	}

	const info = await lightfetch(constants.graphql, {
		body,
		headers,
		method: 'POST',
	});

	try {
		return info.toJSON();
	} catch (error) {
		throw new Error(
			'ReplAPI.it Error: Could not parse response data. This is likely because of some Replit error, please open an issue on the main Repository to let us know!',
		);
	}
}

export default class BaseClass {
	async runGraphQL(data, options) {
		const info = await runGraphQL(data, options);

		if (info.errors)
			throw new Error(`\nReplit GraphQL Errors:${info.errors.map((error) => `\n\t- ${error.message}`)}\n`);
		return info;
	}
}
