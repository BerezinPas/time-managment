import { useState } from 'react';
import { ONE_HOUR_IN_MSECS } from '../../../../../../constants';
import { formateHHMMSSToTimeStamp } from '../../../../../../utils';
import styles from './colum.module.scss';
import { getColDate, getDate, getToolTipDate } from './utils';

export const Colum = ({
	duration,
	dateGap,
	dateStep,
	step,
	durationStep,
	setShowColsDate,
}) => {
	let height = 0;
	let date = getDate(dateStep, dateGap, step);

	if (duration && formateHHMMSSToTimeStamp(duration) > 0) {
		height =
			(formateHHMMSSToTimeStamp(duration) /
				(durationStep * 5 * ONE_HOUR_IN_MSECS)) *
			200;
	}

	const [toolTipIsOpen, setToolTipIsOpen] = useState(false);

	const showTooltip = () => {
		setShowColsDate(false);
		if (duration === '0:00:00') {
			return;
		}
		setToolTipIsOpen(true);
	};

	const hideToolTip = () => {
		setShowColsDate(true);
		setToolTipIsOpen(false);
	};

	return (
		<>
			<div className={styles.colWrapper}>
				{toolTipIsOpen && (
					<div className={styles.toolTip} style={{ bottom: `${height}px` }}>
						<div className="">{getToolTipDate(date, dateStep)}</div>
						<div>всего: {duration}</div>
					</div>
				)}
				<div className={styles.col}>
					<div className={styles.duration} style={{ bottom: `${height}px` }}>
						{duration === '0:00:00' ? '' : duration.slice(0, -3)}
					</div>
					<div
						className={styles.colBg}
						style={{ height: `${height}px` }}
						onMouseEnter={() => showTooltip()}
						onMouseLeave={() => hideToolTip()}
					></div>
				</div>
				<div
					className={styles.date}
					onMouseEnter={() => showTooltip()}
					onMouseLeave={() => hideToolTip()}
				>
					{getColDate(date, dateStep)}
				</div>
			</div>
		</>
	);
};
