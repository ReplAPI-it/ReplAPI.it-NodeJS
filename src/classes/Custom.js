import fetch from 'node-fetch'

import headers from '../utils/headers.js'
import constants from '../utils/constants.js'

export class CustomDataQuery {
	constructor(queryName, customQuery, customVariables) {
		this.queryName = queryName;
		this.customQuery = customQuery;
		this.customVariables = customVariables;
	}

	async getData() {
		let queryName = this.queryName;
		let customQuery = this.customQuery;
		let customVariables = this.customVariables;
		
		let specialQueryVariables = {
		  since: 'KarmaSince',
		  count: 'Int',
		  id: 'Int',
		  limit: 'Int'
		}
		Object.freeze(specialQueryVariables);
		
		let queryVariables = Object.keys(customVariables);
		let queryVariablesString = '';
		for (let i = 0; i < queryVariables.length; i++) {
		  let type;
      if(specialQueryVariables.hasOwnProperty(queryVariables[i])) {
	      type = String(specialQueryVariables[queryVariables[i]]);
      } else {
        type = String(typeof queryVariables[i]).split('');
        type[0] = type[0].toUpperCase();
	      type = type.join('')
      }

		  if(i !== queryVariables.length - 1) {
		    queryVariablesString += `$${queryVariables[i]}: ${type}!, `
		  } else {
		    queryVariablesString += `$${queryVariables[i]}: ${type}!`
		  }
		}

		let info = await fetch(variables.graphql, {
				method: 'POST',
				headers,
				body: JSON.stringify({
					query: `
    			  query ${queryName}(${queryVariablesString}) {
    				  ${customQuery}
    				}`,
					variables: JSON.stringify(customVariables)
				})
			})
			.then(res => res.json());
    
		if (info.errors) {
			throw new Error(`Custom Data Query ${this.queryName} returned an error: ${JSON.stringify(info.errors)}`);
		} else {
			return info.data;
		}
	}
}

export class CustomRecursiveQuery {
	constructor(queryName, customQuery, customVariables, treePath, customAfter, customCount) {
		this.queryName = queryName;
		this.customQuery = customQuery;
		this.customVariables = customVariables;
		this.treePath = treePath;
		this.customAfter = customAfter;
		this.customCount = customCount;
	}

	async getData() {
		let queryName = this.queryName;
		let customQuery = this.customQuery;
		let customVariables = this.customVariables;
		let treePath = this.treePath;
		let customAfter = this.customAfter;
		let customCount = this.customCount;
		
		let specialQueryVariables = {
		  since: 'KarmaSince',
		  count: 'Int',
		  id: 'Int',
		  limit: 'Int'
		}
		Object.freeze(specialQueryVariables);
		
		let queryVariables = Object.keys(customVariables);
		let queryVariablesString = '';
		for (let i = 0; i < queryVariables.length; i++) {
		  let type;
      if(specialQueryVariables.hasOwnProperty(queryVariables[i])) {
	      type = String(specialQueryVariables[queryVariables[i]]);
      } else {
        type = String(typeof queryVariables[i]).split('');
        type[0] = type[0].toUpperCase();
	      type = type.join('')
      }

		  if(i !== queryVariables.length - 1) {
		    queryVariablesString += `$${queryVariables[i]}: ${type}!, `
		  } else {
		    queryVariablesString += `$${queryVariables[i]}: ${type}!`
		  }
		}
    
		let output = [];

	 	async function recurse(after) {
			if (after === null) return;

  		let info = await variables
  			.fetch(variables.graphql, {
  				method: 'POST',
  				headers,
  				body: JSON.stringify({
  					query: `
      			  query ${queryName}(${queryVariablesString}) {
      				  ${customQuery}
      				}`,
  					variables: JSON.stringify(customVariables)
  				})
  			})
  			.then(res => res.json());
  		
			if (info.errors) {
				throw new Error(`Custom Recusive Query ${queryName} returned an error: ${JSON.stringify(info.errors)}`);
			} else {
				info.data[customQuery.trim().split('(')[0]][treePath].items.forEach(item => {
					output.push(item);
				});
				if (output.length !== customCount) {
					await recurse(info.data[customQuery.trim().split('(')[0]][treePath].pageInfo.nextCursor);
				}
			}

		}

		await recurse(this.customAfter);
		return output;
	}
}