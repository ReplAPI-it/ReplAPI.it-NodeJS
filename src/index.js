const login = require('./classes/Login.js');
const user = require('./classes/User.js');
const post = require('./classes/Post.js');
const repl = require('./classes/Repl.js');
const comment = require('./classes/Comment.js');
const leaderboard = require('./classes/Leaderboard.js');
const languages = require('./classes/Languages.js');
const board = require('./classes/Board.js');
const notifications = require('./classes/Notifications.js');
const custom = require('./classes/Custom.js')

if (!login) throw new Error('Login class not found');
if (!user) throw new Error('User class not found');
if (!post) throw new Error('Post class not found');
if (!repl) throw new Error('Repl class not found');
if (!comment) throw new Error('Comment class not found');
if (!leaderboard) throw new Error('Leaderboard class not found');
if (!languages) throw new Error('Languages class not found');
if (!board) throw new Error('Board class not found');
if (!notifications) throw new Error('Notifications class not found');
if (!custom) throw new Error('Custom class not found');

module.exports = {
  Login: login.Login,
  User: user.User,
  Post: post.Post,
  Repl: repl.Repl,
  Comment: comment.Comment,
  Leaderboard: leaderboard.Leaderboard,
  Languages: languages.Languages,
  Board: board.Board,
  Notifications: notifications.Notifications,
  CustomDataQuery: custom.CustomDataQuery,
  CustomRecursiveQuery: custom.CustomRecursiveQuery
}
