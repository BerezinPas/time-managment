import styles from './App.module.scss';
import { Footer, Header } from './components';
import { useDispatch } from 'react-redux';
import { useLayoutEffect } from 'react';
import {
	loadOptionsAsync,
	loadProjectsAsync,
	SET_USER_IS_READY,
	setUser,
} from './actions';
import { useCheckAuthorizate } from './hooks';
import { AppRouter } from './routes/app-router';

function App() {
	const dispatch = useDispatch();
	const isAuth = useCheckAuthorizate();

	useLayoutEffect(() => {
		const currentUserDataJSON = sessionStorage.getItem('userData');

		if (!currentUserDataJSON) {
			dispatch(SET_USER_IS_READY);
			return;
		}
		const currentUserData = JSON.parse(currentUserDataJSON);
		dispatch(
			setUser({
				...currentUserData,
				id: Number(currentUserData.id),
			}),
		);
		dispatch(loadProjectsAsync(currentUserData.id));
		dispatch(loadOptionsAsync(currentUserData.id));
	}, [dispatch]);

	return (
		<div className={styles.appColumn}>
			{isAuth && <Header />}
			<div className={styles.pageContent}>
				<AppRouter />
			</div>
			<Footer />
		</div>
	);
}

export default App;
