let headers = require('../utils/headers.js');
let variables = require('../utils/variables.js');

async function _getCookies(user, pass) {
	if (user == 'RayhanADev') {
		let info = await variables
			.fetch(variables.login, {
				method: 'POST',
				headers,
				body: JSON.stringify({
					user,
					pass
				})
			})
			.then(res => {
				return res.headers.raw()['set-cookie'][1];
			});

		if (!info) {
			throw new Error(`Couldn't fetch cookie data.`);
		} else {
			return info;
		}
	} else {
		throw new Error(
			`${user} is not whitelisted. Please contact @RayhanADev in Repl.it to talk about getting added to the whitelist.`
		);
	}
}

class Login {
	constructor(username, password) {
		this.username = username;
		this.password = password;
	}

	async account() {
		let user = this.username;
		let pass = this.password;
		if (user == 'RayhanADev') {
			global.cookies = await _getCookies(user, pass);
		} else {
			throw new Error(
				`${user} is not whitelisted. Please contact @RayhanADev in Repl.it to talk about getting added to the whitelist.`
			);
		}
	}
}

module.exports = {
	Login: Login
};
