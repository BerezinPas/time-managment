import { applyMiddleware, combineReducers, compose, createStore } from 'redux';
import { thunk } from 'redux-thunk';
import {
	appReducer,
	projectReducer,
	projectsReducer,
	userReducer,
	optionsReducer,
} from './reducers';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const reducer = combineReducers({
	user: userReducer,
	app: appReducer,
	projects: projectsReducer,
	project: projectReducer,
	options: optionsReducer,
});

export const store = createStore(
	reducer,
	composeEnhancers(applyMiddleware(thunk)),
);
