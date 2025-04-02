import { Route, Routes } from 'react-router-dom';
import styles from './App.module.scss';
import { Footer, Header } from './components';
import { Authorization, Main, Projects, Register } from './pages';
import { useDispatch } from 'react-redux';
import { useLayoutEffect } from 'react';
import { setUser } from './actions';

function App() {
	const dispatch = useDispatch();

	useLayoutEffect(() => {
		const currentUserDataJSON = sessionStorage.getItem('userData');

		if (!currentUserDataJSON) {
			return;
		}
		const currentUserData = JSON.parse(currentUserDataJSON);
		dispatch(
			setUser({
				...currentUserData,
				id: Number(currentUserData.id),
			}),
		);
	}, [dispatch]);

	return (
		<div className={styles.appColumn}>
			<Header />
			<div className={styles.pageContent}>
				<Routes>
					<Route path="/" element={<Main />} />
					<Route path="/register" element={<Register />} />
					<Route path="/authorization" element={<Authorization />} />
					<Route path="/analitics" element={<div>analitics</div>} />
					<Route path="/projects" element={<Projects />} />
				</Routes>
			</div>

			<Footer />
		</div>
	);
}

export default App;
