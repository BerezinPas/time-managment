import { Route, Routes } from 'react-router-dom';
import styles from './App.module.scss';
import { Footer, Header } from './components';
import { Main, Register } from './pages';

function App() {
	return (
		<div className={styles.appColumn}>
			<Header />
			<div className={styles.pageContent}>
				<Routes>
					<Route path="/" element={<Main />} />
					<Route path="/register" element={<Register />} />
					<Route path="/authorization" element={<Register />} />
				</Routes>
			</div>

			<Footer />
		</div>
	);
}

export default App;
