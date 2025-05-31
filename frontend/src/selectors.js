export const selectUserLogin = ({ user }) => user.login;

export const selectUserId = ({ user }) => user.id;

export const selectUserIsReady = ({ user }) => user.isReady;

export const selectUserSessions = ({ user }) => user.sessions;

export const selectUserStartTime = ({ user }) =>
	user.defaultStartTimeInAnalytics;

export const selectUserImageURL = ({ user }) => user.imageURL;

export const selectProjects = ({ projects }) => projects;

export const selectProject = ({ project }) => project;

export const selectTracks = ({ project }) => project.tracks;

export const selectOptions = ({ options }) => options;

export const selectModal = ({ app }) => app.modal;
