import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function Navbar() {
	const [search, setSearch] = useState('');
	const navigate = useNavigate();

	function handleSearch(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault();
		if (search === '') return;
		navigate(`/search/?query=${search}&pageNum=1`);
	}

	return (
		<header className="sticky top-0 bg-slate-900 text-white py-4">
			<div className="container px-4 mx-auto flex items-center lg:justify-between">
				<div className="flex items-center">
					<Link
						className="text-base md:text-4xl font-bold"
						to="/now_playing"
					>
						MovieDb
					</Link>
				</div>

				<nav className="hidden md:flex items-center space-x-4">
					<Link className="hover:text-gray-400" to="/popular">
						Popular
					</Link>
					<Link className="hover:text-gray-400" to="/top_rated">
						Top Rated
					</Link>
					<Link className="hover:text-gray-400" to="upcoming">
						Upcoming
					</Link>
					<div>
						<form className="space-x-3" onSubmit={handleSearch}>
							<input
								className="bg-gray-800 max-sm:w-48 border-none text-white px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400"
								placeholder="Search movies"
								type="text"
								onChange={(e) => setSearch(e.target.value)}
							/>
							<button
								type="submit"
								className="bg-zinc-500 max-sm:text-base w-auto lg:w-20 p-2 rounded-lg text-white"
							>
								Search
							</button>
						</form>
					</div>
				</nav>

				<div className="flex md:hidden justify-center items-center pl-2 gap-2">
					<form onSubmit={handleSearch}>
						<input
							className="bg-gray-800 max-sm:w-48 border-none text-white px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400"
							placeholder="Search movies"
							type="text"
							onChange={(e) => setSearch(e.target.value)}
						/>
						<button
							type="submit"
							className="bg-zinc-500 max-sm:text-base w-auto lg:w-20 p-2 rounded-lg text-white"
						>
							Search
						</button>
					</form>
				</div>
			</div>

			<div className="flex justify-center items-center md:hidden pt-6 gap-4">
				<Link
					className="hover:text-white hover:bg-gray-600 rounded-md p-2"
					to="/popular"
				>
					Popular
				</Link>
				<Link
					className="hover:text-white hover:bg-gray-600 rounded-md p-2"
					to="/top_rated"
				>
					Top Rated
				</Link>
				<Link
					className="hover:text-white hover:bg-gray-600 rounded-md p-2"
					to="upcoming"
				>
					Upcoming
				</Link>
			</div>
		</header>
	);
}
