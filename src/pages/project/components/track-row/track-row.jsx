import { formateTimeStampToHHMMSS } from '../../../../utils';
import styles from './track-row.module.scss';
export const TrackRow = ({
	id,
	projectId,
	startTime,
	endTime,
	description,
}) => {
	return (
		<div className="row">
			<div className={styles.descCol}>{description}</div>
			<div className={styles.durationCol}>
				{formateTimeStampToHHMMSS(new Date(endTime) - new Date(startTime))}
			</div>
			<div className={styles.timeCol}>
				<div>
					{new Date(startTime).toLocaleTimeString().slice(0, -3)}
					{' - '}
					{new Date(endTime).toLocaleTimeString().slice(0, -3)}
				</div>
				<div className={styles.date}>
					{new Date(startTime).toLocaleDateString()}
				</div>
			</div>
		</div>
	);
};
