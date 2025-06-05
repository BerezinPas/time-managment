import { useSelector } from 'react-redux';
import styles from './header.module.scss';
import { selectUserImageURL, selectUserLogin } from '../../selectors';
import { Link, useLocation, useMatch, useParams } from 'react-router-dom';

export const Header = () => {
	const login = useSelector(selectUserLogin);
	const avatar = useSelector(selectUserImageURL);
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
						// className={styles.avatar}
						src={avatar}
						// src="D:\web\react\diplom\front\time-managment\backend\uploads\opkh6eb2z4my2xz6cd2wlyqvc.png"
						alt="avtar"
						className={styles.avatar}
					/>
				</Link>
			</div>
		</header>
	);
};
