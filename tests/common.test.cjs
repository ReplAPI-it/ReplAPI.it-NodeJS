const ReplAPI = require('../cjs/index.js').default;
const replapi = ReplAPI({
	username: 'RayhanADev',
});

const replapiClasses = [
  'Blog',
  'Board',
  'Comment',
  'CustomDataQuery',
  'CustomRecursiveQuery',
  'Database',
  'Explore',
  'Languages',
  'Leaderboard',
  'Login',
  'Notifications',
  'Post',
  'Repl',
  'User',
]

const containsAll = (obj, arr) => {
	for(const str of arr){
		if(Object.keys(obj).includes(str)) {
			continue;
		} else {
			return false;
		}
	}
	return true;
};

console.log(`CommonJS Test: ${containsAll(replapi, replapiClasses) ? 'Passing' : 'Fail'}`);