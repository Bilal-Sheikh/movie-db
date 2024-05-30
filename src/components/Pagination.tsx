import { useNavigate } from 'react-router-dom';

interface PaginationProps {
	category: string;
	pageNum: number;
	isSearchQuery: boolean;
	searchQuery?: string;
}

export default function Pagination({
	category,
	pageNum,
	isSearchQuery,
	searchQuery,
}: PaginationProps) {
	const navigate = useNavigate();

	return (
		<div className="flex justify-center items-center gap-10 pb-24">
			<button
				className="bg-zinc-500 w-20 p-2 rounded-lg text-white"
				onClick={() => {
					if (isSearchQuery) {
						navigate(
							`/search/?query=${searchQuery}&pageNum=${
								pageNum - 1
							}`
						);
						return;
					} else {
						navigate(`/${category}/?pageNum=${pageNum - 1}`);
					}
				}}
			>
				Prev
			</button>
			<button
				className="bg-zinc-500 w-20 p-2 rounded-lg text-white"
				onClick={() => {
					if (isSearchQuery) {
						navigate(
							`/search/?query=${searchQuery}&pageNum=${
								pageNum + 1
							}`
						);
						return;
					} else {
						navigate(`/${category}/?pageNum=${pageNum + 1}`);
					}
				}}
			>
				Next
			</button>
		</div>
	);
}
