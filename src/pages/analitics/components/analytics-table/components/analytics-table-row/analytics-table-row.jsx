import { useState } from 'react';
import styles from './analytics-table-row.module.scss';

export const AnalyticsTableRow = ({ rowData, shouldGroup }) => {
	const [showSpoilerData, setShowSpoilerData] = useState(false);

	const onToggle = () => setShowSpoilerData(!showSpoilerData);

	const content = shouldGroup ? (
		<div key={rowData.id} className={`${styles.projectWrapper} hover`}>
			<div className={`${styles.projectRow}`} onClick={onToggle}>
				<div className={styles.colName}>{rowData.name}</div>
				<div className={styles.colDuration}>{rowData.duration}</div>
				<div className={styles.colProcent}>
					{rowData.percentageOfTotal.toFixed(2)}%
				</div>
			</div>
			<div className={styles.tracksWrapper}>
				{showSpoilerData &&
					rowData.tracks.map((track) => {
						// console.log(track.startTime.slice(0, 10));

						return (
							<div className="row " key={track.id}>
								<div className={styles.colName}>{track.description}</div>
								<div className={styles.colDate}>
									{new Date(track.startTime).toLocaleDateString().slice(0, 10)}
								</div>
								<div className={styles.colDuration}>{track.duration}</div>
								<div className={styles.colProcent}>
									{track.percentageOfTotal.toFixed(2)}%
								</div>
							</div>
						);
					})}
			</div>
		</div>
	) : (
		<div className={`row`}>
			<div className={styles.colName}>{rowData.description}</div>
			<div className={styles.colDate}>
				{new Date(rowData.startTime).toLocaleDateString().slice(0, 10)}
			</div>
			<div className={styles.colDuration}>{rowData.duration}</div>
			<div className={styles.colProcent}>
				{rowData.percentageOfTotal.toFixed(2)}%
			</div>
		</div>
	);

	return content;
};
