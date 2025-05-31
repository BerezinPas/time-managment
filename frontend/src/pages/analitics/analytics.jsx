import { useSelector } from 'react-redux';
import { selectProjects, selectUserStartTime } from '../../selectors';
import { useState } from 'react';
import {
	AnalyticsControlPanel,
	DonutChart,
	AnalyticsTable,
	BarChart,
} from './components';
import { initDateGapStartTime } from './utils';

import { Link, useNavigate, useParams } from 'react-router-dom';
import styles from './analytics.module.scss';
import { useAnalyticsData, useEnhancedData } from './hooks';

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

	const start = initDateGapStartTime(
		projects,
		projectId,
		defaultStartTimeInAnalytics,
	);

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
		start: start,
		end: initialOptionsFilter.dateGap.end,
	});

	const { tracks, selectedProjectsId, setSelectedProjectsId } =
		useAnalyticsData(dateGap, projectId);

	const { enhancedProjects, enhancedTracks } = useEnhancedData(
		projects,
		selectedProjectsId,
		tracks,
		shouldGroup,
		sortOption,
	);

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
