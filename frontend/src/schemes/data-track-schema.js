import * as yup from 'yup';

export const dataTrackSchema = yup
	.string()
	.required('Заполните ')
	.matches(/^[2][0][\d][\d]./, 'укажи год от 2000-2099');
