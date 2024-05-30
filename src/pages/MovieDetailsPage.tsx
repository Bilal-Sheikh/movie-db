import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { AppDispatch, RootState } from '../redux/store';
import { fetchMovie } from '../redux/slice/movieDetails';
import { fetchCredits } from '../redux/slice/credits';
import { useEffect } from 'react';

export default function MovieDetailsPage() {
	const api_key = '394a10043d7ff6c84a75986baa0418bd';

	const { movieId } = useParams();
	if (!movieId) return null;

	const dispatch = useDispatch<AppDispatch>();
	const movieDetails = useSelector((state: RootState) => state.moivesDetails);
	const creditsDetails = useSelector(
		(state: RootState) => state.creditsDetails
	);
	const data = movieDetails.data;

	useEffect(() => {
		dispatch(fetchMovie({ api_key, movieId }));
		dispatch(fetchCredits({ api_key, movieId }));
	}, [dispatch, api_key, movieId]);

	return (
		<div>
			{movieDetails.isLoading ? (
				<h1>Loading...</h1>
			) : (
				<div className="pt-6 px-10 md:pt-12">
					<div className="mx-auto bg-slate-800 rounded-xl">
						<div className="grid lg:grid-cols-2 justify-between">
							<div className="flex flex-col p-4">
								<div className="flex max-sm:justify-center max-sm:items-center max-sm:flex-wrap lg:flex-row">
									<div>
										<img
											className="rounded-lg lg:w-[200px]"
											src={`https://image.tmdb.org/t/p/w300/${data.poster_path}`}
										/>
									</div>

									<div className="space-y-6 lg:px-4">
										<h1 className="text-2xl max-sm:pt-4 lg:text-4xl font-bold">
											{data.title}
										</h1>
										<div className="flex items-center gap-4">
											<span className="text-blue-500 text-2xl">
												Rating:{' '}
												{data.vote_average &&
													data.vote_average.toPrecision(
														2
													)}
											</span>
										</div>
										<div className="flex items-center gap-4">
											<span className="border-neutral-500 border-2 rounded-lg p-1">
												{data.runtime} min
											</span>
											<span className="text-blue-300">
												{data.genres &&
													data.genres
														.map(
															(genre) =>
																genre.name
														)
														.join(', ')}
											</span>
										</div>
										<div>
											Release Date:{' '}
											{new Date(
												data.release_date
											).toLocaleDateString('en-GB', {
												weekday: 'short',
												year: 'numeric',
												month: 'long',
												day: 'numeric',
											})}
										</div>
									</div>
								</div>

								<div className="max-w-6xl">
									<h2 className="text-4xl py-4">Overview</h2>
									{data.overview}
								</div>
							</div>

							<div className="hidden lg:block">
								<img
									className="rounded-r-xl lg:w-full"
									src={`https://image.tmdb.org/t/p/original/${data.backdrop_path}`}
								/>
							</div>
						</div>
					</div>

					<div>
						{creditsDetails.isLoading ? (
							<h1>Loading...</h1>
						) : (
							<div>
								<h2 className="text-4xl mt-28 my-8">Cast</h2>
								<div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
									{creditsDetails.data.map((credit) => (
										<div className="flex flex-col items-center gap-2 py-4">
											{credit.profile_path ? (
												<img
													src={`https://image.tmdb.org/t/p/original/${credit.profile_path}`}
													className="rounded-lg lg:w-[200px]"
													alt={`${credit.name} profile`}
												/>
											) : (
												<img
													src="../../placeholder.jpg"
													className="rounded-lg lg:w-[200px] h-full"
													alt="Placeholder"
												/>
											)}
											<span className="text-sm font-medium">
												{credit.name}
											</span>
											<span className="text-sm font-medium">
												{credit.character}
											</span>
										</div>
									))}
								</div>
							</div>
						)}
					</div>
				</div>
			)}
		</div>
	);
}
