import { useState } from 'react';
import styles from './analytics-table.module.scss';

const AnalyticsTableRow = ({
	// id,
	// name,
	// tracks,
	// summuryDuration,
	// percentageOfTotal,
	// shouldGroup,
	rowData,
	shouldGroup,
}) => {
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

export const AnalyticsTable = ({
	data,
	shouldGroup,
	sortOption,
	setSortOption,
}) => {
	console.log('sortOption', sortOption);

	return (
		<>
			<div className={`${styles.analyticsRow} row rowHeader rowDark`}>
				<div
					onClick={() => {
						if (sortOption.field === 'name' && sortOption.how === 'inc') {
							setSortOption({ ...sortOption, how: 'dec' });
						} else {
							setSortOption({ ...sortOption, field: 'name', how: 'inc' });
						}
					}}
					className={styles.colName}
				>
					название
					<div
						className={`${sortOption.field === 'name' ? styles[sortOption.how] : ''} ${styles.arrows}`}
					>
						<div className={`${styles.arrow} ${styles.arrowDown}`}></div>
						<div className={`${styles.arrow} ${styles.arrowUp}`}></div>
					</div>
				</div>
				<div
					onClick={() => {
						if (sortOption.field === 'date' && sortOption.how === 'inc') {
							setSortOption({ ...sortOption, how: 'dec' });
						} else {
							setSortOption({ ...sortOption, field: 'date', how: 'inc' });
						}
					}}
					className={styles.colDate}
				>
					дата
					<div
						className={`${sortOption.field === 'date' ? styles[sortOption.how] : ''} ${styles.arrows}`}
					>
						<div className={`${styles.arrow} ${styles.arrowDown}`}></div>
						<div className={`${styles.arrow} ${styles.arrowUp}`}></div>
					</div>
				</div>
				<div
					onClick={() => {
						if (sortOption.field === 'duration' && sortOption.how === 'inc') {
							setSortOption({ ...sortOption, how: 'dec' });
						} else {
							setSortOption({ ...sortOption, field: 'duration', how: 'inc' });
						}
					}}
					className={styles.colDuration}
				>
					длительность
					<div
						className={`${sortOption.field === 'duration' ? styles[sortOption.how] : ''} ${styles.arrows}`}
					>
						<div className={`${styles.arrow} ${styles.arrowDown}`}></div>
						<div className={`${styles.arrow} ${styles.arrowUp}`}></div>
					</div>
				</div>
				<div className={styles.colProcent}>процент</div>
			</div>

			{data.map((rowData) => (
				<AnalyticsTableRow
					key={rowData.id}
					shouldGroup={shouldGroup}
					rowData={rowData}
				/>
			))}
		</>
	);
};

/* {data.map(({ id, name, tracks, summuryDuration, percentageOfTotal }) => (
				<AnalyticsTableRow
					key={id}
					id={id}
					name={name}
					percentageOfTotal={percentageOfTotal}
					tracks={tracks}
					summuryDuration={summuryDuration}
					shouldGroup={shouldGroup}
				/>
			))} */
