import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice'
import categoryReducer from './slices/categorySlice';

// import usersReducer from './usersSlice';

const store = configureStore({
    reducer: {
        auth: authReducer,
        categories: categoryReducer
        // posts: postsReducer,
        // users: usersReducer
    }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
