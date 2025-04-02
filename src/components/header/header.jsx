import { useSelector } from 'react-redux';
import styles from './header.module.scss';
import { selectUserLogin } from '../../selectors';
import { Link } from 'react-router-dom';

export const Header = () => {
	const login = useSelector(selectUserLogin);
	return (
		<header className={styles.header}>
			<div className={styles.container}>
				<div className={styles.links}>
					<Link to="/" className={styles.link}>
						Главная
					</Link>
					<Link to="/projects" className={styles.link}>
						Проекты
					</Link>
					<Link to="/analitics" className={styles.link}>
						Аналитика
					</Link>
				</div>
				<div className={styles.user}>
					<div>{login}</div>
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
