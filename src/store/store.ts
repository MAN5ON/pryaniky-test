import { configureStore } from "@reduxjs/toolkit";
import { authReducer } from "./slices/authSlice";
import { postReducer } from "./slices/postSlice";

export const store = configureStore({
	reducer: {
		post: postReducer,
		auth: authReducer,
	},
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
