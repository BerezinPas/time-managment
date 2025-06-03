import { createContext, useContext, useState } from 'react';

const AlertContext = createContext({
	createAlert: (text, type, ms) => {},
	removeAlert: (id) => {},
	alerts: [],
});

export const AlertProvider = ({ children }) => {
	const [alerts, setAlerts] = useState([
		{ text: 'BALLqwsdqwdBALA1LB', type: 'danger', id: 'sss', ms: 20200 },
		{ text: 'BALLBqwde2121sasLB', type: 'danger', id: 'a1sd', ms: 30200 },
		{ text: 'BALLBAasfsafsafLALB', id: 'asd2sd', ms: 30020 },
		{ text: 'BALLBAasdLALB', id: 'asd4sd', ms: 30020 },
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
