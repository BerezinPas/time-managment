import styles from './row-header-col.module.scss';

export const RowHeaderCol = ({
	sortOption,
	setSortOption,
	field,
	text,
	className,
}) => {
	return (
		<div
			onClick={() => {
				if (sortOption.field === field && sortOption.how === 'inc') {
					setSortOption({ ...sortOption, how: 'dec' });
				} else {
					setSortOption({ ...sortOption, field: field, how: 'inc' });
				}
			}}
			className={className}
		>
			{text}
			<div
				className={`${sortOption.field === field ? styles[sortOption.how] : ''} ${styles.arrows}`}
			>
				<div className={`${styles.arrow} ${styles.arrowDown}`}></div>
				<div className={`${styles.arrow} ${styles.arrowUp}`}></div>
			</div>
		</div>
	);
};
