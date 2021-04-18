import fetch from 'node-fetch'

import headers from '../utils/headers.js'
import constants from '../utils/constants.js'

async function _getReplId(username, slug) {
	let info = await constants
		.fetch(`${constants.restful}/data/repls/@${username}/${slug}`, {
			method: 'GET',
			headers
		})
		.then(res => res.json());

	return info.id;
}

export default class Repl {
	constructor(username, slug) {
		this.username = username;
		this.slug = slug.replace(/ /g, '-');
	}

	async replGraphQLData() {
		let username = this.username;
		let slug = this.slug;

		let id = await _getReplId(username, slug);
		let info = await fetch(constants.graphql, {
				method: 'POST',
				headers,
				body: JSON.stringify({
					query: `
    			  query Repl($id: String!) {
    				  repl(id: $id) {
    				    ... on Repl {
                  ${constants.replAttributes}
    				    }
    				  }
    				}`,
					variables: JSON.stringify({
						id: id
					})
				})
			}).then(res => res.json());

    if(info.errors) throw new Error(`Replit GraphQL Error(s): ${JSON.stringify(info.errors)}`);

		if (!info.data.repl) {
			throw new Error(`${slug} is not a repl. Please query repls on Repl.it.`);
		} else {
			return info.data.repl;
		}
	}

	async replRESTData() {
	  let username = this.username;
	  let slug = this.slug;
	  
		let info = await fetch(`${constants.restful}/data/repls/@${username}/${slug}`, {
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
	
	async replLangs() {
	  let username = this.username;
	  let slug = this.slug;
	  
		let info = await fetch(`https://replangs.rayhanadev.repl.co/${username}/${slug}`, {
				method: 'GET',
				headers
			}).then(res => res.json());

		if (info.error) {
			throw new Error(`REPLangs Error: ${info.error}.`);
		} else {
			return info;
		}
	}
	
	async replTitleGen() {
		let info = await fetch(constants.graphql, {
				method: 'POST',
				headers,
				body: JSON.stringify({
					query: `{ replTitle }`
				})
			}).then(res => res.json());

    if(info.errors) throw new Error(`Replit GraphQL Error(s): ${JSON.stringify(info.errors)}`);
    else return info.data.replTitle;
	}
}