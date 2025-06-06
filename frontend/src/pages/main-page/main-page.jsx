import { useDispatch, useSelector } from 'react-redux';
import { selectProjects } from '../../selectors';
import { useEffect, useState } from 'react';
import { Input, Button, Loader } from '../../components';
import { formateTimeStampToHHMMSS } from '../../utils';
import { createTrackAsync } from '../../actions';
import Select from 'react-select';
import styles from './main-page.module.scss';
import { useAlert } from '../../context';
import { ControlPanel } from './components';

export const MainPage = () => {
	const dispatch = useDispatch();
	const projects = useSelector(selectProjects);
	const { createAlert } = useAlert();
	const options = projects.map((project) => ({
		value: project.id,
		label: project.name,
	}));
	const [selectedProject, setSelectedProject] = useState(options[0]);
	console.log('projects', projects);

	const [startTime, setStartTime] = useState(null);
	const [isTimeGoing, setIsTimeGoing] = useState(null);
	const [currentTime, setCurrentTime] = useState(null);
	const [description, setDescription] = useState('');
	const [isLoading, setIsLoading] = useState(false);
	const [pointPause, setPointPause] = useState(false);

	const resetForm = () => {
		setStartTime(null);
		setPointPause(null);
		setDescription('');
		setIsTimeGoing(false);
		setCurrentTime(null);
	};

	const onTimerStart = () => {
		if (startTime) {
			setStartTime(startTime + Date.now() - pointPause);
			setPointPause(null);
			setIsTimeGoing(true);
			return;
		}
		setIsTimeGoing(true);
		setStartTime(Date.now());
	};

	const onTimerPause = () => {
		setIsTimeGoing(false);
		setPointPause(Date.now());
	};

	const onTimerStop = () => {
		setIsLoading(true);
		const endTime = pointPause ? pointPause : Date.now();

		dispatch(
			createTrackAsync(selectedProject.value, {
				startTime: new Date(startTime),
				endTime: new Date(endTime),
				description,
			}),
		)
			.then(({ res, error }) => {
				if (error) {
					createAlert(error, 'danger');
					return;
				}
				createAlert('Трек успешно сохранен!');
				resetForm();
			})
			.finally(() => setIsLoading(false));
	};

	useEffect(() => {
		let interval;
		if (isTimeGoing) {
			interval = setInterval(() => {
				setCurrentTime(Date.now() - startTime);
			}, 100);
		}

		return () => clearInterval(interval);
	}, [isTimeGoing]);

	const onDescriptionChange = ({ target }) => {
		setDescription(target.value);
	};

	return (
		<div className={styles.wrapper}>
			{isLoading ? (
				<Loader />
			) : (
				<div>
					<div className={styles.top}>
						<div className={styles.timer}>
							{formateTimeStampToHHMMSS(currentTime)}
						</div>
						<ControlPanel
							className={styles.btns}
							isTimeGoing={isTimeGoing}
							currentTime={currentTime}
							onTimerPause={onTimerPause}
							onTimerStart={onTimerStart}
							onTimerStop={onTimerStop}
							options={options}
						/>
					</div>
					<Select
						value={selectedProject}
						onChange={(e) => setSelectedProject(e)}
						options={options}
					/>
					<Input
						placeholder="описание"
						className={styles.input}
						value={description}
						onChange={(e) => onDescriptionChange(e)}
					/>
				</div>
			)}
		</div>
	);
};
