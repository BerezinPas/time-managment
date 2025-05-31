import { useState } from 'react';
import { ONE_HOUR_IN_MSECS } from '../../../../constants';
import { formateHHMMSSToTimeStamp } from '../../../../utils';
import styles from './bar-chart.module.scss';
import { Colum } from './components';
import { calculateDurationStats } from './utils';

export const BarChart = ({ tracks, dateGap }) => {
	const [showColsDate, setShowColsDate] = useState(true);

	const { dateStep, durationCols } = calculateDurationStats(dateGap, tracks);

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
