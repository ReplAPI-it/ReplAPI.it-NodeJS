import fs from 'fs';
import path from 'path';
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
  experimentalFeatures: undefined,
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
      } else if (typeof value !== 'string' && typeof value !== 'number' && typeof value !== 'boolean') {
        throw new Error(`Invalid type for value of ${key}.`);
      } else if (defaultInitVariables[key] === undefined) {
        defaultInitVariables[key] = value;
      }
    }
    fs.writeFileSync(path.join(process.cwd(), '.replapirc.json'), JSON.stringify(defaultInitVariables), { encoding: 'utf8' });
  } else {
    fs.writeFileSync(path.join(process.cwd(), '.replapirc.json'), JSON.stringify(defaultInitVariables), { encoding: 'utf8' });
  }

  return {
    defaults: defaultInitVariables,
    Board: replapi.Board,
    Comment: replapi.Comment,
    CustomDataQuery: replapi.CustomDataQuery,
    CustomRecursiveQuery: replapi.CustomRecursiveQuery,
    Database: replapi.Database,
    Languages: replapi.Languages,
    Leaderboard: replapi.Leaderboard,
    Login: replapi.Login,
    Notifications: replapi.Notifications,
    Post: replapi.Post,
    Repl: replapi.Repl,
    User: replapi.User,
  };
}
