import { useSelector } from 'react-redux';
import { selectProjects } from '../../../selectors';
import { useEffect } from 'react';
import { request } from '../../../utils';
import { useState } from 'react';

export const useAnalyticsData = (dateGap, projectId) => {
	const projects = useSelector(selectProjects);
	const [selectedProjectsId, setSelectedProjectsId] = useState([]);

	const [tracks, setTracks] = useState([]);
	useEffect(() => {
		setSelectedProjectsId(projectId ? [projectId] : []);
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

	return { tracks, selectedProjectsId, setSelectedProjectsId };
};
