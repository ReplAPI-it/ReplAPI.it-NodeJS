import fetch from 'node-fetch';

import headers from '../utils/headers.js';
import constants from '../utils/constants.js';

function hash(value, salt) {
  const hash = crypto.createHmac('sha512', salt);
  hash.update(value);
  const result = hash.digest('hex');
  return {
    salt,
    hashedpassword: result,
  };
}

function compare(value, hashData) {
  const resultData = _hash(value, hashData.salt);
  if (resultData.hashedpassword === hashData.hashedpassword) {
    return true;
  }
  return false;
}

let exportable;

if (global.initVariables.experimentalFeatures) {
  let exportable = class Database {
    constructor(replitdbtoken, salt, options) {
      this.replitdbtoken = replitdbtoken || process.env.REPLIT_DB_URL.split('/')[4];
      this.salt = salt;
      this.options = options;
    }
  
    async set(key, value) {
      const info = await fetch(`https://kv.replit.com/v0/${this.replitdbtoken}`, {
        method: 'POST',
        headers,
        body: `${encodeURIComponent(key)}=${encodeURIComponent(JSON.stringify(value))}`,
      }).then((res) => res.json());
    }
  
    async get(key) {
      const info = await fetch(`https://kv.replit.com/v0/${this.replitdbtoken}/${key}`, {
        method: 'GET',
        headers,
      }).then((res) => {
  			  res.json();
      });
    }
  
    async delete(key) {
      const info = await fetch(`https://kv.replit.com/v0/${this.replitdbtoken}/${key}`, {
        method: 'GET',
        headers,
      }).then((res) => {
  			  res.json();
      });
    }
  }
} else {
  exportable = function noExperimentalFeatures() {
    console.log('Experimental Features are not enabled. To use learn more about experimental features please visit the documentation.');
  };
}

export default exportable;
