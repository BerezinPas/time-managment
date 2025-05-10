import { server } from '../bff';
import { createTrack } from './create-track';
import { deleteTrack } from './delete-track';
import { updateTrack } from './update-track';

export const setTracks = (treckedTimes) => (dispatch) => {
	return server.saveTreckedTimes(treckedTimes).then(({ res, error }) => {
		res.created.map((el) => dispatch(createTrack(el)));
		res.updated.map((el) => dispatch(updateTrack(el)));
		res.deleted.map((el) => dispatch(deleteTrack(el)));

		return res;
	});
};
