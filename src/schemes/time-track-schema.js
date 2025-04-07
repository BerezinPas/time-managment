import * as yup from 'yup';

export const timeTrackSchema = yup.string().required('Заполните пароль');
// .matches(/[012][\d]:[0-5][\d]/, 'Неверно заполнен TIME');
