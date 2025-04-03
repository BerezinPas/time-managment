import * as yup from 'yup';

export const nameProjectShema = yup
	.string()
	.required()
	.max(120, 'Название не должно превышать 120 символов');
