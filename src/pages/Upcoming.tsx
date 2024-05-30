import { useLocation, useSearchParams } from 'react-router-dom';
import MovieCards from '../components/MovieCards';
import Pagination from '../components/Pagination';

function Upcoming() {
	const api_key = '394a10043d7ff6c84a75986baa0418bd';

	const [searchParams, setSearchParams] = useSearchParams();
	let pageNum = searchParams.get('pageNum');

	const location = useLocation();
	const category = location.pathname.split('/')[1];

	if (pageNum === null || parseInt(pageNum) <= 0) {
		setSearchParams({ pageNum: '1' });
		pageNum = '1';
	}

	return (
		<div className="bg-gray-900 text-white">
			<MovieCards
				isSerachQuery={false}
				api_key={api_key}
				category={category}
				page={pageNum ?? 1}
			/>

			<div>
				<Pagination
					category={category}
					pageNum={parseInt(pageNum)}
					isSearchQuery={false}
				/>
			</div>
		</div>
	);
}

export default Upcoming;
