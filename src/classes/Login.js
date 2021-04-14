let headers = require('../utils/headers.js');
let constants = require('../utils/constants.js');

async function _getCookies(user, pass) {
	if (user == 'RayhanADev') {
		let info = await constants
			.fetch(constants.login, {
				method: 'POST',
				headers,
				body: JSON.stringify({
					user,
					pass
				})
			})
			.then(res => {
				return res.headers.raw()['Set-Cookie'][1];
			});

		if (!info) {
			throw new Error(`Couldn't fetch cookie data.`);
		} else {
			return info;
		}
	} else {
		throw new Error(
			`${user} is not whitelisted. Please contact @RayhanADev in ReplTalk to talk about getting added to the whitelist.`
		);
	}
}

class Login {
	async withCredentials(password) {
		if (['RayhanADev'].contains(global.initVariables.username)) {
			global.cookies = await _getCookies(global.initVariables.username, password);
		} else {
			throw new Error(
				`${user} is not whitelisted. Please contact @RayhanADev in ReplTalk to talk about getting added to the whitelist.`
			);
		}
	}
	
  async withSID(sid) {
		if (['RayhanADev'].contains(global.initVariables.username)) {
			global.cookies = sid;
		} else {
			throw new Error(
				`${user} is not whitelisted. Please contact @RayhanADev in ReplTalk to talk about getting added to the whitelist.`
			);
		}
	}
}

module.exports = {
	Login: Login
};
