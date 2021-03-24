let headers = require('../utils/headers.js');
let variables = require('../utils/variables.js');

async function _getReplId(username, slug) {
	let info = await variables
		.fetch(`https://replit.com/data/repls/@${username}/${slug}`, {
			method: 'GET',
			headers
		})
		.then(res => res.json());

	return info.id;
}

class Repl {
	constructor(username, slug) {
		this.username = username;
		this.slug = slug;
	}

	async replGraphQLData() {
		let username = this.username;
		let slug = this.slug;

		let id = await _getReplId(username, slug);
		let info = await variables
			.fetch(variables.graphql, {
				method: 'POST',
				headers,
				body: JSON.stringify({
					query: `
    			  query Repl($id: String!) {
    				  repl(id: $id) {
    				    ... on Repl {
                  ${variables.replAttributes}
    				    }
    				  }
    				}`,
					variables: {
						id
					}
				})
			})
			.then(res => res.json());

		if (!info.data.repl) {
			throw new Error(`${slug} is not a repl. Please query repls on Repl.it.`);
		} else {
			return info.data.repl;
		}
	}

	async replRESTData() {
	  let username = this.username;
	  let slug = this.slug;
	  
		let info = await variables
			.fetch(`https://replit.com/data/repls/@${username}/${slug}`, {
				method: 'GET',
				headers
			})
			.then(res => res.json());

		if (!info) {
			throw new Error(`${slug} is not a repl. Please query repls on Repl.it.`);
		} else {
			return info;
		}
	}
}

module.exports = {
	Repl: Repl
};
