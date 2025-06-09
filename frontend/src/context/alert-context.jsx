import { createContext, useContext, useState } from 'react';

const AlertContext = createContext({
	createAlert: (text, type, ms) => {},
	removeAlert: (id) => {},
	alerts: [],
});

export const AlertProvider = ({ children }) => {
	const [alerts, setAlerts] = useState([
		{ text: 'login: test', id: 'sss', ms: 30200 },
		{ text: 'password: qwe123', id: 'a1sd', ms: 30200 },
	]);
	const createAlert = (text, type, ms = 5000) => {
		setAlerts((prev) => [...prev, { text, type, ms, id: Date.now() }]);
	};
	const removeAlert = (id) =>
		setAlerts((prev) => prev.filter((a) => a.id !== id));
	return (
		<AlertContext value={{ createAlert, alerts, removeAlert }}>
			{children}
		</AlertContext>
	);
};

export const useAlert = () => useContext(AlertContext);
