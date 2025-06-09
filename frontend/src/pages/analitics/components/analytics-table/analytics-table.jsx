import { useState } from 'react';
import { Loader, LoadMore } from '../../../../components';
import { PAGINATION_LIMIT } from '../../../../constants';
import styles from './analytics-table.module.scss';
import { AnalyticsTableRow, RowHeaderCol } from './components';

export const AnalyticsTable = ({
	data,
	shouldGroup,
	sortOption,
	setSortOption,
	isLoading,
}) => {
	const [page, setPage] = useState(1);

	if (data.length === 0 && !isLoading) {
		return 'В данном диапазоне нет ни одного трека.';
	}

	const tableContent = (
		<>
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

	return (
		<div className={styles.table}>
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
			{isLoading ? <Loader /> : tableContent}
		</div>
	);
};
