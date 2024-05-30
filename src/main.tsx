import React from 'react';
import ReactDOM from 'react-dom/client';
import Landing from './pages/Landing.tsx';
import Popular from './pages/Popular.tsx';
import './index.css';
import { store } from '../src/redux/store.ts';
import { Provider } from 'react-redux';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar.tsx';
import TopRated from './pages/TopRated.tsx';
import Upcoming from './pages/Upcoming.tsx';
import MovieDetailsPage from './pages/MovieDetailsPage.tsx';
import SearchPage from './pages/SearchPage.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
	<React.StrictMode>
		<BrowserRouter>
			<Provider store={store}>
				<Navbar />
				<Routes>
					<Route
						index
						element={<Navigate to="/now_playing" replace={true} />}
					/>
					<Route
						path="/now_playing/:pageNum?"
						element={<Landing />}
					/>
					<Route path="/popular/:pageNum?" element={<Popular />} />
					<Route path="/top_rated/:pageNum?" element={<TopRated />} />
					<Route path="/upcoming/:pageNum?" element={<Upcoming />} />
					<Route path="/search" element={<SearchPage />} />

					<Route
						path="/movie-details/:movieId"
						element={<MovieDetailsPage />}
					/>
				</Routes>
			</Provider>
		</BrowserRouter>
	</React.StrictMode>
);

/* 

Landing: 'https://api.themoviedb.org/3/movie/now_playing?api_key=394a10043d7ff6c84a75986baa0418bd&language=en-US&A1';
Popular: 'https://api.themoviedb.org/3/movie/popular?api_key=394a10043d7ff6c84a75986baa0418bd&language=en-US&page=1';
Top :    'https://api.themoviedb.org/3/movie/top_rated?api_key=394a10043d7ff6c84a75986baa0418bd&language=en-US&page=1';
Upcoming:'https://api.themoviedb.org/3/movie/upcoming?api_key=394a10043d7ff6c84a75986baa0418bd&language=en-US&page=1';

*/
