import Parser from 'rss-parser';
import fs from 'fs';
import path from 'path';

const parser = new Parser();

let exportable;
let isExperimentalFeaturesEnabled;
if (fs.existsSync(path.join(process.cwd(), '.replapirc.json'))) {
  isExperimentalFeaturesEnabled = JSON.parse(fs.readFileSync(path.join(process.cwd(), '.replapirc.json'))).experimentalFeatures;
}

if (isExperimentalFeaturesEnabled) {
  exportable = class Blog {
    async blogData() {
      const feed = await parser.parseURL('https://blog.replit.com/feed.xml');
      delete feed.items;

      return feed;
    }

    async blogItems(order = 'newest', count = 10) {
      const feed = await parser.parseURL('https://blog.replit.com/feed.xml');

      if (order === 'oldest') feed.items.reverse();
      const posts = feed.items.slice(0, count);

      return posts;
    }
  };
} else {
  exportable = function noExperimentalFeatures() {
    console.log('Experimental Features are not enabled. To learn more about experimental features please visit the documentation.');
  };
}

export default exportable;
