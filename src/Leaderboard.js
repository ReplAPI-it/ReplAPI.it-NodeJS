const fetch = require('node-fetch');

const headers = {
	'Content-Type': 'application/json',
	Accept: 'application/json',
	'Accept-Encoding': 'gzip, deflate, br',
	Connection: 'keep-alive',
	'X-Requested-With': 'REPLAPIit',
	Referrer: 'https://repl.it',
	Origin: 'https://repl.it'
};

let roleAttributes = `id, name, key, tagline`;
let languageAttributes = `id, displayName, key, category, tagline, icon, isNew`;

let userAttributes = `id, username, url, image, karma, firstName, lastName, fullName, displayName, isLoggedIn, bio, timeCreated, organization { name }, subscription { planId }, languages { ${languageAttributes} }, roles { ${roleAttributes} }`;
let boardAttributes = `id, url, slug, cta, titleCta, bodyCta, buttonCta, description, name, replRequired, isLocked, isPrivate`;
let replAttributes = `id, hostedUrl, title, lang { ${languageAttributes} }, language, timeCreated`;
let commentAttributes = `id, body, voteCount, timeCreated, timeUpdated, user { ${userAttributes} }, url, post { id }, parentComment { id }, comments { id }, isAuthor, canEdit, canVote, canComment, hasVoted, canReport, hasReported, isAnswer, canSelectAsAnswer, canUnselectAsAnswer, preview(removeMarkdown: true, length: 150)`;
let postAttributes = `id, title, body, showHosted, voteCount, commentCount, isPinned, isLocked, timeCreated, timeUpdated, url, user { ${userAttributes} }, board { ${boardAttributes} }, repl { ${replAttributes} }, isAnnouncement, isAuthor, canEdit, canComment, canVote, canPin, canSetType, canChangeBoard, canLock, hasVoted, canReport, hasReported, isAnswered, isAnswerable, answeredBy { ${userAttributes} }, answer { ${commentAttributes} }, tutorialPages, preview(removeMarkdown: true, length: 150)`;

class Leaderboard {
	async leaderboardData(after, count) {
		if (!after) after = '';
		if (!count) count = 10;
  
		let output = [];

		async function recurse(after) {
			if (after === null) return;

			let info = await fetch('https://repl.it/graphql', {
				method: 'POST',
				headers,
				body: JSON.stringify({
					query: `
            query Leaderboard($after: String!, $count: Int!) {
              leaderboard(after: $after, count: $count) {
                items { ${userAttributes} }
             		pageInfo {
            			nextCursor
                }
              }
            }`,
					variables: {
						after,
						count
					}
				})
			}).then(res => res.json());

			if (!info.data.leaderboard) {
				throw new Error(
					`Cannot fetch leaderboard`
				);
			} else {
				info.data.leaderboard.items.forEach(user => {
					output.push(user);
				});
				if(output.length != count) {
				  await recurse(info.data.leaderboard.pageInfo.nextCursor);
				}
			}
		}

		await recurse(after);
		return output;
	}
}

module.exports = {
	Leaderboard: Leaderboard
};
