let headers = require('../utils/headers.js');
let variables = require('../utils/variables.js');

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
				.fetch('https://staging.repl.it/graphql', {
					method: 'POST',
					headers,
					body: JSON.stringify({
						query: `
      			  query UserSearch($query: String!, $limit: Int!) {
              	usernameSearch(query: $query, limit: $limit) {
                  ${variables.userAttributes}
                }
              }`,
						variables: {
							query,
							limit
						}
					})
				}).then(res => res.json());

			if (!info.data.usernameSearch) {
				throw new Error(`Cannot fetch users.`);
			} else {
				return info.data.usernameSearch;
			}
		}
	}
}

module.exports = {
	Misc: Misc
};
