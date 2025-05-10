import { useState } from 'react';
import { LoadMore } from '../../../../components';
import { PAGINATION_LIMIT } from '../../../../constants';
import styles from './analytics-table.module.scss';
import { AnalyticsTableRow, RowHeaderCol } from './components';

export const AnalyticsTable = ({
	data,
	shouldGroup,
	sortOption,
	setSortOption,
}) => {
	const [page, setPage] = useState(1);

	if (data.length === 0) {
		return 'В данном диапазоне нет ни одного трека.';
	}

	return (
		<>
			<div className={`${styles.analyticsRow} row rowHeader rowDark`}>
				<RowHeaderCol
					field="name"
					setSortOption={setSortOption}
					sortOption={sortOption}
					text="Название"
					className={styles.colName}
				/>
				<RowHeaderCol
					field="date"
					setSortOption={setSortOption}
					sortOption={sortOption}
					text="Дата"
					className={styles.colDate}
				/>
				<RowHeaderCol
					field="duration "
					setSortOption={setSortOption}
					sortOption={sortOption}
					text="Длительность"
					className={styles.colDuration}
				/>
				<div className={styles.colProcent}>процент</div>
			</div>

			{data.slice(0, page * PAGINATION_LIMIT).map((rowData) => (
				<AnalyticsTableRow
					key={rowData.id}
					shouldGroup={shouldGroup}
					rowData={rowData}
				/>
			))}
			{data.length > PAGINATION_LIMIT * page && (
				<LoadMore onClick={() => setPage((prev) => prev + 1)} />
			)}
		</>
	);
};
