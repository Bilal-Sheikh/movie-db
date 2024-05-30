import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

interface Genres {
	id: number;
	name: string;
}

interface MovieData {
	id: number;
	title: string;
	poster_path: string;
	vote_average: number;
	release_date: string;
	overview: string;
	runtime: number;
	backdrop_path: string;
	genres: Genres[];
}

interface FetchMoviesParams {
	api_key: string;
	movieId: number | string;
}

export const fetchMovie = createAsyncThunk(
	'moivesDetails/fetchMovie',
	async ({ api_key, movieId }: FetchMoviesParams) => {
		const response = await fetch(
			`https://api.themoviedb.org/3/movie/${movieId}?api_key=${api_key}&language=en-US`
		);
		return response.json();
	}
);

export const movieDetailsSlice = createSlice({
	name: 'moivesDetails',
	initialState: { isLoading: false, data: {} as MovieData, error: null },
	reducers: {},
	extraReducers: (builder) => {
		builder.addCase(fetchMovie.pending, (state) => {
			state.isLoading = true;
		});
		builder.addCase(fetchMovie.fulfilled, (state, action) => {
			state.isLoading = false;
			state.data = action.payload;
		});
		builder.addCase(fetchMovie.rejected, (state, action) => {
			console.log('ERROR IN BUILDER CASE', action.payload);
			state.isLoading = false;
		});
	},
});

export default movieDetailsSlice.reducer;
