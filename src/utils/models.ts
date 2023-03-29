import { IPostCard } from './interfaces';
export type AuthResponse = {
	data: {
		token: string | null;
	};
	error_code: number;
	error_message: string;
};

export type AppResponse = {
	data: {
		companySigDate: string;
		companySignatureName: string;
		documentName: string;
		documentStatus: string;
		documentType: string;
		employeeNumber: string;
		employeeSigDate: string;
		employeeSignatureName: string;
		id: string;
	}[];
	error_code: number;
	error_message: string;
};


