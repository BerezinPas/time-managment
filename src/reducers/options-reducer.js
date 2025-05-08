import { ACTION_TYPE } from '../actions/action-type';

const userInitialState = {
	id: null,
	imageURL: '',
	defaultStartTimeInAnalytics: '',
};

export const optionsReducer = (state = userInitialState, { type, payload }) => {
	switch (type) {
		case ACTION_TYPE.SET_OPTIONS:
			console.log('payload', payload);

			return {
				...state,
				...payload,
			};
		default:
			return state;
	}
};
