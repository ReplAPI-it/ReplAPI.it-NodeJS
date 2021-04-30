import "core-js/stable/index.js";
import "regenerator-runtime/runtime.js";
import fs from "fs";
import path from "path";
import _ from "lodash";
import stringify from "json-stable-stringify-without-jsonify";
import replapi from "./src/source.mjs";

const defaultInitVariables = {
  username: "",
  captcha: {
    token: "",
  },
  endpoints: {
    gql: "",
    restful: "",
    login: "",
  },
  markdown: {
    length: "",
    removeMarkdown: "",
  },
  previewCount: {
    comments: "",
  },
  experimentalFeatures: "",
  createDatabaseFlag: "",
};

function sortByKey(a, b) {
  return a.key > b.key ? 1 : -1;
}

export default function ReplAPI(initVariables) {
  if (initVariables) {
    _.assign(defaultInitVariables, initVariables);
    fs.writeFileSync(
      path.join(process.cwd(), ".replapirc.json"),
      `${stringify(defaultInitVariables, { cmp: sortByKey, space: 4 })}\n`,
      { encoding: "utf8" }
    );
  } else {
    fs.writeFileSync(
      path.join(process.cwd(), ".replapirc.json"),
      `${stringify(defaultInitVariables, { cmp: sortByKey, space: 4 })}\n`,
      { encoding: "utf8" }
    );
  }

  return {
    defaults: defaultInitVariables,
    Blog: replapi.Blog,
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
