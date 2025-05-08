import { useSelector } from 'react-redux';
import { selectOptions, selectProjects } from '../../selectors';
import {
	formateHHMMSSToTimeStamp,
	formateTimeStampToHHMMSS,
} from '../../utils';
import { useEffect, useState } from 'react';
import {
	AnalyticsControlPanel,
	DonutChart,
	AnalyticsTable,
	BarChart,
} from './components';
import {
	sortedByData,
	sortedByDuration,
	sortedByName,
	attachPercentOfTotal,
	attachDonutToolTipData,
	initDateGapStartTime,
} from './utils';
import { ONE_DAY_IN_MSECS } from '../../constants';
import { Link, useNavigate, useParams } from 'react-router-dom';
import styles from './analytics.module.scss';

export const Analytics = () => {
	const { id: projectId } = useParams();
	const projects = useSelector(selectProjects);

	const navigate = useNavigate();

	if (
		projectId &&
		!projects.some((project) => Number(projectId) === project.id)
	) {
		console.error('!!!!!!!!!!');
		console.error(projects);

		navigate('/analytics');
	}

	const [sortOption, setSortOption] = useState({
		field: 'name',
		how: 'inc',
	});
	let sortFunc;
	switch (sortOption.field) {
		case 'name':
			sortFunc = () => sortedByName(sortOption.how);
			break;
		case 'date':
			sortFunc = () => sortedByData(sortOption.how);
			break;

		default:
			sortFunc = () => sortedByDuration(sortOption.how);
			break;
	}
	const timeZone = new Date().getTimezoneOffset() / 60;
	// console.log('timeZone', timeZone);

	console.log('projects', projects);

	const [selectedProjectsId, setSelectedProjectsId] = useState([]);

	const userOptions = useSelector(selectOptions);
	const start = initDateGapStartTime(
		projects,
		projectId,
		userOptions.defaultStartTimeInAnalytics,
	);

	// start = new Date(start).setHours(0, 0, 0, 0);

	const initialOptionsFilter = {
		shouldGroup: projectId === undefined,
		dateGap: {
			start: start,
			end: new Date().setHours(0, 0, 0, 0),
		},
	};
	const [shouldGroup, setShouldGroup] = useState(
		initialOptionsFilter.shouldGroup,
	);

	// console.log('start', start);
	// console.log('stainitialOptionsFilterrt', initialOptionsFilter);

	const [dateGap, setDateGap] = useState({
		start: new Date().setHours(0, 0, 0, 0),
		end: initialOptionsFilter.dateGap.end,
	});

	useEffect(() => {
		setSelectedProjectsId(projectId ? [Number(projectId)] : []);
		setDateGap({
			...dateGap,
			start: start,
			end: initialOptionsFilter.dateGap.end,
		});
	}, [projects, projectId]);

	console.log('dateGap', dateGap);
	console.log('selectedProjectsId', selectedProjectsId);

	const selectedProjects = selectedProjectsId.length
		? projects.filter((project) => selectedProjectsId.includes(project.id))
		: projects;

	const filtredProjects = selectedProjects
		.map((project) => {
			// filtred tracks on date
			const tracks = project.tracks.filter((track) => {
				return (
					Date.parse(track.startTime) >= dateGap.start &&
					Date.parse(track.startTime) <= dateGap.end + ONE_DAY_IN_MSECS - 1
				);
			});

			return { ...project, tracks };
		})
		// filtred empty PROJECTS
		.filter((project) => project.tracks.length !== 0)
		// add field 'duration' to project
		.map((project) => ({
			...project,
			duration: formateTimeStampToHHMMSS(
				project.tracks.reduce((totalDurTracks, curTrack) => {
					return formateHHMMSSToTimeStamp(curTrack.duration) + totalDurTracks;
				}, 0),
			),
		}));

	const total = filtredProjects.reduce((totalDurProjects, curProject) => {
		return formateHHMMSSToTimeStamp(curProject.duration) + totalDurProjects;
	}, 0);

	let enhancedProjects;
	if (shouldGroup) {
		enhancedProjects = filtredProjects
			.map((project) => attachPercentOfTotal(project, 'duration', total))
			.map((project) => ({
				...project,
				tracks: project.tracks.map((track) =>
					attachPercentOfTotal(track, 'duration', total),
				),
			}))
			.map((el) => attachDonutToolTipData(el, true))
			.sort(sortFunc())
			.map((project) => ({
				...project,
				tracks: project.tracks.sort(sortFunc()),
			}));
	}

	const enhancedTracks = filtredProjects
		.reduce((tracks, curProject) => [...tracks, ...curProject.tracks], [])
		.map((project) => attachPercentOfTotal(project, 'duration', total))
		.map(attachDonutToolTipData)
		.sort(sortFunc());

	console.log('enhancedTracks', enhancedTracks);
	console.log('enhancedProjects', enhancedProjects);

	const projectsIsEmpty = !projects.some(
		(project) => project.tracks.length !== 0,
	);

	console.log('projectsIsEmpty', projectsIsEmpty);

	return (
		<div className="container">
			<BarChart tracks={enhancedTracks} dateGap={dateGap} timeZone={timeZone} />
			<div className={styles.wrapper}>
				{projectsIsEmpty ? (
					<div className={styles.empty}>
						Нет ни одного трека, добавить можно на
						<Link to="/"> Главной </Link>
						или в самом <Link to="/projects"> проекте </Link>
					</div>
				) : (
					<div className={styles.table}>
						<AnalyticsControlPanel
							checked={shouldGroup}
							setChecked={setShouldGroup}
							onSelectChange={(e) =>
								setSelectedProjectsId(e.map((el) => el.value))
							}
							selectedProjectsId={selectedProjectsId}
							setSelectedProjectsId={setSelectedProjectsId}
							setDateGap={setDateGap}
							dateGap={dateGap}
							timeZone={timeZone}
							initialOptionsFilter={initialOptionsFilter}
						/>
						<AnalyticsTable
							data={shouldGroup ? enhancedProjects : enhancedTracks}
							shouldGroup={shouldGroup}
							sortOption={sortOption}
							setSortOption={setSortOption}
						/>
					</div>
				)}

				<div className={styles.donuts}>
					{shouldGroup && (
						<DonutChart segments={enhancedProjects} title="Проекты" />
					)}
					<DonutChart segments={enhancedTracks} title="Треки" />
				</div>
			</div>
		</div>
	);
};
