import { useSelector } from 'react-redux';
import styles from './header.module.scss';
import { selectUserImageURL, selectUserLogin } from '../../selectors';
import { Link, useLocation } from 'react-router-dom';

export const Header = () => {
	const login = useSelector(selectUserLogin);
	const avatar = useSelector(selectUserImageURL);
	const { pathname } = useLocation();

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
					<img src={avatar} alt="avtar" className={styles.avatar} />
				</Link>
			</div>
		</header>
	);
};
