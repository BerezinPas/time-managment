import { useSelector } from 'react-redux';
import { selectProjects } from '../../../selectors';
import { useEffect } from 'react';
import { request } from '../../../utils';
import { useState } from 'react';
import { useAlert } from '../../../context';

export const useAnalyticsData = (dateGap, projectId) => {
	const projects = useSelector(selectProjects);
	const [selectedProjectsId, setSelectedProjectsId] = useState(
		projectId ? [projectId] : [],
	);
	const { createAlert } = useAlert();
	const [tracks, setTracks] = useState([]);
	// useEffect(() => {
	// 	setSelectedProjectsId(projectId ? [projectId] : []);
	// }, [projects, projectId]);

	useEffect(() => {
		const query = selectedProjectsId.length
			? selectedProjectsId.map((id) => `projectIds=${id}`).join('&')
			: projects.map(({ id }) => `projectIds=${id}`).join('&');

		// DateGap type number
		request(
			`/tracks?${query}&startTime=${dateGap.start}&endTime=${dateGap.end}`,
		).then(({ res, error }) => {
			if (error) {
				createAlert(error, 'danger');
				return;
			}

			// console.log(res);
			if (res) {
				setTracks(res);
			}
		});
	}, [selectedProjectsId, dateGap]);

	return { tracks, selectedProjectsId, setSelectedProjectsId };
};
