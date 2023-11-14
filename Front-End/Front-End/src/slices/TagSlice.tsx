import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { TaxonomyType } from '../data/types'; // 替换为您的类型文件的实际路径

// 异步获取前10个标签
export const fetchTopTags = createAsyncThunk<TaxonomyType[]>(
    'tag/fetchTopTags',
    async () => {
        const response = await axios.get<TaxonomyType[]>('http://localhost:8086/api/posts/tag/top');
        return response.data;
    }
);

// 异步获取所有标签
export const fetchAllTags = createAsyncThunk<TaxonomyType[]>(
    'tag/fetchAllTags',
    async () => {
        const response = await axios.get<{ id: number; tagName: string; counts: number; postTags: any[] }[]>(
            'http://localhost:8086/api/posts/tag'
        );
        return response.data.map(tag => ({
            id: tag.id,
            name: tag.tagName,
            href: "/tags/" + tag.id,
            count: tag.counts,
            taxonomy: "tag"

        }));
    }
);

// 定义初始状态
interface TagState {
    tags: TaxonomyType[];
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | null;
}

const initialState: TagState = {
    tags: [],
    status: 'idle',
    error: null,
};


const tagSlice = createSlice({
    name: 'tag',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchTopTags.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchTopTags.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.tags = action.payload;
            })
            .addCase(fetchTopTags.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message || null;
            })
            .addCase(fetchAllTags.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchAllTags.fulfilled, (state, action) => {
                state.status = 'succeeded';
                // 这里假设您希望用获取到的列表覆盖现有的标签列表
                state.tags = action.payload;
            })
            .addCase(fetchAllTags.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message || null;
            });
    },
});

export default tagSlice.reducer;
