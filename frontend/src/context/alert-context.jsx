import { createContext, useContext, useState } from 'react';

const AlertContext = createContext({
	createAlert: (text, type, ms) => {},
	removeAlert: (id) => {},
	alerts: [],
});

export const AlertProvider = ({ children }) => {
	const [alerts, setAlerts] = useState([
		{ text: 'success-test', id: 'sss', ms: 202000 },
		{ text: 'error-test', type: 'danger', id: 'a1sd', ms: 302000 },
	]);
	const createAlert = (text, type, ms = 50000) => {
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
