import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { AppDispatch, RootState } from '../redux/store';
import { fetchMovies, fetchSearchedMovies } from '../redux/slice/moviesData';
import { Link } from 'react-router-dom';

interface MovieCardsProps {
	category: string;
	api_key: string;
	page: number | string;
	isSerachQuery: boolean;
	searchQuery?: string;
}

export default function MovieCards({
	category,
	api_key,
	page,
	isSerachQuery,
	searchQuery = '',
}: MovieCardsProps) {
	const dispatch = useDispatch<AppDispatch>();
	const movies = useSelector((state: RootState) => state.allMoives);

	if (isSerachQuery) {
		useEffect(() => {
			dispatch(
				fetchSearchedMovies({ api_key, movie_name: searchQuery, page })
			);
		}, [dispatch, searchQuery, api_key, page]);
	} else {
		useEffect(() => {
			dispatch(fetchMovies({ category, api_key, page }));
		}, [dispatch, category, api_key, page]);
	}

	return (
		<div className="px-10 py-10 lg:px-32 lg:py-20">
			<div className="container mx-auto">
				<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-16">
					{movies.isLoading ? (
						<h1>Loading...</h1>
					) : (
						movies.data.map((movie, index) => (
							<div key={index}>
								<Link to={`/movie-details/${movie.id}`}>
									<img
										className="hover:cursor-pointer"
										key={index}
										src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
									/>
								</Link>

								<h2 className="text-lg py-4 text-center font-semibold">
									{movie.title}
								</h2>
								<p className="text-center">
									Rating: {movie.vote_average.toPrecision(2)}
								</p>
							</div>
						))
					)}
				</div>
			</div>
		</div>
	);
}
