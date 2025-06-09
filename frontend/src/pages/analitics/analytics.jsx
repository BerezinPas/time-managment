import { useSelector } from 'react-redux';
import { selectProjects, selectUserStartTime } from '../../selectors';
import { useState } from 'react';
import {
	AnalyticsControlPanel,
	DonutChart,
	AnalyticsTable,
	BarChart,
} from './components';
import { initOptionsFilter } from './utils';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useAnalyticsData, useEnhancedData } from './hooks';
import styles from './analytics.module.scss';

export const Analytics = () => {
	const { id } = useParams();
	const projects = useSelector(selectProjects);
	// const navigate = useNavigate();
	let projectId = id;

	if (projectId && !projects.some((project) => projectId === project.id)) {
		// navigate('/analytics');
		projectId = undefined;
	}

	const defaultStartTimeInAnalytics = useSelector(selectUserStartTime);

	const initialOptionsFilter = initOptionsFilter(
		projects,
		projectId,
		defaultStartTimeInAnalytics,
	);
	const [shouldGroup, setShouldGroup] = useState(
		initialOptionsFilter.shouldGroup,
	);
	const [isLoading, setIsloading] = useState(true);
	const {
		tracks,
		selectedProjectsId,
		setSelectedProjectsId,
		dateGap,
		setDateGap,
	} = useAnalyticsData(initialOptionsFilter, projectId, setIsloading);
	// console.log('projectId', projectId);
	// console.log('selectedProjectsId', selectedProjectsId);

	const { enhancedProjects, enhancedTracks, sortOption, setSortOption } =
		useEnhancedData(projects, selectedProjectsId, tracks, shouldGroup);

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
								isLoading={isLoading}
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
