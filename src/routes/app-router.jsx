import { Route, Routes } from 'react-router-dom';
import { ProtectedRoute } from './protected-route';
import {
	Analytics,
	Authorization,
	ErrorPage,
	MainPage,
	Project,
	Projects,
	Register,
	UserPage,
} from '../pages';

export const AppRouter = () => {
	return (
		<Routes>
			<Route
				path="/"
				element={
					<ProtectedRoute>
						<MainPage />
					</ProtectedRoute>
				}
			/>
			<Route
				path="/register"
				element={
					<ProtectedRoute isInversed>
						<Register />
					</ProtectedRoute>
				}
			/>
			<Route
				path="/authorization"
				element={
					<ProtectedRoute isInversed>
						<Authorization />
					</ProtectedRoute>
				}
			/>
			<Route
				path="/analytics"
				element={
					<ProtectedRoute>
						<Analytics />
					</ProtectedRoute>
				}
			/>
			<Route
				path="/analytics/:id"
				element={
					<ProtectedRoute>
						<Analytics />
					</ProtectedRoute>
				}
			/>
			<Route
				path="/projects"
				element={
					<ProtectedRoute>
						<Projects />
					</ProtectedRoute>
				}
			/>
			<Route
				path="/project"
				element={
					<ProtectedRoute>
						<Project />
					</ProtectedRoute>
				}
			/>
			<Route
				path="/project/:id"
				element={
					<ProtectedRoute>
						<Project />
					</ProtectedRoute>
				}
			/>
			<Route
				path="/project/:id/edit"
				element={
					<ProtectedRoute>
						<Project />
					</ProtectedRoute>
				}
			/>
			<Route
				path="/user"
				element={
					<ProtectedRoute>
						<UserPage />
					</ProtectedRoute>
				}
			/>
			<Route path="/*" element={<ErrorPage />} />
		</Routes>
	);
};
