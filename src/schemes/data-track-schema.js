import * as yup from 'yup';

export const dataTrackSchema = yup
	.string()
	.required('Заполните ')
	// .matches(/[01][\d].[0-5][\d].[12][0-2][\d][\d]/, 'Неверно заполнен data');
	// .matches(/^[12][0-1][\d][\d].[01][\d].[0-5][\d]/, 'Неверно заполнен data');
	.matches(/^[2][0][\d][\d]./, 'укажи год от 2000-2099');
