import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { Community } from '../data/types'; // Replace with the actual path to your types file

export const fetchTopCommunities = createAsyncThunk<Community[]>(
    'community/fetchTopCommunities',
    async () => {
        const response = await axios.get<Community[]>('http://localhost:8087/api/community/top');
        return response.data;
    }
);

interface CommunityState {
    communities: Community[];
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | null;
}

const initialState: CommunityState = {
    communities: [],
    status: 'idle',
    error: null,
};
export const fetchAllCommunities = createAsyncThunk(
    'community/fetchAllCommunities',
    async () => {
        const response = await axios.get('http://localhost:8087/api/community/getAll');
        return response.data;
    }
);
const communitySlice = createSlice({
    name: 'community',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchTopCommunities.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchTopCommunities.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.communities = action.payload;
            })
            .addCase(fetchTopCommunities.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message || null;
            })
            .addCase(fetchAllCommunities.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchAllCommunities.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.communities = action.payload;
            })
            .addCase(fetchAllCommunities.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message || null;
            });

    },
});

export default communitySlice.reducer;
