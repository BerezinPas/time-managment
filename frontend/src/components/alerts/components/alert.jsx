import { useEffect } from 'react';
import styles from './alert.module.scss';

export const Alert = ({ text, type, onRemove, ms }) => {
	useEffect(() => {
		const timer = setTimeout(() => {
			onRemove();
		}, ms);
		return () => clearTimeout(timer);
	}, []);

	let classes = styles.alert;
	let icon;
	switch (type) {
		case 'danger':
			classes += ` ${styles.danger}`;
			icon = '❌';
			break;

		default:
			classes += ` ${styles.success}`;
			icon = '✅';

			break;
	}
	return (
		<div className={classes}>
			<div className={styles.text}>
				<span>{icon}</span>
				{text}
			</div>
			<button onClick={onRemove} className={styles.close}>
				✖
			</button>
		</div>
	);
};
