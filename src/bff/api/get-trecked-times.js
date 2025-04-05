import { URL } from '../constants';
import { transformTreckedTime } from '../transformers';

export const getTreckedTimes = (projectId) =>
	fetch(`${URL}/trecked_times?project_id=${projectId}`)
		.then((treckedTimes) => treckedTimes.json())
		.then(
			(treckedTimes) => treckedTimes && treckedTimes.map(transformTreckedTime),
		)
		.then((treckedTimes) => {
			return (
				treckedTimes &&
				treckedTimes.map((el) => ({
					...el,
					startTime: Date.parse(el.startTime),
					endTime: Date.parse(el.endTime),
				}))
			);
		});
