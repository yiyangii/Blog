import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice'
import categoryReducer from './slices/categorySlice';
import postReducer from './slices/postSlice';
import userReducer from './slices/userSlice';


// import usersReducer from './usersSlice';

const store = configureStore({
    reducer: {
        auth: authReducer,
        categories: categoryReducer,
        user: userReducer,
        post: postReducer

        // posts: postsReducer,
        // users: usersReducer
    }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
