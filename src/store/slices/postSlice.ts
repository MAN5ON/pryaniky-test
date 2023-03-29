import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "../../utils/axios";
import {
	IAppDataArr,
	IAppUpdateRequest,
	IAppDataResponse,
	IPostCard,
	IPostState,
} from "../../utils/interfaces";

export const fetchPosts = createAsyncThunk("posts/fetchPosts", async () => {
	try {
		const auth = {
			headers: { "x-auth": window.localStorage.getItem("x-auth") },
		};
		const response = await axios.get(
			`/ru/data/v3/testmethods/docs/userdocs/get`,
			auth
		);
		return response.data;
	} catch (error) {
		console.log(error);
	}
});

export const newPost = createAsyncThunk(
	"posts/newPost",
	async (post: IPostCard) => {
		try {
			const auth = {
				headers: { "x-auth": window.localStorage.getItem("x-auth") },
			};
			const response = await axios.post(
				`/ru/data/v3/testmethods/docs/userdocs/create`,
				({ ...post } = post),
				auth
			);
			return response.data;
		} catch (error) {
			console.log(error);
		}
	}
);

export const updatePost = createAsyncThunk(
	"posts/updatePost",
	async ({ props, id }: IAppUpdateRequest) => {
		try {
			//patch, put не работает
			const auth = {
				headers: { "x-auth": window.localStorage.getItem("x-auth") },
			};
			const response = await axios.post(
				`/ru/data/v3/testmethods/docs/userdocs/set/${id}`,
				({ ...props } = props),
				auth
			);
			return response.data;
		} catch (error) {
			console.log(error);
		}
	}
);

export const deletePost = createAsyncThunk(
	"posts/deletePost",
	async (id: string) => {
		try {
			const auth = {
				headers: { "x-auth": window.localStorage.getItem("x-auth") },
			};
			//delete тоже работает
			const response = await axios.post(
				`/ru/data/v3/testmethods/docs/userdocs/delete/${id}`, {},
				auth
			);
			return response.data;
		} catch (error) {
			console.log(error);
		}
	}
);

const initialState: IPostState = {
	data: [],
	loading: "idle",

	error_code: 0,
	error_message: "OK",
	modal: false,

	currentItem: {
		companySigDate: "",
		companySignatureName: "",
		documentName: "",
		documentStatus: "",
		documentType: "",
		employeeNumber: "",
		employeeSigDate: "",
		employeeSignatureName: "",
		id: "",
	},
};

export const PostSlice = createSlice({
	name: "post",
	initialState,
	reducers: {
		setModalWindow: (state) => {
			state.modal = !state.modal;
		},

		setCurrentItem: (state, action: PayloadAction<IPostCard>) => {
			state.currentItem = action.payload;
		},
		//т.к. при удалении не возвращаяется ничего, то фильтруем массив через обычный редюсер
		deleteItem: (state, action: PayloadAction<IPostCard>) => {
			state.data.splice(
				state.data.findIndex((item) => item.id === action.payload.id),
				1
			);
		},
		clearData: (state) => {
			state.data = [];
			state.error_code = 0;
			state.error_message = "";
		},
	},
	extraReducers(builder) {
		//read (get all posts)
		builder
			.addCase(fetchPosts.pending, (state) => {
				state.loading = "pending";
			})
			.addCase(
				fetchPosts.fulfilled,
				(state, action: PayloadAction<IAppDataArr>) => {
					action.payload.data
						? action.payload.data.map((item) =>
								state.data.push(item)
						  )
						: ((state.error_code = action.payload.error_code),
						  (state.error_message = action.payload.error_text));
					state.loading = "succeeded";
				}
			)
			//new (add to state new elem from payload)
			.addCase(newPost.pending, (state) => {
				state.loading = "pending";
			})
			.addCase(
				newPost.fulfilled,
				(state, action: PayloadAction<IAppDataResponse>) => {
					action.payload.data
						? state.data.push(action.payload.data)
						: ((state.error_code = action.payload.error_code),
						  (state.error_message = action.payload.error_text));
					state.loading = "succeeded";
				}
			)
			// //update (edit elem in list)
			.addCase(updatePost.pending, (state) => {
				state.loading = "pending";
			})
			.addCase(
				updatePost.fulfilled,
				(state, action: PayloadAction<IAppDataResponse>) => {
					action.payload.data
						? state.data.splice(
								state.data.findIndex(
									(item) => item.id === action.payload.data.id
								),
								1,
								action.payload.data
						  )
						: ((state.error_code = action.payload.error_code),
						  (state.error_message = action.payload.error_text));
					state.loading = "succeeded";
				}
			)
			// //delete (remove elem)
			.addCase(deletePost.pending, (state) => {
				state.loading = "pending";
			})
			.addCase(
				deletePost.fulfilled,
				(state, action: PayloadAction<IAppDataResponse>) => {
					if (action.payload.error_code !== 0) {
						state.error_code = action.payload.error_code;
						state.error_message = action.payload.error_text;
					}
					state.loading = "succeeded";
				}
			);
	},
});
const { actions, reducer } = PostSlice;
export const { setModalWindow, setCurrentItem, deleteItem, clearData } =
	actions;
export const postReducer = reducer;
