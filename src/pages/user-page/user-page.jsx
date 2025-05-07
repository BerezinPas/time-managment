import { useState } from 'react';
import { Input } from '../../components';
import Select from 'react-select';
import { Controller, useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { setOptionsAsync } from '../../actions';
import { selectOptions } from '../../selectors';

export const UserPage = () => {
	const options = [
		{
			value: 'max',
			label: 'с первого трека',
		},
		{
			value: 'week',
			label: 'текущая неделя',
		},
		{
			value: 'mouth',
			label: 'текущий месяц',
		},
		{
			value: 'year',
			label: 'текущий год',
		},
	];
	const [value, setValue] = useState('');
	const userOptions = useSelector(selectOptions);
	console.log('userOtions', userOptions);

	// const [selectedValue, setSelectedValue] = useState(options[0]);

	const dispatch = useDispatch();
	const {
		register,
		handleSubmit,
		control,
		formState: { errors },
	} = useForm({
		defaultValues: {
			avatar: userOptions.imageURL,
			select: options.find(
				(option) => option.value === userOptions.defaultStartTimeInAnalytics,
			),
		},
	});

	const onSubmit = (optionsData) => {
		const data = {
			...userOptions,
			imageURL: optionsData.avatar,
			defaultStartTimeInAnalytics: optionsData.select.value,
		};
		console.log('onSubmit', data);
		dispatch(setOptionsAsync(data));
	};
	return (
		<div>
			<form onSubmit={handleSubmit(onSubmit)}>
				<Input
					type="text"
					// value={value}
					// onChange={(e) => {
					// 	// console.log(e.target.value);
					// 	// setValue(e.target.value);
					// }}
					{...register('avatar')}
				/>
				<div>
					Времянной промежуток в аналитике по умолчанию
					<Controller
						name="select"
						control={control}
						rules={{ required: true }}
						render={({ field }) => (
							<Select
								{...field}
								// value={selectedValue}
								// onChange={(e) => setSelectedValue(e)}
								options={options}
							/>
						)}
					/>
					<button type="submit">Save</button>
				</div>
			</form>
			{/* <img src={value} alt="" /> */}
		</div>
	);
};
{
	/* <div>Сменить пароль</div>
				<div>
					<Input type="password" placeholder="Старый пароль" />
					<Input type="password" placeholder="Новый пароль" />
				</div> */
}
