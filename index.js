let replapi = require('./src');

module.exports = function(initVariables) {
  if(initVariables) {
    global.initVariables = initVariables;
  } else {
    console.warn('[WARN]: ReplAPI.it Initilization Variables not found!')
  }
  
  return {
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
