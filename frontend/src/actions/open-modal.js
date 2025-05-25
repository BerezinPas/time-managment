import { ACTION_TYPE } from './action-type';

export const openModal = (modalData) => ({
	type: ACTION_TYPE.OPEN_MODAL,
	payload: modalData,
});
