import { useDispatch, useSelector } from 'react-redux';
import { selectProjects } from '../../selectors';
import { useEffect, useState } from 'react';
import { Button } from '../../components/button/button';
import { Input } from '../../components';
import { formateTimeStampToHHMMSS } from '../../utils';
import { createTrackAsync } from '../../actions';

export const MainPage = () => {
	const dispatch = useDispatch();
	const projects = useSelector(selectProjects);
	const [selectedProject, setSelectedProject] = useState(projects[1]?.id);

	const [timer, setTimer] = useState(null);
	const [isTimeGoing, setIsTimeGoing] = useState(null);
	const [pointPause, setPointPause] = useState(null);
	const [currentTimer, setCurrentTimer] = useState(null);
	const [description, setDescription] = useState('');

	// let currentTimer = 0;
	const onTimerStart = () => {
		if (timer) {
			setTimer(timer + Date.now() - pointPause);
			setPointPause(null);
			setIsTimeGoing(true);

			// console.log('AAAAAAAAAAAA');
			return;
		}
		setIsTimeGoing(true);
		setTimer(Date.now());
	};
	const onTimerPause = () => {
		setIsTimeGoing(false);
		setPointPause(Date.now());
	};
	const onTimerStop = () => {
		setTimer(null);
		const endTime = pointPause ? pointPause : Date.now();

		dispatch(
			createTrackAsync({
				projectId: selectedProject,
				startTime: new Date(timer).toISOString(),
				endTime: new Date(endTime).toISOString(),
				description,
			}),
		);
		setPointPause(null);
		setDescription('');
		setIsTimeGoing(false);
		setCurrentTimer(null);
	};

	// console.log(projects[0]);
	// console.log('selectedProject', selectedProject);

	useEffect(() => {
		let interval;
		if (isTimeGoing) {
			interval = setInterval(() => {
				setCurrentTimer(Date.now() - timer);
				// currentTimer = Date.now() - timer;
				// console.log(currentTimer);
			}, 100);
		}

		return () => clearInterval(interval);
	}, [isTimeGoing]);

	// console.log('currentTimer', currentTimer);

	const onDescriptionChange = ({ target }) => {
		setDescription(target.value);
	};

	return (
		<div className="container">
			<h2>home</h2>
			<div>
				<div>{formateTimeStampToHHMMSS(currentTimer)}</div>
				<select
					name="projects"
					onChange={(e) => setSelectedProject(Number(e.target.value))}
					value={selectedProject}
				>
					{projects.map(({ id, name }) => (
						<option key={id} value={id}>
							{name}
						</option>
					))}
				</select>
				<Button onClick={onTimerStart}>start</Button>
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
				<Input value={description} onChange={(e) => onDescriptionChange(e)} />
			</div>
		</div>
	);
};
