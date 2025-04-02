import { Link } from 'react-router-dom';
import styles from './footer.module.scss';

export const Footer = () => {
	return (
		<footer className={styles.footer}>
			<Link to={'/register'}>register</Link>
			<Link to={'/authorization'}>authorization</Link>
		</footer>
	);
};
