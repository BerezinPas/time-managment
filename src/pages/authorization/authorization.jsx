import { useForm } from 'react-hook-form';
import { Button, Input, Loader } from '../../components';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { loginSchema, passwordSchema } from '../../schemes';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { authorizateAsync } from '../../actions/authorizate-async';
import styles from './authorization.module.scss';

export const Authorization = () => {
	const dispatch = useDispatch();
	const [serverError, setServerError] = useState(null);
	const navigate = useNavigate();
	const [isLoading, setIsLoading] = useState(false);

	const registerFormSchema = yup.object().shape({
		login: loginSchema,
		password: passwordSchema,
	});

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({
		defaultValues: {
			login: '',
			password: '',
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
		dispatch(authorizateAsync(login, password))
			.then(({ error, res }) => {
				if (error) {
					setServerError(error);
					return;
				}
				navigate('/');
			})
			.finally(() => {
				setIsLoading(false);
			});
	};

	return (
		<div className="container container__auth">
			<h2 className={`${styles.title} h2`}>Авторизация</h2>
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

					<Button className={styles.btn} type="submit">
						Войти
					</Button>
					{errorMessage && <div className="error">{errorMessage}</div>}
					<div>
						Нет Аккаунта? <Link to="/register">Зарегистрируйтесь</Link>
					</div>
				</form>
			)}
		</div>
	);
};
