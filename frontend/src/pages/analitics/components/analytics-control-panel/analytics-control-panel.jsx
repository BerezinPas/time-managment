import { useSelector } from 'react-redux';
import { selectProjects } from '../../../../selectors';
import Select from 'react-select';
import { Button, Input } from '../../../../components';
import styles from './analytics-control-panel.module.scss';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { dateToYYYYMMDD } from '../../../../utils';
import { dataTrackSchema } from '../../../../schemes';

export const AnalyticsControlPanel = ({
	checked,
	setChecked,
	onSelectChange,
	setDateGap,
	dateGap,
	selectedProjectsId,
	setSelectedProjectsId,
	initialOptionsFilter,
}) => {
	const [dateGapInput, setDateGapInput] = useState({ ...dateGap });
	const [errorMessage, setErrorMessage] = useState(null);
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
		// navigate('/analytics');
		setChecked(initialOptionsFilter.shouldGroup);
		setSelectedProjectsId([]);
		setDateGap(() => initialOptionsFilter.dateGap);
	};

	const validateDate = (value, isStart) => {
		let error = null;
		const condition = isStart
			? dateGapInput.end < Date.parse(value)
			: dateGapInput.start > Date.parse(value);
		try {
			dataTrackSchema.validateSync(value);

			if (condition) {
				throw { message: 'время конца должно быть позже времени начала' };
			}
		} catch (e) {
			error = e.message;
		}

		return error;
	};

	const onDateChange = (e) => {
		if (e.target.value === '') {
			return;
		}
		setDateGapInput((prev) => ({
			...prev,
			[e.target.name]:
				e.target.name === 'end'
					? new Date(e.target.value).setHours(23, 59, 59, 99)
					: new Date(e.target.value).setHours(0, 0, 0, 0),
		}));

		const error = validateDate(e.target.value, e.target.name === 'start');

		if (error !== null) {
			setErrorMessage(error);
			return;
		}

		setErrorMessage(null);
		setDateGap({
			...dateGapInput,
			[e.target.name]:
				e.target.name === 'end'
					? new Date(e.target.value).setHours(23, 59, 59, 99)
					: new Date(e.target.value).setHours(0, 0, 0, 0),
		});
	};

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
					value={dateToYYYYMMDD(new Date(dateGapInput.start))}
				/>
				<Input
					type="date"
					name="end"
					onChange={onDateChange}
					value={dateToYYYYMMDD(new Date(dateGapInput.end))}
				/>
			</div>

			<Button
				className={styles.resetBtn}
				variant="danger"
				onClick={() => resetFilters()}
			>
				Сбросить фильтры
			</Button>
			{errorMessage && <div className="error">{errorMessage}</div>}
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
