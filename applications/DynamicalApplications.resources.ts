//

const newApp = (icon: string, en: string, zh: string) => ({icon, en, zh});

export const R = {
	dashboards: newApp(
		'dashboards.png',
		'Dashboards',
		'目标管理',
	),
	workspace: newApp(
		'workspace.png',
		'Workspace',
		'工作空间',
	),
	schedules: newApp(
		'schedules.png',
		'Schedules',
		'日程管理',
	),
	noting: newApp(
		'noting.png',
		'Notes',
		'笔记',
	),
	calendar: newApp(
		'calendar.png',
		'Calendar',
		'日历',
	),
	activities: newApp(
		'activities.png',
		'Activities',
		'校园活动', // 社团活动
	),
	newses: newApp(
		'news.png',
		'Newses', // Subscription
		'新闻',
	),
	infraTextTailor: newApp(
		'text-tailor.png',
		'Text Tailor',
		'文本裁剪',
	),
};
