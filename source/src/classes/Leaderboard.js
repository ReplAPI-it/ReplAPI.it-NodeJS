import fetch from 'node-fetch';

import headers from '../utils/headers.mjs';
import constants from '../utils/constants.mjs';

export default class Leaderboard {
	async leaderboardData(after = '', count = 10, since) {
		let query = '';
		let variables = {};
		if (since) {
			query = `
        query Leaderboard($after: String!, $count: Int!, $since: KarmaSince!) {
          leaderboard(after: $after, count: $count, since: $since) {
            items { ${constants.userAttributes} }
            pageInfo {
              nextCursor
            }
          }
        }`;
			variables = {
				count,
				since,
			};
		} else {
			query = `
        query Leaderboard($after: String!, $count: Int!) {
          leaderboard(after: $after, count: $count) {
            items { ${constants.userAttributes} }
            pageInfo {
              nextCursor
            }
          }
        }`;
			variables = {
				count,
			};
		}

		const output = [];

		async function recurse(recurseAfter) {
			if (recurseAfter === null) return;

			const info = await fetch(constants.graphql, {
				method: 'POST',
				headers,
				body: JSON.stringify({
					query,
					variables: JSON.stringify({
						...variables,
						after: recurseAfter,
					}),
				}),
			}).then((res) => res.json());

			if (!info.data.leaderboard) {
				throw new Error('Cannot fetch leaderboard');
			} else {
				info.data.leaderboard.items.forEach((user) => {
					output.push(user);
				});
				if (output.length !== count) {
					await recurse(info.data.leaderboard.pageInfo.nextCursor);
				}
			}
		}

		await recurse(after);
		return output;
	}
}
