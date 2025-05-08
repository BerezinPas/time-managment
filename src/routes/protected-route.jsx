import { Navigate } from 'react-router-dom';
import { useCheckAuthorizate } from '../hooks';
import { useSelector } from 'react-redux';
import { selectUserIsReady } from '../selectors';
import { Loader } from '../components';

export const ProtectedRoute = ({ children, isInversed = false }) => {
	const isAuth = useCheckAuthorizate();
	const isReady = useSelector(selectUserIsReady);

	if (!isReady) {
		return <Loader />;
	}

	if (isInversed && isAuth) {
		return <Navigate to="/" />;
	}

	if (!isInversed && !isAuth) {
		return <Navigate to="/authorization" />;
	}

	return children;
};
