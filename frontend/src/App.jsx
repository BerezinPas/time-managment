import styles from './App.module.scss';
import { Footer, Header, Modal } from './components';
import { useDispatch } from 'react-redux';
import { useLayoutEffect, useState } from 'react';
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
	const [isLoading, setIsLoading] = useState(true);
	useLayoutEffect(() => {
		const currentUserDataJSON = sessionStorage.getItem('userData');

		if (!currentUserDataJSON) {
			dispatch(SET_USER_IS_READY);
			setIsLoading(false);
			return;
		}
		const currentUserData = JSON.parse(currentUserDataJSON);
		dispatch(
			setUser({
				...currentUserData,
				id: Number(currentUserData.id),
			}),
		);
		Promise.all([
			dispatch(loadProjectsAsync(currentUserData.id)),
			dispatch(loadOptionsAsync(currentUserData.id)),
		]).finally(() => {
			setIsLoading(false);
		});
	}, [dispatch]);

	return (
		<div className={styles.appColumn}>
			{isAuth && <Header />}
			<div className={styles.pageContent}>
				<AppRouter isLoading={isLoading} />
			</div>
			<Footer />
			<Modal />
		</div>
	);
}

export default App;
