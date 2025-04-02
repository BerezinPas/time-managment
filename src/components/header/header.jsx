import styles from './header.module.scss';

export const Header = () => {
	return (
		<header className={styles.header}>
			<div className={styles.container}>
				<div className={styles.links}>
					<div className={styles.link}>Главная</div>
					<div className={styles.link}>Проекты</div>
					<div className={styles.link}>Аналитика</div>
				</div>
				<div className={styles.user}>
					<div>user</div>
					<img
						src="https://placehold.jp/3d4070/ffffff/40x40.png"
						alt="avtar"
						className={styles.avatar}
					/>
				</div>
			</div>
		</header>
	);
};
