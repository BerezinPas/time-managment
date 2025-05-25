import { Link } from 'react-router-dom';
import { useCheckAuthorizate } from '../../hooks';
import styles from './error-page.module.scss';

export const ErrorPage = () => {
	const isAuth = useCheckAuthorizate();

	return (
		<div className="container">
			<div className={styles.errorText}>Ошибка 404</div>
			<div className={styles.text}>
				Страница не найдена. Проверьте пожалуйста адрес
				{!isAuth && (
					<div className={styles.links}>
						перейти на страницу <Link to="/register">регистрации</Link>,
						<Link to="/authorization"> авторизации</Link>
					</div>
				)}
			</div>
		</div>
	);
};
