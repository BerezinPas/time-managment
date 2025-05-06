import { useState } from 'react';
import styles from './analytics-table-row.module.scss';
import { LoadMore } from '../../../../../../components';
import { PAGINATION_LIMIT } from '../../../../../../constants';

export const AnalyticsTableRow = ({ rowData, shouldGroup }) => {
	const [showSpoilerData, setShowSpoilerData] = useState(false);

	const onToggle = () => setShowSpoilerData(!showSpoilerData);
	// const [page, setPage] = useState(1);

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
					// rowData.tracks.slice(0, PAGINATION_LIMIT * page).map((track) => {
					rowData.tracks.map((track) => {
						return (
							<>
								<div className="row " key={track.id}>
									<div className={styles.colName}>{track.description}</div>
									<div className={styles.colDate}>
										{new Date(track.startTime)
											.toLocaleDateString()
											.slice(0, 10)}
									</div>
									<div className={styles.colDuration}>{track.duration}</div>
									<div className={styles.colProcent}>
										{track.percentageOfTotal.toFixed(2)}%
									</div>
								</div>
							</>
						);
					})}
				{/* {showSpoilerData && rowData.tracks.length > PAGINATION_LIMIT * page && (
					<LoadMore onClick={() => setPage((prev) => prev + 1)} />
				)} */}
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
