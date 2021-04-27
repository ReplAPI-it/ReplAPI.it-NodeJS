async function getUserStats(username) {
	const myUser = new replapi.User(username);
	const profileData = myUser.userGraphQLDataAbridged();
	const postData = myUser.postsDataAbridged('', 10000, '');
	const commentData = myUser.commentsDataAbridged('', 100000, '');
	
	const [profileResult, postResult, commentResult] = await Promise.all([
		profileData, 
		postData.then(posts => posts.length), 
		commentData.then(comments => comments.length)
	]);
	
	return {
		profileResult,
		postResult,
		commentResult,
	}
}

getUserStats('RayhanADev');