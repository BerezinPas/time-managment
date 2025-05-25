import { URL } from '../constants';
import { transformUser } from '../transformers';

export const getSession = (hash) =>
	fetch(`${URL}/sessions?hash=${hash}`)
		.then((session) => session.json())
		.then(([session]) => {
			console.log(session);

			return (
				session && {
					...session,
					user: {
						...transformUser(session.user),
					},
				}
			);
		});
