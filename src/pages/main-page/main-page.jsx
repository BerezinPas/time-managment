import { useDispatch, useSelector } from 'react-redux';
import { selectProjects } from '../../selectors';
import { useEffect, useRef, useState } from 'react';
import { Input, Button } from '../../components';
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
	let pointPauseRef = useRef(null).current;

	const onTimerStart = () => {
		if (startTime) {
			setStartTime(startTime + Date.now() - pointPauseRef);
			pointPauseRef = null;
			setIsTimeGoing(true);

			return;
		}
		setIsTimeGoing(true);
		setStartTime(Date.now());
	};

	const onTimerPause = () => {
		setIsTimeGoing(false);
		pointPauseRef = Date.now();
	};

	const onTimerStop = () => {
		setStartTime(null);
		const endTime = pointPauseRef ? pointPauseRef : Date.now();

		dispatch(
			createTrackAsync({
				projectId: selectedProject.value,
				startTime: new Date(startTime).toISOString(),
				endTime: new Date(endTime).toISOString(),
				description,
			}),
		);
		pointPauseRef = null;
		setDescription('');
		setIsTimeGoing(false);
		setCurrentTime(null);
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
			<span className="loader"></span>
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
							start
						</Button>
						<Button
							onClick={onTimerPause}
							disabled={!isTimeGoing}
							variant="secondary"
						>
							pause
						</Button>
						<Button onClick={onTimerStop} variant="danger">
							stop
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
		</div>
	);
};
