import ReplAPI from 'replapi-it';

const replapi = ReplAPI({
  username: 'RayhanADev',
});

class myTestExtends extends replapi.CustomDataQuery {
  constructor(username) {
    const queryName = 'UserUsername';
    const customQuery = `
      userByUsername(username: $username) {
        username
      }`;
    const customVariables = { username };
    super(queryName, customQuery, customVariables);
  }
}

const myTestClass = new myTestExtends('RayhanADev');

async function myTestFunction() {
  const info = await myTestClass.getData();
  console.log(info);
}

myTestFunction();
