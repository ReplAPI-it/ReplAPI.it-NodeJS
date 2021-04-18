import replapi from './src/source.js';

const defaultInitVariables = {
  username: undefined,
  captcha: {
    token: undefined,
  },
  endpoints: {
    gql: undefined,
    restful: undefined,
    login: undefined,
  },
  markdown: {
    length: undefined,
    removeMarkdown: undefined,
  },
  previewCount: {
    comments: undefined,
  },
};

export default function ReplAPI(initVariables) {
  if (initVariables) {
    for (const [key, value] of Object.entries(initVariables)) {
      if (typeof value === 'object') {
        for (const [nestedKey, nestedValue] of Object.entries(value)) {
          if (typeof nestedValue !== 'string' && typeof nestedValue !== 'number') {
            throw new Error(`Invalid type for value of ${nestedKey}.`);
          } else if (defaultInitVariables[key][nestedKey] === undefined) {
            defaultInitVariables[key][nestedKey] = nestedValue;
          }
        }
      } else if (typeof value !== 'string' && typeof value !== 'number') {
        throw new Error(`Invalid type for value of ${key}.`);
      } else if (defaultInitVariables[key] === undefined) {
        defaultInitVariables[key] = value;
      }
    }
    global.initVariables = defaultInitVariables;
  } else {
    global.initVariables = defaultInitVariables;
  }

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
    Login: replapi.Login,
    CustomDataQuery: replapi.CustomDataQuery,
    CustomRecursiveQuery: replapi.CustomRecursiveQuery,
  };
}
