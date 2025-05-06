import { useSelector } from 'react-redux';
import { selectProjects } from '../../selectors';
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
} from './utils';
import { ONE_DAY_IN_MSECS } from '../../constants';
import styles from './analytics.module.scss';
import { useParams } from 'react-router-dom';

export const Analytics = () => {
	const { id } = useParams();

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

	const projects = useSelector(selectProjects);
	console.log('projects', projects);

	const [selectedProjectsId, setSelectedProjectsId] = useState(
		id ? [Number(id)] : [],
	);
	// TODO dateGapStart
	console.log('selectedProjectsId', selectedProjectsId);

	let start = projects
		.filter((project) =>
			id === undefined ? project : project.id === Number(id),
		)
		.reduce(
			(accStart, curProject) => {
				const curStart = curProject.tracks.reduce(
					(minStartTimeTrack, curTrack) => {
						return minStartTimeTrack > Date.parse(curTrack.startTime)
							? Date.parse(curTrack.startTime)
							: minStartTimeTrack;
					},
					new Date().setHours(0, 0, 0, 0),
				);

				console.log('curStart!!!!!!!', curStart);

				return curStart < accStart ? curStart : accStart;
			},
			new Date().setHours(0, 0, 0, 0),
		);

	start = new Date(start).setHours(0, 0, 0, 0);

	const initialOptionsFilter = {
		shouldGroup: id === undefined,
		dateGap: {
			start: start,
			end: new Date().setHours(0, 0, 0, 0),
		},
	};
	const [shouldGroup, setShouldGroup] = useState(
		initialOptionsFilter.shouldGroup,
	);

	console.log('start', start);
	console.log('stainitialOptionsFilterrt', initialOptionsFilter);

	const [dateGap, setDateGap] = useState({
		start: new Date().setHours(0, 0, 0, 0),
		end: initialOptionsFilter.dateGap.end,
	});

	useEffect(() => {
		setDateGap({
			...dateGap,
			start: start,
			end: new Date().setHours(0, 0, 0, 0),
		});
	}, [projects, id]);

	console.log('dateGap', dateGap);

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

	return (
		<div className="container">
			<BarChart tracks={enhancedTracks} dateGap={dateGap} timeZone={timeZone} />
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
