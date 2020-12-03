const user = require('./src/User.js');
const post = require('./src/Post.js');
const comment = require('./src/Comment.js');
const leaderboard = require('./src/Leaderboard.js');

module.exports = {
  User: user.User,
  Post: post.Post,
  Comment: comment.Comment,
  Leaderboard: leaderboard.Leaderboard
}
