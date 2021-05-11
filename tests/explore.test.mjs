import ReplAPI from '../esm/index.mjs';
const replapi = ReplAPI({
	username: 'RayhanADev',
});

async function myTestFunction() {
	const myRepl = new replapi.Explore('rayhanadev');
	const info = await myRepl.exploreTrendingTags();
	console.log(info);
}

myTestFunction();