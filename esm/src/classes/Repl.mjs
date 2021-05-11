import fetch from 'node-fetch';

import headers from '../utils/headers.mjs';
import constants from '../utils/constants.mjs';

async function getReplId(username, slug) {
	const info = await fetch(
		`${constants.restful}/data/repls/@${username}/${slug}`,
		{
			method: 'GET',
			headers,
		}
	).then((res) => res.json());

	return info.id;
}

export default class Repl {
	constructor(username, slug) {
		this.username = username;
		this.slug = slug.replace(/ /g, '-').replace(/\./g, '');
	}

	async replGraphQLData() {
		const { username, slug } = this;

		const id = await getReplId(username, slug);
		const info = await fetch(constants.graphql, {
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
					id,
				}),
			}),
		}).then((res) => res.json());

		if (info.errors)
			throw new Error(
				`Replit GraphQL Error(s): ${JSON.stringify(info.errors)}`
			);

		if (!info.data.repl) {
			throw new Error(`${slug} is not a repl. Please query repls on Replit.`);
		} else {
			return info.data.repl;
		}
	}

	async replRestfulData() {
		const { username, slug } = this;

		const info = await fetch(
			`${constants.restful}/data/repls/@${username}/${slug}`,
			{
				method: 'GET',
				headers,
			}
		).then((res) => res.json());

		if (!info) {
			throw new Error(`${slug} is not a repl. Please query repls on Replit.`);
		} else {
			return info;
		}
	}

	async replPublicForks(after = '', count = 10) {
		const { username, slug } = this;
		const output = [];

		const id = await getReplId(username, slug);
		async function recurse(recurseAfter) {
			if (recurseAfter === null) return;
			const info = await fetch(constants.graphql, {
				method: 'POST',
				headers,
				body: JSON.stringify({
					query: `
						query ReplForks($id: String!, $after: String!, $count: Int!) {
							repl(id: $id) {
								... on Repl {
									publicForks(after: $after, count: $count) {
										items {
											${constants.replAttributes}
										}
										pageInfo {
											nextCursor
										}
									}
								}
							}
						}`,
					variables: JSON.stringify({
						id,
						count,
						after: recurseAfter,
					}),
				}),
			}).then((res) => res.json());

			if (info.errors)
				throw new Error(
					`Replit GraphQL Error(s): ${JSON.stringify(info.errors)}`
				);

			if (!info.data.repl) {
				throw new Error(`${slug} is not a repl. Please query repls on Replit.`);
			} else {
				info.data.repl.publicForks.items.forEach((post) => {
					output.push(post);
				});
				if (output.length !== count) {
					await recurse(info.data.repl.publicForks.pageInfo.nextCursor);
				}
			}
		}

		await recurse(after);
		return output;
	}

	async replComments(after = '', count = 10) {
		const { username, slug } = this;
		const output = [];

		const id = await getReplId(username, slug);
		async function recurse(recurseAfter) {
			if (recurseAfter === null) return;
			const info = await fetch(constants.graphql, {
				method: 'POST',
				headers,
				body: JSON.stringify({
					query: `
						query ReplForks($id: String!, $after: String!, $count: Int!) {
							repl(id: $id) {
								... on Repl {
									comments(after: $after, count: $count) {
										items {
											${constants.replCommentAttributes}
											user { ${constants.userAttributes} }
											replies { ${constants.replCommentAttributes} }
										}
										pageInfo {
											nextCursor
										}
									}
								}
							}
						}`,
					variables: JSON.stringify({
						id,
						count,
						after: recurseAfter,
					}),
				}),
			}).then((res) => res.json());

			if (info.errors)
				throw new Error(
					`Replit GraphQL Error(s): ${JSON.stringify(info.errors)}`
				);

			if (!info.data.repl) {
				throw new Error(`${slug} is not a repl. Please query repls on Replit.`);
			} else {
				info.data.repl.comments.items.forEach((post) => {
					output.push(post);
				});
				if (output.length !== count) {
					await recurse(info.data.repl.comments.pageInfo.nextCursor);
				}
			}
		}

		await recurse(after);
		return output;
	}

	async replLangsAPI() {
		const { username, slug } = this;

		const info = await fetch(
			`https://langsapi.replapiit.repl.co/${username}/${slug}`,
			{
				method: 'GET',
				headers,
			}
		).then((res) => res.json());

		if (info.error) {
			throw new Error(`REPLangs Error: ${info.error}.`);
		} else {
			return info;
		}
	}

	async replFilesAPI(filename, raw) {
		const { username, slug } = this;

		const info = await fetch(
			`https://filesapi.replapiit.repl.co/${
				filename ? 'file' : 'files'
			}/${username}/${slug}${
				filename ? `?filename=${filename}${raw ? '&raw=1' : ''}` : ''
			}`,
			{
				method: 'GET',
				headers,
			}
		).then((res) => (raw ? res.text() : res.json()));

		if (info.error) {
			throw new Error(`ReplFiles Error: ${info.error}.`);
		} else {
			return info;
		}
	}

	async replTitleGen() {
		if (!global.cookies) {
			throw new Error('ReplAPI.it: Not logged in.');
		} else {
			headers['Set-Cookie'] = global.cookies;
			const info = await fetch(constants.graphql, {
				method: 'POST',
				headers,
				body: JSON.stringify({
					query: '{ replTitle }',
				}),
			}).then((res) => res.json());

			if (info.errors)
				throw new Error(
					`Replit GraphQL Error(s): ${JSON.stringify(info.errors)}`
				);
			else return info.data.replTitle;
		}
	}

	async recentRepls() {
		const info = await fetch(constants.graphql, {
			method: 'POST',
			headers,
			body: JSON.stringify({
				query: `
          query newRepls {
            newRepls {
              items {
                ${constants.replAttributes}
              }
            }
          }`,
			}),
		}).then((res) => res.json());

		if (info.errors)
			throw new Error(
				`Replit GraphQL Error(s): ${JSON.stringify(info.errors)}`
			);
		else return info.data.newRepls.items;
	}
}
