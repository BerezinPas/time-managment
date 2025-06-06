import { useState } from 'react';
import { formateHHMMSSToTimeStamp } from '../../../utils';
import {
	attachDonutToolTipData,
	attachDurationToProject,
	attachPercentOfTotal,
	getSortFunc,
} from '../utils';

export const useEnhancedData = (
	projects,
	selectedProjectsId,
	tracks,
	shouldGroup,
) => {
	const [sortOption, setSortOption] = useState({
		field: 'name',
		how: 'inc',
	});

	const sortFunc = getSortFunc(sortOption);
	const selectedProjects = selectedProjectsId.length
		? projects.filter((project) => selectedProjectsId.includes(project.id))
		: projects;

	const projectsWithTracks = selectedProjects.map((project) => ({
		...project,
		tracks: tracks.filter((track) => track.projectId === project.id),
	}));

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

	const enhancedTracks = filtredProjects
		.reduce((tracks, curProject) => [...tracks, ...curProject.tracks], [])
		.map((track) => attachPercentOfTotal(track, 'duration', totalDuration))
		.map(attachDonutToolTipData)
		.sort(sortFunc());

	return { enhancedProjects, enhancedTracks, sortOption, setSortOption };
};
