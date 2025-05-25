import { useForm } from 'react-hook-form';
import { Button, Input, Loader } from '../../components';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import {
	loginSchema,
	passwordCheckSchema,
	passwordSchema,
} from '../../schemes';
import styles from './register.module.scss';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { registerAsync } from '../../actions';
import { Link, useNavigate } from 'react-router-dom';

export const Register = () => {
	const dispatch = useDispatch();
	const [serverError, setServerError] = useState(null);
	const navigate = useNavigate();
	const [isLoading, setIsLoading] = useState(false);

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

	const onSubmit = async ({ login, password }) => {
		setIsLoading(true);
		dispatch(registerAsync(login, password))
			.then(({ error, res }) => {
				if (error) {
					setServerError(error);
					return;
				}
				navigate('/');
			})
			.finally(() => setIsLoading(false));
	};

	return (
		<div className="container container__auth">
			<h2 className={`${styles.title} h2`}>Регистрация</h2>
			{isLoading ? (
				<Loader />
			) : (
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
					<Button type="submit">Зарегистрироваться</Button>
					{errorMessage && <div className="error">{errorMessage}</div>}
					<div>
						Есть аккаунт? <Link to="/authorization">Авторизуйтесь</Link>
					</div>
				</form>
			)}
		</div>
	);
};
