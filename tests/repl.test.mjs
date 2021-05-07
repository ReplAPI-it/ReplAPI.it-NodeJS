import ReplAPI from '../esm/index.mjs';
const replapi = ReplAPI({
	username: 'RayhanADev',
});

async function myTestFunction() {
	const myRepl = new replapi.Repl('RayhanADev', 'ArchiveIt');
	const info = await myRepl.replReplFilesAPI('src/index.js');
	console.log(info);
}

myTestFunction();