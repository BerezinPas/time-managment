import { useSelector } from 'react-redux';
import { selectProjects } from '../../../../selectors';
import Select from 'react-select';
import { Button, Input } from '../../../../components';
import styles from './analytics-control-panel.module.scss';
import { useEffect, useState } from 'react';
import { ONE_HOUR_IN_MSECS } from '../../../../constants';
import { useNavigate } from 'react-router-dom';
import { dateToYYYYMMDD } from '../../../../utils';

export const AnalyticsControlPanel = ({
	checked,
	setChecked,
	onSelectChange,
	setDateGap,
	dateGap,
	selectedProjectsId,
	setSelectedProjectsId,
	timeZone,
	initialOptionsFilter,
}) => {
	const [dateGapInput, setDateGapInput] = useState({ ...dateGap });
	const [error, setError] = useState(null);
	const projects = useSelector(selectProjects);
	const navigate = useNavigate();

	useEffect(() => {
		setDateGapInput({ ...dateGap });
	}, [dateGap]);

	const options = projects.map((project) => ({
		value: project.id,
		label: project.name,
	}));

	const resetFilters = () => {
		navigate('/analytics');
		setChecked(true);
		setSelectedProjectsId([]);
		setDateGap(() => initialOptionsFilter.dateGap);
	};

	// TODO VALIDATION ON DATE!!!
	const validateDateStart = (value) =>
		dateGapInput.end >= Date.parse(value) + timeZone * ONE_HOUR_IN_MSECS;

	const validateDateEnd = (value) =>
		dateGapInput.start <= Date.parse(value) + timeZone * ONE_HOUR_IN_MSECS;

	const onDateChange = (e) => {
		setDateGapInput((prev) => ({
			...prev,
			[e.target.name]:
				Date.parse(e.target.value) + timeZone * ONE_HOUR_IN_MSECS,
		}));

		if (e.target.name === 'start' && !validateDateStart(e.target.value)) {
			setError('Некорректное время');
			return;
		}
		if (e.target.name === 'end' && !validateDateEnd(e.target.value)) {
			setError('Некорректное время');
			return;
		}
		setError(null);
		setDateGap((prev) => ({
			...prev,
			...dateGapInput,
			[e.target.name]:
				Date.parse(e.target.value) + timeZone * ONE_HOUR_IN_MSECS,
		}));
	};

	// const setValue =(ValueType, ActionTypes) => void
	// console.log('OPTIONS', options);

	return (
		<div className={styles.controlPanel}>
			<label className={styles.groupCheckbox}>
				<input
					type="checkbox"
					checked={checked}
					onChange={({ target }) => setChecked(target.checked)}
				/>
				<span>Сгруппировать</span>
			</label>

			<div className={styles.dateRange}>
				<Input
					type="date"
					name="start"
					onChange={onDateChange}
					// value={new Date(dateGapInput.start).toISOString().slice(0, 10)}
					value={dateToYYYYMMDD(new Date(dateGapInput.start))}
					// value={new Date(dateGapInput.start)
					// 	.toLocaleString('ru', {
					// 		timeZone: 'Asia/Novosibirsk',
					// 	})
					// 	.slice(0, 10)}
				/>
				<Input
					type="date"
					name="end"
					onChange={onDateChange}
					value={dateToYYYYMMDD(new Date(dateGapInput.end))}
				/>
			</div>
			{error && <div className="error">{error}</div>}
			<Button
				className={styles.resetBtn}
				variant="danger"
				onClick={() => resetFilters()}
			>
				Сброс
			</Button>

			<Select
				value={options.filter((option) =>
					selectedProjectsId.includes(option.value),
				)}
				className={styles.select}
				options={options}
				isMulti
				closeMenuOnSelect={false}
				onChange={onSelectChange}
				isClearable
			/>
		</div>
	);
};
[
	{ value: 'chocolate', label: 'Chocolate' },
	{ value: 'strawberry', label: 'Strawberry' },
	{ value: 'vanilla', label: 'Vanilla' },
];
