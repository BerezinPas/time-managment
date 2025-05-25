import { ACTION_TYPE } from '../actions/action-type';

const initialState = {
	modal: {
		isOpen: false,
		title: '',
		text: '',

		onConfirm: () => {},
		onCancel: () => {},

		buttonConfirm: {
			variant: '',
			text: '',
		},
	},
};

export const appReducer = (state = initialState, { type, payload }) => {
	switch (type) {
		case ACTION_TYPE.OPEN_MODAL:
			return {
				...state,
				modal: { isOpen: true, ...payload },
			};

		case ACTION_TYPE.CLOSE_MODAL:
			return {
				...state,
				modal: { ...initialState.modal },
			};
		default:
			return state;
	}
};
