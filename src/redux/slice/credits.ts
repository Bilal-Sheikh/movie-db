import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

interface CreditsData {
	character: string;
	name: string;
	profile_path: string;
}

interface FetchCreditsParams {
	api_key: string;
	movieId: number | string;
}

export const fetchCredits = createAsyncThunk(
	'creditsDetails/fetchCredits',
	async ({ api_key, movieId }: FetchCreditsParams) => {
		const response = await fetch(
			`https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=${api_key}&language=en-US`
		);
		const data = await response.json();
		const cast = data.cast;
		return cast;
	}
);

export const creditsDetailsSlice = createSlice({
	name: 'creditsDetails',
	initialState: { isLoading: false, data: [] as CreditsData[], error: null },
	reducers: {},
	extraReducers: (builder) => {
		builder.addCase(fetchCredits.pending, (state) => {
			state.isLoading = true;
		});
		builder.addCase(fetchCredits.fulfilled, (state, action) => {
			state.isLoading = false;
			state.data = action.payload;
		});
		builder.addCase(fetchCredits.rejected, (state, action) => {
			console.log('ERROR IN BUILDER CASE', action.payload);
			state.isLoading = false;
		});
	},
});

export default creditsDetailsSlice.reducer;
