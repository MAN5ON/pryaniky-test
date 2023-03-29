import { Button,TextField } from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import { IPostCard } from "../utils/interfaces";
import { useAppDispatch } from "../store/hooks";
import { setModalWindow, newPost, updatePost } from "../store/slices/postSlice";
import s from "../style/modal.module.css";

export const Modal = (item: IPostCard) => {
	const dispatch = useAppDispatch();
	const {
		control,
		handleSubmit,
		formState: { isValid },
	} = useForm<IPostCard>({
		defaultValues: {
			companySignatureName: item.companySignatureName,
			documentName: item.documentName,
			documentStatus: item.documentStatus,
			documentType: item.documentType,
			employeeNumber: item.employeeNumber,
			employeeSignatureName: item.employeeSignatureName,
			id: item.id,
		},
	});

	const onSubmit = async ({
		companySigDate,
		companySignatureName,
		documentName,
		documentStatus,
		documentType,
		employeeNumber,
		employeeSigDate,
		employeeSignatureName,
		id,
	}: IPostCard) => {
		companySigDate = employeeSigDate = new Date().toISOString() + "\t";
		const props = {
			companySigDate,
			companySignatureName,
			documentName,
			documentStatus,
			documentType,
			employeeNumber,
			employeeSigDate,
			employeeSignatureName,
		};
		if (id) {
			await dispatch(updatePost({ props, id }));
		} else {
			await dispatch(newPost(props));
		}
		dispatch(setModalWindow());
	};

	return (
		<form className={s.modal} onSubmit={handleSubmit(onSubmit)}>
			<h2>EDITOR</h2>
			<Controller
				render={({ field }) => (
					<TextField
						{...field}
						className="materialUIInput"
						label="Document Name"
						variant="outlined"
						color="primary"
						style={{ marginBottom: 20 }}
						required
						error={field.value.trim() === ""}
						helperText={
							field.value.trim() === "" && "It's required field"
						}
					/>
				)}
				name="documentName"
				control={control}
				rules={{ required: true }}
			/>

			<Controller
				render={({ field }) => (
					<TextField
						{...field}
						className="materialUIInput"
						label="Document Type"
						variant="outlined"
						color="primary"
						style={{ marginBottom: 20 }}
						required
						error={field.value.trim() === ""}
						helperText={
							field.value.trim() === "" && "It's required field"
						}
					/>
				)}
				name="documentType"
				control={control}
				rules={{ required: true }}
			/>

			<Controller
				render={({ field }) => (
					<TextField
						{...field}
						className="materialUIInput"
						label="Document Status"
						variant="outlined"
						color="primary"
						style={{ marginBottom: 20 }}
						required
						error={field.value.trim() === ""}
						helperText={
							field.value.trim() === "" && "It's required field"
						}
					/>
				)}
				name="documentStatus"
				control={control}
				rules={{ required: true }}
			/>

			<Controller
				render={({ field }) => (
					<TextField
						{...field}
						className="materialUIInput"
						label="Company Signature Name"
						variant="outlined"
						color="primary"
						style={{ marginBottom: 20 }}
						required
						error={field.value.trim() === ""}
						helperText={
							field.value.trim() === "" && "It's required field"
						}
					/>
				)}
				name="companySignatureName"
				control={control}
				rules={{ required: true }}
			/>
			<Controller
				render={({ field }) => (
					<TextField
						{...field}
						type="number"
						className="materialUIInput"
						label="Employee Number"
						variant="outlined"
						color="primary"
						InputProps={{ inputProps: { min: 0 } }}
						style={{ marginBottom: 20 }}
						error={field.value.trim() === ""}
						helperText={
							field.value.trim() === "" &&
							"It's a required field for numbers only"
						}
					/>
				)}
				name="employeeNumber"
				control={control}
				defaultValue=""
				rules={{ required: true, pattern: /^(0|[1-9]\d*)(\.\d+)?$/ }}
			/>

			<Controller
				render={({ field }) => (
					<TextField
						{...field}
						className="materialUIInput"
						label="Employee Signature Name"
						variant="outlined"
						color="primary"
						style={{ marginBottom: 10 }}
						required
						error={field.value.trim() === ""}
						helperText={
							field.value.trim() === "" && "It's required field"
						}
					/>
				)}
				name="employeeSignatureName"
				control={control}
				rules={{ required: true }}
			/>
			<div className={s.controls}>
				<Button
					variant="contained"
					color="error"
					onClick={() => dispatch(setModalWindow())}
				>
					Cancel
				</Button>
				<Button variant="contained" type="submit" disabled={!isValid}>
					Submit
				</Button>
			</div>
		</form>
	);
};
