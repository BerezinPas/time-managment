import { useSelector } from 'react-redux';
import { selectUserId } from '../selectors';

export const useCheckAuthorizate = () => {
	const id = useSelector(selectUserId);
	return id !== null;
};
