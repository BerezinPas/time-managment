import { URL } from '../constants';
import { transformUser } from '../transformers';

export const getSession = (id) =>
	fetch(`${URL}/sessions/${id}`)
		.then((session) => session.json())
		.then(
			(session) =>
				session && {
					...session,
					user: {
						...transformUser(session.user),
					},
				},
		);
