export interface IAuthState {
	token: string | null;
	error_code: number | null;
	error_message: string | null;
	loading: "idle" | "pending" | "succeeded";
}

export interface ILogin {
	username: string;
	password: string;
}

export interface IProps {
	isAuth: boolean;
}

export interface IPostState {
	data: IPostCard[];
	loading: "idle" | "pending" | "succeeded";
	error_code: number;
	error_message: string;
	currentItem: IPostCard;
	modal: boolean;
}

export interface IPostCard {
	companySigDate: string;
	companySignatureName: string;
	documentName: string;
	documentStatus: string;
	documentType: string;
	employeeNumber: string;
	employeeSigDate: string;
	employeeSignatureName: string;
	id?: string;
}

export interface IAppUpdateRequest {
	props: IPostCard;
	id: string;
}

export interface IAppDataArr {
	data: IPostCard[];
	error_code: number;
	error_text: string;
	loading: "idle" | "pending" | "succeeded";
}
export interface IAppDataResponse {
	data: IPostCard;
	error_code: number;
	error_text: string;
	loading: "idle" | "pending" | "succeeded";
}
