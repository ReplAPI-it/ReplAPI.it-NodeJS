const ReplAPI = require('../cjs/index.js').default;
const replapi = ReplAPI({
	username: 'RayhanADev',
});

async function myTestFunction() {
	const myRepl = new replapi.Repl('RayhanADev', 'ReplAPI.it');
	const info = await myRepl.replGraphQLData();
	console.log(info);
}

myTestFunction();