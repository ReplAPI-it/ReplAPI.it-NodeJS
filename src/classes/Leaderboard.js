let headers = require('../utils/headers.js');
let variables = require('../utils/variables.js');

class Leaderboard {
	async leaderboardData(after, count, since) {
		if (!after) after = '';
		if (!count) count = 10;
		if (!since) {
			let output = [];

			async function recurse(after) {
				if (after === null) return;

				let info = await variables
					.fetch('https://repl.it/graphql', {
						method: 'POST',
						headers,
						body: JSON.stringify({
							query: `
              query Leaderboard($after: String!, $count: Int!) {
                leaderboard(after: $after, count: $count) {
                  items { ${variables.userAttributes} }
                  pageInfo {
                    nextCursor
                  }
                }
              }`,
							variables: {
								after,
								count
							}
						})
					})
					.then(res => res.json());

				if (!info.data.leaderboard) {
					throw new Error(`Cannot fetch leaderboard`);
				} else {
					info.data.leaderboard.items.forEach(user => {
						output.push(user);
					});
					if (output.length != count) {
						await recurse(info.data.leaderboard.pageInfo.nextCursor);
					}
				}
			}

			await recurse(after);
			return output;
		} else {
			let output = [];

			async function recurse(after) {
				if (after === null) return;

				let info = await variables
					.fetch('https://repl.it/graphql', {
						method: 'POST',
						headers,
						body: JSON.stringify({
							query: `
              query Leaderboard($after: String!, $count: Int!, $since: KarmaSince!) {
                leaderboard(after: $after, count: $count, since: $since) {
                  items { ${variables.userAttributes} }
                  pageInfo {
                    nextCursor
                  }
                }
              }`,
							variables: {
								after,
								count,
								since
							}
						})
					})
					.then(res => res.json());

				if (!info.data.leaderboard) {
					throw new Error(`Cannot fetch leaderboard`);
				} else {
					info.data.leaderboard.items.forEach(user => {
						output.push(user);
					});
					if (output.length != count) {
						await recurse(info.data.leaderboard.pageInfo.nextCursor);
					}
				}
			}

			await recurse(after);
			return output;
		}
	}
}

module.exports = {
	Leaderboard: Leaderboard
};
