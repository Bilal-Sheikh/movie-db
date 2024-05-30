import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

interface MovieData {
	id: number;
	title: string;
	poster_path: string;
	vote_average: number;
}

interface FetchMoviesParams {
	category: string;
	api_key: string;
	page: number | string | undefined;
}

interface FetchSearchMoviesParams {
	movie_name: string;
	api_key: string;
	page: number | string | undefined;
}

export const fetchMovies = createAsyncThunk(
	'allMoives/fetchMovies',
	async ({ category, api_key, page }: FetchMoviesParams) => {
		const response = await fetch(
			`https://api.themoviedb.org/3/movie/${category}?api_key=${api_key}&language=en-US&page=${page}`
		);
		const data = await response.json();
		return data.results;
	}
);

export const fetchSearchedMovies = createAsyncThunk(
	'allMoives/fetchSearchedMovies',
	async ({ movie_name, api_key, page }: FetchSearchMoviesParams) => {
		const response = await fetch(
			`https://api.themoviedb.org/3/search/movie?api_key=${api_key}&language=en-US&query=${movie_name}&page=${page}`
		);
		const data = await response.json();
		return data.results;
	}
);

export const movieSlice = createSlice({
	name: 'allMoives',
	initialState: { isLoading: false, data: [] as MovieData[], error: null },
	reducers: {},
	extraReducers: (builder) => {
		builder.addCase(fetchMovies.pending, (state) => {
			state.isLoading = true;
		});
		builder.addCase(fetchMovies.fulfilled, (state, action) => {
			state.isLoading = false;
			state.data = action.payload;
		});
		builder.addCase(fetchMovies.rejected, (state, action) => {
			console.log('ERROR IN BUILDER CASE', action.payload);
			state.isLoading = false;
		});

		//search
		builder.addCase(fetchSearchedMovies.pending, (state) => {
			state.isLoading = true;
		});
		builder.addCase(fetchSearchedMovies.fulfilled, (state, action) => {
			state.isLoading = false;
			state.data = action.payload;
		});
		builder.addCase(fetchSearchedMovies.rejected, (state, action) => {
			console.log('ERROR IN BUILDER CASE', action.payload);
			state.isLoading = false;
		});
	},
});

export default movieSlice.reducer;
