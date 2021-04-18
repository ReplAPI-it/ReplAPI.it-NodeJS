import fetch from 'node-fetch'

import headers from '../utils/headers.js'
import constants from '../utils/constants.js'

function _hash(value, salt) {
	let hash = crypto.createHmac('sha512', salt);
	hash.update(value);
	let result = hash.digest('hex');
	return {
		salt: salt,
		hashedpassword: result
	};
}

function _compare(value, hashData) {
	let resultData = _hash(value, hashData.salt);
	if (resultData.hashedpassword === hashData.hashedpassword) {
		return true;
	}
	return false;
}

export default class Database {
	constructor(replitdbtoken, salt, options) {
		this.replitdbtoken = replitdbtoken || process.env.REPLIT_DB_URL.split('/')[4];
		this.salt = salt;
		this.options = options;
	}

	async set(key, value) {
		let info = await fetch(`https://kv.replit.com/v0/${this.replitdbtoken}`, {
				method: 'POST',
				headers,
				body: encodeURIComponent(key) + '=' + encodeURIComponent(JSON.stringify(value))
			}).then(res => res.json());
	}
  
	async get(key, ) {
		let info = await fetch(`https://kv.replit.com/v0/${this.replitdbtoken}/${key}`, {
				method: 'GET',
				headers
			}).then(res => {
			  res.json()
			});
	}
	
	async delete(key) {
		let info = await fetch(`https://kv.replit.com/v0/${this.replitdbtoken}/${key}`, {
				method: 'GET',
				headers
			}).then(res => {
			  res.json()
			});
	}
}