let _defaultInitVariables = {
  username: undefined,
  endpoints: {
    gql: undefined,
    restful: undefined,
    login: undefined
  },
  markdown: {
    length: undefined,
    removeMarkdown: undefined
  }
  previewCount: {
    comments: undefined
  }
}

module.exports = function(initVariables) {
  if(initVariables) {
    for([key, value] of Object.entries(initVariables)) {
      if(typeof value == 'object') {
        for([nestedKey, nestedValue] of Object.entries(value)) {
          if(typeof nestedValue != 'string' && typeof nestedValue != 'number') throw new Error(`Invalid type for value of ${nestedKey}.`);
          else if(_defaultInitVariables[key][nestedKey]) _defaultInitVariables[key][nestedKey] = nestedValue;
        }
      } else {
        if(typeof value != 'string' && typeof value != 'number') throw new Error(`Invalid type for value of ${key}.`);
        else if(_defaultInitVariables[key]) _defaultInitVariables[key] = value;
      }
    }
    global.initVariables = _defaultInitVariables
    console.log(global.initVariables)
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
