import { useSelector } from 'react-redux';
import { selectProjects } from '../../../selectors';
import { useEffect } from 'react';
import { request } from '../../../utils';
import { useState } from 'react';
import { useAlert } from '../../../context';

export const useAnalyticsData = (initialOptionsFilter, projectId) => {
	const projects = useSelector(selectProjects);
	const [selectedProjectsId, setSelectedProjectsId] = useState(
		projectId ? [projectId] : [],
	);
	const { createAlert } = useAlert();
	const [tracks, setTracks] = useState([]);

	const [dateGap, setDateGap] = useState({
		start: initialOptionsFilter.dateGap.start,
		end: initialOptionsFilter.dateGap.end,
	});
	const [isLoading, setIsloading] = useState(false);

	useEffect(() => {
		setIsloading(true);
		const query = selectedProjectsId.length
			? selectedProjectsId.map((id) => `projectIds=${id}`).join('&')
			: projects.map(({ id }) => `projectIds=${id}`).join('&');

		// DateGap type number
		request(
			`/tracks?${query}&startTime=${dateGap.start}&endTime=${dateGap.end}`,
		)
			.then(({ res, error }) => {
				if (error) {
					createAlert(error, 'danger');
					return { tracks, selectedProjectsId, setSelectedProjectsId };
				}

				if (res) {
					setTracks(res);
				}
			})
			.finally(() => setIsloading(false));
	}, [selectedProjectsId, dateGap, projectId]);

	return {
		tracks,
		selectedProjectsId,
		setSelectedProjectsId,
		dateGap,
		setDateGap,
		isLoading,
	};
};
