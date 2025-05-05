import { useState } from 'react';
import {
	DATE_STEP,
	ONE_DAY_IN_MSECS,
	ONE_HOUR_IN_MSECS,
	ONE_WEEK_IN_MSECS,
} from '../../../../constants';
import {
	formateHHMMSSToTimeStamp,
	formateTimeStampToHHMMSS,
} from '../../../../utils';
import styles from './bar-chart.module.scss';
import { Colum } from './components';

export const BarChart = ({ tracks, dateGap, timeZone }) => {
	const [showColsDate, setShowColsDate] = useState(true);
	const days = Math.floor((dateGap.end - dateGap.start) / ONE_DAY_IN_MSECS) + 1;

	let stepInDays = 'days';
	let durationCols;
	let dateStep;
	if (days < 32) {
		stepInDays = 1;
		dateStep = DATE_STEP.DAY;
		durationCols = tracks.reduce(
			(acc, curTrack) => {
				const index = Math.floor(
					(Date.parse(curTrack.startTime) -
						dateGap.start -
						timeZone * ONE_HOUR_IN_MSECS) /
						ONE_DAY_IN_MSECS,
				);
				if (acc[index]) {
					acc[index] = formateTimeStampToHHMMSS(
						formateHHMMSSToTimeStamp(acc[index]) +
							formateHHMMSSToTimeStamp(curTrack.duration),
					);
				} else {
					acc[index] = curTrack.duration;
				}
				return acc;
			},
			new Array(days / stepInDays).fill('0:00:00'),
		);
	} else if (days < 150) {
		stepInDays = 7;
		dateStep = DATE_STEP.WEEK;

		durationCols = tracks.reduce(
			(acc, curTrack) => {
				const index = Math.floor(
					(Date.parse(curTrack.startTime) -
						dateGap.start -
						timeZone * ONE_HOUR_IN_MSECS) /
						ONE_WEEK_IN_MSECS,
				);
				if (acc[index]) {
					acc[index] = formateTimeStampToHHMMSS(
						formateHHMMSSToTimeStamp(acc[index]) +
							formateHHMMSSToTimeStamp(curTrack.duration),
					);
				} else {
					acc[index] = curTrack.duration;
				}
				return acc;
			},
			new Array(Math.ceil(days / stepInDays)).fill('0:00:00'),
		);
		// } else if (days < 367) {
	} else {
		dateStep = DATE_STEP.MOUNTH;

		console.log('dateGap.start', dateGap.start);
		console.log('dateGap.start', dateGap.start - timeZone * ONE_HOUR_IN_MSECS);

		const startDate = new Date(dateGap.start - timeZone * ONE_HOUR_IN_MSECS);
		const endDate = new Date(dateGap.end - timeZone * ONE_HOUR_IN_MSECS);
		const startMounth = startDate.getMonth();
		const startYear = startDate.getFullYear();
		const endMounth = endDate.getMonth();
		const endYear = endDate.getFullYear();
		const mouthsQuantity = endMounth - startMounth + (endYear - startYear) * 12;

		durationCols = tracks.reduce((acc, curTrack) => {
			const trackDate = new Date(
				Date.parse(curTrack.startTime) - timeZone * ONE_HOUR_IN_MSECS,
			);

			const index =
				trackDate.getMonth() -
				startMounth +
				(trackDate.getFullYear() - startYear) * 12;

			if (acc[index]) {
				acc[index] = formateTimeStampToHHMMSS(
					formateHHMMSSToTimeStamp(acc[index]) +
						formateHHMMSSToTimeStamp(curTrack.duration),
				);
			} else {
				acc[index] = curTrack.duration;
			}
			return acc;
		}, new Array(mouthsQuantity).fill('0:00:00'));
	}
	// console.log('groupedTracks', durationCols);

	const total = durationCols.reduce((maxDurationCol, curDurationCol) => {
		return formateHHMMSSToTimeStamp(curDurationCol) > maxDurationCol
			? formateHHMMSSToTimeStamp(curDurationCol)
			: maxDurationCol;
	}, 0);

	let durationStep = Math.ceil(total / ONE_HOUR_IN_MSECS / 5);

	durationStep = durationStep > 0 ? durationStep : 1;

	let classes = `${styles.barChart} ${showColsDate ? '' : 'hideColsDate'}`;

	classes += ` ${durationCols.length > 15 ? 'showOddCols' : ''}`;

	return (
		<div
			className={classes}
			style={{ gap: `${durationCols.length > 15 ? '10px' : '25px'}` }}
		>
			{[...new Array(6)].map((_, index) => (
				<div
					key={index}
					className={styles.durationStep}
					style={{ bottom: `${40 * index}px` }}
				>
					{durationStep * index}ч
				</div>
			))}

			{durationCols.map((colDuration, index) => (
				<Colum
					key={index}
					duration={colDuration}
					durationStep={durationStep}
					dateGap={dateGap}
					step={index}
					dateStep={dateStep}
					setShowColsDate={setShowColsDate}
				/>
			))}
		</div>
	);
};
