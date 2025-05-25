import { URL } from '../constants';
import { transformTrack } from '../transformers';

export const getTracks = (projectId) => {
	const fetchURL =
		projectId === undefined
			? `${URL}/tracks`
			: `${URL}/tracks?project_id=${projectId}`;

	return fetch(fetchURL)
		.then((tracks) => tracks.json())
		.then((tracks) => tracks && tracks.map(transformTrack));
};
