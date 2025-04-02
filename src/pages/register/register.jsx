import { useForm } from 'react-hook-form';
import { Input } from '../../components';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import {
	loginSchema,
	passwordCheckSchema,
	passwordSchema,
} from '../../schemes';
import styles from './register.module.scss';
import { useState } from 'react';
import { server } from '../../bff/server';
import { useDispatch } from 'react-redux';
import { setUser } from '../../actions';
import { useNavigate } from 'react-router-dom';

export const Register = () => {
	const dispatch = useDispatch();
	const [serverError, setServerError] = useState(null);
	const navigate = useNavigate();

	const registerFormSchema = yup.object().shape({
		login: loginSchema,
		password: passwordSchema,
		passwordCheck: passwordCheckSchema,
	});

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({
		defaultValues: {
			login: '',
			password: '',
			passwordCheck: '',
		},
		resolver: yupResolver(registerFormSchema),
	});

	const formError =
		errors?.login?.message ||
		errors?.password?.message ||
		errors?.passwordCheck?.message;

	const errorMessage = serverError || formError;

	console.log(errors);
	const onSubmit = async ({ login, password }) => {
		const { error, res } = await server.register(login, password);
		if (error) {
			setServerError(error);
			return;
		}
		dispatch(setUser(res));
		navigate('/');
	};

	return (
		<div>
			<form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
				<Input
					isValid={!errors?.login}
					type="text"
					placeholder={'логин'}
					{...register('login')}
				/>
				<Input
					isValid={!errors?.password}
					type="password"
					placeholder={'пароль'}
					{...register('password')}
				/>
				<Input
					isValid={!errors?.passwordCheck}
					type="password"
					placeholder={'повторите пароль'}
					{...register('passwordCheck')}
				/>
				<button type="submit">ok</button>
				{errorMessage}
			</form>
		</div>
	);
};
