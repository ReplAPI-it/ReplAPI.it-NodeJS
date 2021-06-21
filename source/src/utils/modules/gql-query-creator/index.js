function whatis(value) {
	return Object.prototype.toString
		.call(value)
		.replace(/^\[object\s+([a-z]+)\]$/i, '$1')
		.toLowerCase();
}

function variablesString(queryVariables) {
	let queryString = '';
	for (const [key, value] of Object.entries(queryVariables)) {
		queryString += `$${key}: ${value}, `;
	}
	return queryString.slice(0, -2);
}

function itemsString(queryItems, tabLength = 1) {
	let queryString = '';
	let tabPadding = '';
	for (let i = tabLength; i > 0; i -= 1) {
		tabPadding += '\t';
	}

	for (const [key, value] of Object.entries(queryItems)) {
		switch (whatis(value)) {
			case 'string': {
				queryString += `${tabPadding}${key}\n`;
				break;
			}
			case 'array': {
				let propOptions = '';
				if (value[0] && value[0].propOverride === true) {
					delete value[0].propOverride;
					propOptions = Object.entries(value[0] || {})
						.join('* ')
						.replace(/,/g, ': ')
						.replace(/\*/g, ',');
				} else {
					propOptions = Object.entries(value[0] || {})
						.join('* ')
						.replace(/,/g, ': $')
						.replace(/\*/g, ',');
				}
				const propAlias = value[1];
				queryString += `${tabPadding}${
					propAlias ? `${propAlias}: ` : ''
				}${key}${propOptions ? `(${propOptions})` : ''}\n`;
				break;
			}
			case 'object': {
				let propOptions = '';
				if (value.args[0] && value.args[0].propOverride === true) {
					delete value.args[0].propOverride;
					propOptions = Object.entries(value.args[0] || {})
						.join('* ')
						.replace(/,/g, ': ')
						.replace(/\*/g, ',');
				} else {
					propOptions = Object.entries(value.args[0] || {})
						.join('* ')
						.replace(/,/g, ': $')
						.replace(/\*/g, ',');
				}
				const propAlias = value.args[1];
				// prettier-ignore
				queryString += 
`${tabPadding}${propAlias ? `${propAlias}: ` : ''}${key}${value.args[0] ? `(${propOptions})` : ''} {
${itemsString(value.items, tabLength + 1)}
${tabPadding}}\n`;
				break;
			}
			default: {
				throw new Error(
					'Unknown type when generating property string.',
				);
			}
		}
	}

	return queryString.slice(0, -1);
}

function createQueryWrapper(name, variables, items) {
	const queryTemplate =
		'query __QUERY_NAME__(__QUERY_VARIABLES__) {\n__QUERY_PROPERTIES__\n}';
	const queryVariablesString = variablesString(variables);
	const queryItemsString = itemsString(items);

	return queryTemplate
		.replace(/__QUERY_NAME__/, name)
		.replace(/__QUERY_VARIABLES__/, queryVariablesString)
		.replace(/__QUERY_PROPERTIES__/, queryItemsString);
}

export function gqlQueryCreator(name, variables, items) {
	const wrapperVariables = Object.fromEntries(
		Object.entries(variables).map(([key, value]) => {
			return [key, value[0]];
		}),
	);
	const queryVariables = Object.fromEntries(
		Object.entries(variables).map(([key, value]) => {
			return [key, value[1]];
		}),
	);

	return {
		query: createQueryWrapper(name, wrapperVariables, items),
		variables: JSON.stringify(queryVariables),
	};
}