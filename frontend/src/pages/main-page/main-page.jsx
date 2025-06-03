import { useDispatch, useSelector } from 'react-redux';
import { selectProjects } from '../../selectors';
import { useEffect, useRef, useState } from 'react';
import { Input, Button, Loader } from '../../components';
import { formateTimeStampToHHMMSS } from '../../utils';
import { createTrackAsync } from '../../actions';
import Select from 'react-select';
import styles from './main-page.module.scss';
import { useCheckAuthorizate } from '../../hooks';
import { Navigate } from 'react-router-dom';

export const MainPage = () => {
	const dispatch = useDispatch();
	const projects = useSelector(selectProjects);
	const options = projects.map((project) => ({
		value: project.id,
		label: project.name,
	}));
	const [selectedProject, setSelectedProject] = useState(options[0]);

	useEffect(() => {
		setSelectedProject(options[0]);
	}, [projects]);

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
				startTime: new Date(startTime).toISOString(),
				endTime: new Date(endTime).toISOString(),
				description,
			}),
		)
			.then(() => {
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
						<div className={styles.btns}>
							<Button
								disabled={isTimeGoing || options.length === 0}
								onClick={onTimerStart}
							>
								▶
							</Button>
							<Button
								onClick={onTimerPause}
								disabled={!isTimeGoing}
								variant="secondary"
							>
								⏸
							</Button>
							<Button
								onClick={onTimerStop}
								disabled={!currentTime}
								variant="danger"
							>
								⏹
							</Button>
						</div>
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
