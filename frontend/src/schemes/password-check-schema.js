import * as yup from 'yup';

export const passwordCheckSchema = yup
	.string()
	.required('Заполните повтор пароля')
	.oneOf([yup.ref('password'), null], 'Пароли не совпадают');
