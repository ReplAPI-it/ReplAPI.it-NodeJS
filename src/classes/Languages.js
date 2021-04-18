import HTMLParser from 'node-html-parser'
import fetch from 'node-fetch'
import atob from 'atob'

async function _fetchVariable() {
  let html = await fetch('https://staging.replit.com/', {
    method: 'GET',
    headers: {
      'X-Requested-With': 'ReplAPI.it',
      'Referrer': 'https://staging.replit.com/'
    }
  }).then(res => res.text());
  
  let root = HTMLParser.parse(html, {
    lowerCaseTagName: false,
    comment: false,
    blockTextElements: {
      script: true,
      noscript: true,
      style: true,
      pre: true
    }
  });
  
  return JSON.parse(atob(root.childNodes[1].childNodes[0].childNodes[1].childNodes[0].rawText.split("'")[1].split("'")[0]))
}

export default class Languages {
  constructor(lang) {
    this.lang = lang;
  }

  async getLang() {
    let langs = await _fetchVariable();
    return langs[this.lang];
  }

  async getAllLangs() {
    let langs = await _fetchVariable();
    return langs;
  }
}