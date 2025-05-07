export const ONE_HOUR_IN_MSECS = 1000 * 60 * 60;
export const ONE_DAY_IN_MSECS = ONE_HOUR_IN_MSECS * 24;
export const ONE_WEEK_IN_MSECS = ONE_DAY_IN_MSECS * 7;

export const DATE_STEP = {
	MOUNTH: 'MOUNTH',
	DAY: 'DAY',
	WEEK: 'WEEK',
};

export const MOUNTH = [
	'янв',
	'фев',
	'мар',
	'апр',
	'май',
	'июн',
	'июл',
	'авг',
	'сен',
	'окт',
	'ноя',
	'дек',
];
export const PAGINATION_LIMIT = 3;

export const OPTIONS_START_TIME_DEFAULT_VALUE = {
	MAX: 'MAX',
	WEEK: 'WEEK',
	MOUNTH: 'MOUNTH',
	YEAR: 'YEAR',
};

export const OPTIONS_START_TIME_DEFAULT = [
	{
		value: OPTIONS_START_TIME_DEFAULT_VALUE.MAX,
		label: 'с первого трека',
	},
	{
		value: OPTIONS_START_TIME_DEFAULT_VALUE.WEEK,
		label: 'текущая неделя',
	},
	{
		value: OPTIONS_START_TIME_DEFAULT_VALUE.MOUNTH,
		label: 'текущий месяц',
	},
	{
		value: OPTIONS_START_TIME_DEFAULT_VALUE.YEAR,
		label: 'текущий год',
	},
];
