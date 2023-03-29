import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "../../utils/axios";
import { IAuthState, ILogin } from "../../utils/interfaces";
import { AuthResponse } from "../../utils/models";

export const fetchLogin = createAsyncThunk(
	"auth/fetchLogin",
	async ({ username, password }: ILogin) => {
		try {
			const response = await axios.post(
				`/ru/data/v3/testmethods/docs/login`,
				{ username, password }
			);
			return response.data;
		} catch (error) {
			console.log(error);
		}
	}
);

const initialState: IAuthState = {
	token: null,
	error_code: null,
	error_message: null,
	loading: "idle",
};

export const AuthSlice = createSlice({
	name: "auth",
	initialState,
	reducers: {
		changeToken: (state) => {
			state.token = window.localStorage.getItem("x-auth");
		},
	},
	extraReducers(builder) {
		builder
			.addCase(fetchLogin.pending, (state) => {
				(state.loading = "pending"), (state.token = null);
			})
			.addCase(
				fetchLogin.fulfilled,
				(state, action: PayloadAction<AuthResponse>) => {
					action.payload.data.token &&
						(state.token = action.payload.data.token);
					state.error_code = action.payload.error_code;
					state.error_message = action.payload.error_message;
					state.loading = "succeeded";
				}
			);
	},
});

const { actions, reducer } = AuthSlice;
export const { changeToken } = actions;
export const authReducer = reducer;
