import { initDateGapStartTime } from './init-start-time-date-gap';

export const initOptionsFilter = (
	projects,
	projectId,
	defaultStartTimeInAnalytics,
) => {
	return {
		shouldGroup: projectId === undefined,
		dateGap: {
			start: initDateGapStartTime(
				projects,
				projectId,
				defaultStartTimeInAnalytics,
			),
			end: new Date().setHours(23, 59, 59, 99),
		},
	};
};
