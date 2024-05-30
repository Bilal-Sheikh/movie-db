import { configureStore } from '@reduxjs/toolkit';
import allMoivesReducer from '../redux/slice/moviesData';
import moivesDetailsReducer from '../redux/slice/movieDetails';
import creditsDetailsReducer from '../redux/slice/credits';

export const store = configureStore({
	reducer: {
		allMoives: allMoivesReducer,
		moivesDetails: moivesDetailsReducer,
		creditsDetails: creditsDetailsReducer,
	},
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
