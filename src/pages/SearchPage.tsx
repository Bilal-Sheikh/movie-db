import { useSearchParams } from 'react-router-dom';
import MovieCards from '../components/MovieCards';
import Pagination from '../components/Pagination';

export default function SearchPage() {
	const api_key = '394a10043d7ff6c84a75986baa0418bd';

	const [searchParams, setSearchParams] = useSearchParams();
	let page = searchParams.get('pageNum');
	let movie_name = searchParams.get('query');
	if (!movie_name) movie_name = '';

	if (page === null || parseInt(page) <= 0) {
		setSearchParams({ pageNum: '1' });
		page = '1';
	}

	return (
		<div className="text-white">
			<MovieCards
				isSerachQuery={true}
				searchQuery={movie_name}
				api_key={api_key}
				category="search"
				page={page ?? 1}
			/>

			<div>
				<Pagination
					category="search"
					pageNum={parseInt(page)}
					isSearchQuery={true}
					searchQuery={movie_name}
				/>
			</div>
		</div>
	);
}
