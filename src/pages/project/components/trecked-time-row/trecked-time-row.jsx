import { formateTimeStampToHHMMSS } from '../../../../utils';
import styles from './trecked-time-row.module.scss';
export const TreckedTimeRow = ({
	id,
	projectId,
	startTime,
	endTime,
	description,
}) => {
	console.log(new Date(endTime - 300000000).toUTCString());
	console.log(new Date('04 Apr 2025 07:32:16 GMT'));

	return (
		<div className={styles.row}>
			<div className={styles.descCol}>{description}</div>
			<div className={styles.durationCol}>
				{formateTimeStampToHHMMSS(endTime - startTime)}
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

// TODO записывать в бд не таймШтамп а дату
// когда получаю данные преобразовать их обратно в таймШтамп
