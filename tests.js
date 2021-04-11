const login = require('./src/classes/Login.js');
const user = require('./src/classes/User.js');
const post = require('./src/classes/Post.js');
const repl = require('./src/classes/Repl.js');
const comment = require('./src/classes/Comment.js');
const leaderboard = require('./src/classes/Leaderboard.js');
const languages = require('./src/classes/Languages.js');
const board = require('./src/classes/Board.js');
const notifications = require('./src/classes/Notifications.js');
const misc = require('./src/classes/Misc.js')
const custom = require('./src/classes/Custom.js')

if (!login) throw new Error('Login class not found');
if (!user) throw new Error('User class not found');
if (!post) throw new Error('Post class not found');
if (!repl) throw new Error('Repl class not found');
if (!comment) throw new Error('Comment class not found');
if (!leaderboard) throw new Error('Leaderboard class not found');
if (!languages) throw new Error('Languages class not found');
if (!board) throw new Error('Board class not found');
if (!notifications) throw new Error('Notifications class not found');
if (!misc) throw new Error('Miscellaneous class not found');
if (!custom) throw new Error('Custom class not found');