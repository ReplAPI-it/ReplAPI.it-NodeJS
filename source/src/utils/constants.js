/* eslint-disable no-dupe-keys */
import { assign } from 'lodash-es';
import { cosmiconfigSync, defaultLoaders } from 'cosmiconfig';

const initVariables = {
	username: '',
	captcha: {
		token: '',
	},
	endpoints: {
		gql: '',
		restful: '',
		login: '',
	},
	markdown: {
		length: '',
		removeMarkdown: '',
	},
	previewCount: {
		comments: '',
	},
	experimentalFeatures: '',
	createDatabaseFlag: '',
	statsForNerds: '',
};

const moduleName = 'replapi';

const explorer = cosmiconfigSync(moduleName, {
	searchPlaces: [
		'package.json',
		`.${moduleName}rc`,
		`.${moduleName}rc.json`,
		`.${moduleName}rc.yaml`,
		`.${moduleName}rc.yml`,
		`.${moduleName}rc.js`,
		`.${moduleName}rc.cjs`,
		`${moduleName}.config.js`,
		`${moduleName}.config.cjs`,
		`${moduleName}.config.mjs`,
	],
	loaders: {
		defaultLoaders,
		'.mjs': async (filepath) => {
			const val = await import(filepath);
			return val;
		},
	},
});

const result = explorer.search();
if (result !== null) assign(initVariables, result.config);

export default {
	initVariables,
	roleAttributes: { id: '', name: '', key: '', tagline: '' },
	languageAttributes: {
		id: '',
		displayName: '',
		key: '',
		category: '',
		tagline: '',
		icon: '',
		isNew: '',
	},
	organizationAttributes: {
		id: '',
		name: '',
		country: '',
		postalCode: '',
		state: '',
		city: '',
		googlePlaceId: '',
		timeCreated: '',
		timeUpdated: '',
		timeDeleted: '',
		time_created: '',
	},
	subscriptionAttributes: {
		id: '',
		userId: '',
		customerId: '',
		planId: '',
		timeUpdated: '',
		timeCreated: '',
		timeDeleted: '',
	},
	userAttributes: {
		id: '',
		username: '',
		firstName: '',
		lastName: '',
		bio: '',
		isVerified: '',
		displayName: '',
		fullName: '',
		url: '',
		isLoggedIn: '',
		isSubscribed: '',
		timeCreated: '',
		isBannedFromBoards: '',
		karma: '',
		isHacker: '',
		image: '',
	},
	boardAttributes: {
		id: '',
		name: '',
		description: '',
		slug: '',
		cta: '',
		titleCta: '',
		bodyCta: '',
		template: '',
		buttonCta: '',
		color: '',
		replRequired: '',
		isLocked: '',
		isAnswerable: '',
		isPrivate: '',
		timeCreated: '',
		timeUpdated: '',
		url: '',
		canPost: '',
	},
	tagAttributes: {
		id: '',
		replCount: '',
		replsTaggedTodayCount: '',
		creatorCount: '',
		isTrending: '',
	},
	replAttributes: {
		id: '',
		language: '',
		isRenamed: '',
		isProject: '',
		isPrivate: '',
		isStarred: '',
		isAlwaysOn: '',
		isBoosted: '',
		title: '',
		slug: '',
		description: '',
		timeCreated: '',
		timeUpdated: '',
		isOwner: '',
		pinnedToProfile: '',
		folderId: '',
		folder: { args: [], items: { id: '', name: '' } },
		files: '',
		size: '',
		url: '',
		url: [{ propOverride: true, lite: true }, 'liteUrl'],
		hostedUrl: '',
		hostedUrl: [{ propOverride: true, dotty: true }, 'dottyUrl'],
		hostedUrl: [{ propOverride: true, protocol: 'WSS' }, 'wssUrl'],
		terminalUrl: '',
		runCount: '',
		publicForkCount: '',
		imageUrl: '',
		reactions: { args: [], items: { id: '', type: '', count: '' } },
		origin: { args: [], items: { url: '' } },
		ioTests: {
			args: [],
			items: { id: '', name: '', template: { args: [], items: { id: '' } } },
		},
		hasUnitTesting: '',
		unitTests: {
			args: [],
			items: {
				tests: { args: [], items: { id: '', name: '', code: '' } },
				meta: { args: [], items: { imports: '', setup: '', tearDown: '' } },
			},
		},
	},
	replCommentAttributes: {
		id: '',
		body: '',
		timeCreated: '',
		timeUpdated: '',
		canEdit: '',
		canComment: '',
	},
	commentAttributes: {
		id: '',
		body: '',
		voteCount: '',
		timeCreated: '',
		timeUpdated: '',
		url: '',
		isAuthor: '',
		canEdit: '',
		canVote: '',
		canComment: '',
		hasVoted: '',
		canReport: '',
		hasReported: '',
		isAnswer: '',
		canSelectAsAnswer: '',
		canUnselectAsAnswer: '',
		preview: [
			{
				propOverride: true,
				length: initVariables.markdown.length || 150,
				removeMarkdown: initVariables.markdown.removeMarkdown || true,
			},
		],
	},
	postAttributes: {
		id: '',
		title: '',
		body: '',
		showHosted: '',
		voteCount: '',
		commentCount: '',
		isPinned: '',
		isLocked: '',
		timeCreated: '',
		timeUpdated: '',
		url: '',
		isAnnouncement: '',
		isAuthor: '',
		canEdit: '',
		canComment: '',
		canVote: '',
		canPin: '',
		canSetType: '',
		canChangeBoard: '',
		canLock: '',
		hasVoted: '',
		canReport: '',
		hasReported: '',
		isAnswerable: '',
		tutorialPages: '',
		preview: [
			{
				propOverride: true,
				length: initVariables.markdown.length || 150,
				removeMarkdown: initVariables.markdown.removeMarkdown || true,
			},
		],
	},
	graphql: `${initVariables.endpoints.gql || 'https://replit.com/graphql'}`,
	login: `${initVariables.endpoints.login || 'https://replit.com/login'}`,
	restful: `${initVariables.endpoints.restful || 'https://replit.com'}`,
};
