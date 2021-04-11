let _defaultInitVariables = {
  username: undefined,
  endpoints: {
    gql: undefined,
    restful: undefined,
    login: undefined
  }
}

module.exports = function(initVariables) {
  if(initVariables) {
    global.initVariables = initVariables;
  } else {
    global.initVariables = _defaultInitVariables;
  }
  
  const replapi = require('./src');
  
  return {
    defaults: global.initVariables,
  	User: replapi.User,
  	Post: replapi.Post,
  	Repl: replapi.Repl,
  	Comment: replapi.Comment,
  	Leaderboard: replapi.Leaderboard,
    Languages: replapi.Languages,
  	Board: replapi.Board,
  	Notifications: replapi.Notifications,
  	Misc: replapi.Misc,
  	Login: replapi.Login,
  	CustomDataQuery: replapi.CustomDataQuery,
  	CustomRecursiveQuery: replapi.CustomRecursiveQuery
  }
};
