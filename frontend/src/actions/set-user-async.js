import { setUser } from './set-user';

export const setUserAsync = (userData) => (dispatch) => {
	return fetch('/api/users', {
		method: 'POST',
		body: userData,
	})
		.then((res) => res.json())
		.then(({ error, res }) => {
			if (error) {
				return { error, res };
			}
			dispatch(setUser(res));
			sessionStorage.setItem('userData', JSON.stringify(res));
			return { error, res };
		});
};
