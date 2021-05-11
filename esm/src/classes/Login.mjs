import fetch from 'node-fetch';

import headers from '../utils/headers.mjs';
import constants from '../utils/constants.mjs';

async function getCookies(username, password) {
	if (['RayhanADev'].includes(global.initVariables.username)) {
		const info = await fetch(constants.login, {
			method: 'POST',
			headers,
			body: JSON.stringify({
				username,
				password,
				captcha: global.initVariables.captcha.token,
				hCaptchaSiteKey: '7f7c5b9f-8cff-49f3-ab09-5666dca1104b',
			}),
		}).then((res) => res.headers.raw()['set-cookie'][1]);

		if (!info) {
			throw new Error("Couldn't fetch cookie data.");
		} else {
			return info;
		}
	} else {
		throw new Error(
			`${global.initVariables.username} is not whitelisted. Please contact @RayhanADev in ReplTalk to talk about getting added to the whitelist.`
		);
	}
}

export default class Login {
	async withCredentials(password) {
		if (['RayhanADev'].includes(global.initVariables.username)) {
			global.cookies = await getCookies(
				global.initVariables.username,
				password
			);
		} else {
			throw new Error(
				`${global.initVariables.username} is not whitelisted. Please contact @RayhanADev in ReplTalk to talk about getting added to the whitelist.`
			);
		}
	}

	async withSID(sid) {
		if (['RayhanADev'].includes(global.initVariables.username)) {
			global.cookies = sid;
		} else {
			throw new Error(
				`${global.initVariables.username} is not whitelisted. Please contact @RayhanADev in ReplTalk to talk about getting added to the whitelist.`
			);
		}
	}
}
