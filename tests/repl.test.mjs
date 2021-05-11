import ReplAPI from '../esm/index.mjs';
const replapi = ReplAPI({
	username: 'RayhanADev',
});

async function myTestFunction() {
	const myRepl = new replapi.Repl('RayhanADev', 'RollingForests');
	const info = await myRepl.replComments();
	console.log(info);
}

myTestFunction();