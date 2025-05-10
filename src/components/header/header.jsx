import { useSelector } from 'react-redux';
import styles from './header.module.scss';
import { selectUserLogin } from '../../selectors';
import { Link, useLocation, useMatch, useParams } from 'react-router-dom';

export const Header = () => {
	const login = useSelector(selectUserLogin);
	const { pathname } = useLocation();
	console.log('params', pathname);

	return (
		<header className={styles.header}>
			<div className={`${styles.container} container`}>
				<div className={styles.links}>
					<Link
						to="/"
						className={`${styles.link} ${pathname === '/' ? styles.active : ''}`}
					>
						Главная
					</Link>
					<Link
						to="/projects"
						className={`${styles.link} ${pathname === '/projects' ? styles.active : ''}`}
					>
						Проекты
					</Link>
					<Link
						to="/analytics"
						className={`${styles.link} ${pathname === '/analytics' ? styles.active : ''}`}
					>
						Аналитика
					</Link>
				</div>
				<Link
					to="/user"
					className={`${styles.user} ${pathname === '/user' ? styles.active : ''}`}
				>
					<div>{login}</div>
					<img
						src="https://placehold.jp/3d4070/ffffff/40x40.png"
						alt="avtar"
						className={styles.avatar}
					/>
				</Link>
			</div>
		</header>
	);
};
