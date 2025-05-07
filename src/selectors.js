export const selectUserLogin = ({ user }) => user.login;

export const selectUserId = ({ user }) => user.id;

export const selectProjects = ({ projects }) => projects;

export const selectProject = ({ project }) => project;

export const selectTracks = ({ project }) => project.tracks;

export const selectOptions = ({ options }) => options;
