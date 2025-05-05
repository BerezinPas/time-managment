import styles from './analytics-table.module.scss';
import { AnalyticsTableRow } from './components';

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
