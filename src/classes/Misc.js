let headers = require('../utils/headers.js');
let constants = require('../utils/constants.js');

class Misc {
	async userSearch(query, limit) {
		if (!global.cookies) {
			throw new Error('Not logged in.');
		} else {
			if (!query)
				throw new Error(
					'User Search needs a query to search. Please supply a query.'
				);
			if (!limit) limit = 10;

			headers.Cookie = global.cookies;
			let info = await variables
				.fetch(variables.graphql, {
					method: 'POST',
					headers,
					body: JSON.stringify({
						query: `
      			  query UserSearch($query: String!, $limit: Int!) {
              	usernameSearch(query: $query, limit: $limit) {
                  ${variables.userAttributes}
                }
              }`,
						variables: JSON.stringify({
							query: query,
							limit: limit
						})
					})
				}).then(res => res.json());

			if (!info.data.usernameSearch) {
				throw new Error(`Cannot fetch users.`);
			} else {
				return info.data.usernameSearch;
			}
		}
	}

	async isAuthenticated() {
		if (!global.cookies) {
			throw new Error('Not logged in.');
		} else {
			headers.Cookie = global.cookies;
			let info = await variables
				.fetch(variables.is_authenticated, {
					method: 'GET',
					headers
				}).then(res => res.json());

			if (!info) {
				throw new Error(`Cannot fetch authentication data.`);
			} else {
				return info;
			}
		}
	}
}

module.exports = {
	Misc: Misc
};
