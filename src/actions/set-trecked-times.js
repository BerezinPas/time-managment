import { server } from '../bff';
import { createTreckedTime } from './create-trecked-time';
import { deleteTreckedTime } from './delete-trecked-time';
import { updateTreckedTime } from './update-trecked-time';

export const setTreckedTimes = (treckedTimes) => (dispatch) => {
	return server.saveTreckedTimes(treckedTimes).then(({ res, error }) => {
		res.created.map((el) => dispatch(createTreckedTime(el)));
		res.updated.map((el) => dispatch(updateTreckedTime(el)));
		res.deleted.map((el) => dispatch(deleteTreckedTime(el)));

		return res;
	});
};

// export const setTreckedTimes = (treckedTimes) => (dispatch) => {
// 	return server.saveTreckedTimes(treckedTimes).then(({ res, error }) => {
// 		res.created.map((el) => dispatch(createTreckedTime(el)));
// 		res.updated.map((el) => dispatch(updateTreckedTime(el)));
// 		res.deleted.map((el) => dispatch(deleteTreckedTime(el)));

// 		return res;
// 	});
// };
