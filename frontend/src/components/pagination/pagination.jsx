import { Button } from '../button/button';
import styles from './pagination.module.scss';

export const Pagination = ({ page, setPage, lastPage, ...props }) => {
	return (
		<div {...props} className={styles.pagination}>
			<Button
				variant="secondary"
				disabled={page === 1}
				onClick={() => setPage(1)}
			>
				⏮
			</Button>
			<Button disabled={page === 1} onClick={() => setPage(page - 1)}>
				◀
			</Button>
			<div className="current-page">{page}</div>
			<Button disabled={page === lastPage} onClick={() => setPage(page + 1)}>
				▶
			</Button>
			<Button
				variant="secondary"
				disabled={page === lastPage}
				onClick={() => setPage(lastPage)}
			>
				⏭
			</Button>
		</div>
	);
};
