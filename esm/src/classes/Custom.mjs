import fetch from 'node-fetch';

import headers from '../utils/headers.mjs';
import constants from '../utils/constants.mjs';

/* eslint-disable max-classes-per-file */

export class CustomDataQuery {
	constructor(queryName, customQuery, customVariables) {
		this.queryName = queryName;
		this.customQuery = customQuery;
		this.customVariables = customVariables;
	}

	async getData() {
		const { queryName, customQuery, customVariables } = this;

		const specialQueryVariables = {
			since: 'KarmaSince',
			count: 'Int',
			id: 'Int',
			limit: 'Int',
		};
		Object.freeze(specialQueryVariables);

		const queryVariables = Object.keys(customVariables);
		let queryVariablesString = '';
		for (let i = 0; i < queryVariables.length; i += 1) {
			let type;
			if (
				Object.prototype.hasOwnProperty.call(
					specialQueryVariables,
					queryVariables[i]
				)
			) {
				type = String(specialQueryVariables[queryVariables[i]]);
			} else {
				type = String(typeof queryVariables[i]).split('');
				type[0] = type[0].toUpperCase();
				type = type.join('');
			}

			if (i !== queryVariables.length - 1) {
				queryVariablesString += `$${queryVariables[i]}: ${type}!, `;
			} else {
				queryVariablesString += `$${queryVariables[i]}: ${type}!`;
			}
		}

		const info = await fetch(constants.graphql, {
			method: 'POST',
			headers,
			body: JSON.stringify({
				query: `
          query ${queryName}(${queryVariablesString}) {
            ${customQuery}
          }`,
				variables: JSON.stringify(customVariables),
			}),
		}).then((res) => res.json());

		if (info.errors) {
			throw new Error(
				`Custom Data Query ${
					this.queryName
				} returned an error: ${JSON.stringify(info.errors)}`
			);
		} else {
			return info.data;
		}
	}
}

export class CustomRecursiveQuery {
	constructor(
		queryName,
		customQuery,
		customVariables,
		treePath,
		customAfter,
		customCount
	) {
		this.queryName = queryName;
		this.customQuery = customQuery;
		this.customVariables = customVariables;
		this.treePath = treePath;
		this.customAfter = customAfter;
		this.customCount = customCount;
	}

	async getData() {
		const {
			queryName,
			customQuery,
			customVariables,
			treePath,
			customAfter,
			customCount,
		} = this;

		const specialQueryVariables = {
			since: 'KarmaSince',
			count: 'Int',
			id: 'Int',
			limit: 'Int',
		};
		Object.freeze(specialQueryVariables);

		const queryVariables = Object.keys(customVariables);
		let queryVariablesString = '';
		for (let i = 0; i < queryVariables.length; i += 1) {
			let type;
			if (
				Object.prototype.hasOwnProperty.call(
					specialQueryVariables,
					queryVariables[i]
				)
			) {
				type = String(specialQueryVariables[queryVariables[i]]);
			} else {
				type = String(typeof queryVariables[i]).split('');
				type[0] = type[0].toUpperCase();
				type = type.join('');
			}

			if (i !== queryVariables.length - 1) {
				queryVariablesString += `$${queryVariables[i]}: ${type}!, `;
			} else {
				queryVariablesString += `$${queryVariables[i]}: ${type}!`;
			}
		}

		const output = [];

		async function recurse(recurseAfter) {
			if (recurseAfter === null) return;

			const info = await fetch(constants.graphql, {
				method: 'POST',
				headers,
				body: JSON.stringify({
					query: `
            query ${queryName}(${queryVariablesString}) {
              ${customQuery}
            }`,
					variables: JSON.stringify({
						...customVariables,
						after: recurseAfter,
					}),
				}),
			}).then((res) => res.json());

			if (info.errors) {
				throw new Error(
					`Custom Recusive Query ${queryName} returned an error: ${JSON.stringify(
						info.errors
					)}`
				);
			} else {
				info.data[customQuery.trim().split('(')[0]][treePath].items.forEach(
					(item) => {
						output.push(item);
					}
				);
				if (output.length !== customCount) {
					await recurse(
						info.data[customQuery.trim().split('(')[0]][treePath].pageInfo
							.nextCursor
					);
				}
			}
		}

		await recurse(customAfter);
		return output;
	}
}
