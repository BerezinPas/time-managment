import { useSelector } from 'react-redux';
import {
	selectOptions,
	selectProjects,
	selectUserStartTime,
} from '../../selectors';
import { formateHHMMSSToTimeStamp, request } from '../../utils';
import { useEffect, useState } from 'react';
import {
	AnalyticsControlPanel,
	DonutChart,
	AnalyticsTable,
	BarChart,
} from './components';
import {
	attachPercentOfTotal,
	attachDonutToolTipData,
	initDateGapStartTime,
	getSortFunc,
	attachDurationToProject,
} from './utils';
import {
	ONE_DAY_IN_MSECS,
	OPTIONS_START_TIME_DEFAULT_VALUE,
} from '../../constants';
import { Link, useNavigate, useParams } from 'react-router-dom';
import styles from './analytics.module.scss';

// TODO рефакторинг все кода
// dateGap end сделать время 23:59:99999
//  refactoring backenda

// починить бек
export const Analytics = () => {
	const { id: projectId } = useParams();
	const projects = useSelector(selectProjects);
	const navigate = useNavigate();

	if (projectId && !projects.some((project) => projectId === project.id)) {
		navigate('/analytics');
	}

	const [sortOption, setSortOption] = useState({
		field: 'name',
		how: 'inc',
	});
	const defaultStartTimeInAnalytics = useSelector(selectUserStartTime);

	const sortFunc = getSortFunc(sortOption);

	// const timeZone = new Date().getTimezoneOffset() / 60;

	const [selectedProjectsId, setSelectedProjectsId] = useState([]);

	const start = initDateGapStartTime(
		projects,
		projectId,
		defaultStartTimeInAnalytics,
	);
	console.log('start', new Date(start));
	console.log('start', start);

	const initialOptionsFilter = {
		shouldGroup: projectId === undefined,
		dateGap: {
			start: start,
			end: new Date().setHours(23, 59, 59, 99),
		},
	};
	const [shouldGroup, setShouldGroup] = useState(
		initialOptionsFilter.shouldGroup,
	);

	const [dateGap, setDateGap] = useState({
		start: new Date(),
		end: initialOptionsFilter.dateGap.end,
	});

	const [tracks, setTracks] = useState([]);
	useEffect(() => {
		setSelectedProjectsId(projectId ? [projectId] : []);
		setDateGap({
			...dateGap,
			start: start,
			end: initialOptionsFilter.dateGap.end,
		});
	}, [projects, projectId]);

	useEffect(() => {
		const query = selectedProjectsId.length
			? selectedProjectsId.map((id) => `projectIds=${id}`).join('&')
			: projects.map(({ id }) => `projectIds=${id}`).join('&');

		// DateGap type number
		request(
			`/tracks?${query}&startTime=${dateGap.start}&endTime=${dateGap.end}`,
		).then(({ res, error }) => {
			console.log('error', error);

			console.log(res);
			if (res) {
				setTracks(res);
			}
		});
	}, [selectedProjectsId, dateGap]);

	console.log('DATE');
	console.log(new Date(dateGap.start));
	console.log(new Date(dateGap.end));
	const selectedProjects = selectedProjectsId.length
		? projects.filter((project) => selectedProjectsId.includes(project.id))
		: projects;

	const projectsWithTracks = selectedProjects.map((project) => ({
		...project,
		tracks: tracks.filter((track) => track.projectId === project.id),
	}));
	console.log('projectsWithTracks', projectsWithTracks);

	// const filtredProjects = selectedProjects
	// 	.map((project) => {
	// 		// filtred tracks on date
	// 		const tracks = project.tracks.filter((track) => {
	// 			return (
	// 				Date.parse(track.startTime) >= dateGap.start &&
	// 				Date.parse(track.startTime) <= dateGap.end + ONE_DAY_IN_MSECS - 1
	// 			);
	// 		});

	// 		return { ...project, tracks };
	// 	})
	const filtredProjects = projectsWithTracks
		// filtred empty PROJECTS
		.filter((project) => project.tracks.length !== 0)
		// add field 'duration' to project
		.map(attachDurationToProject);

	const totalDuration = filtredProjects.reduce(
		(totalDurProjects, curProject) => {
			return formateHHMMSSToTimeStamp(curProject.duration) + totalDurProjects;
		},
		0,
	);

	let enhancedProjects;
	if (shouldGroup) {
		enhancedProjects = filtredProjects
			.map((project) =>
				attachPercentOfTotal(project, 'duration', totalDuration),
			)
			.map((project) => ({
				...project,
				tracks: project.tracks.map((track) =>
					attachPercentOfTotal(track, 'duration', totalDuration),
				),
			}))
			.map((el) => attachDonutToolTipData(el, true))
			.sort(sortFunc())
			.map((project) => ({
				...project,
				tracks: project.tracks.sort(sortFunc()),
			}));
	}

	const enhancedTracks =
		//  tracks
		filtredProjects
			.reduce((tracks, curProject) => [...tracks, ...curProject.tracks], [])
			.map((track) => attachPercentOfTotal(track, 'duration', totalDuration))
			.map(attachDonutToolTipData)
			.sort(sortFunc());

	const projectsIsEmpty = !projects.some(
		(project) => project.tracks.length !== 0,
	);

	return (
		<div className="container">
			{projectsIsEmpty ? (
				<div className={styles.empty}>
					Нет ни одного трека, треки можно добавить на
					<Link to="/"> Главной </Link>
					или в самом <Link to="/projects"> проекте </Link>
				</div>
			) : (
				<>
					<BarChart tracks={enhancedTracks} dateGap={dateGap} />
					<div className={styles.wrapper}>
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
								initialOptionsFilter={initialOptionsFilter}
							/>
							<AnalyticsTable
								data={shouldGroup ? enhancedProjects : enhancedTracks}
								shouldGroup={shouldGroup}
								sortOption={sortOption}
								setSortOption={setSortOption}
							/>
						</div>

						<div className={styles.donuts}>
							{shouldGroup && (
								<DonutChart segments={enhancedProjects} title="Проекты" />
							)}
							<DonutChart segments={enhancedTracks} title="Треки" />
						</div>
					</div>
				</>
			)}
		</div>
	);
};
