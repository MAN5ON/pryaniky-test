import { useState } from "react";
import { Alert, Button, TextField } from "@mui/material";
import { Navigate } from "react-router-dom";
import { Controller, useForm } from "react-hook-form";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { fetchLogin } from "../store/slices/authSlice";
import { ILogin } from "../utils/interfaces";
import s from "../style/auth.module.css";

export const Auth = () => {
	const dispatch = useAppDispatch();
	const isAuth = Boolean(useAppSelector((state) => state.auth.token));

	const [error, setError] = useState("");

	const {
		control,
		handleSubmit,
		formState: { isValid },
	} = useForm<ILogin>({
		defaultValues: {
			username: "user33",
			password: "password",
		},
	});

	const onSubmit = async ({ username, password }: ILogin) => {
		const data = await dispatch(fetchLogin({ username, password }));
		if (data.payload.error_code != 0) {
			setError(
				`Error Code: ${data.payload.error_code} :  Details: ${data.payload.error_text}`
			);
		}
		if (data.payload.data !== null) {
			window.localStorage.setItem("x-auth", data.payload.data.token);
		}
	};

	if (isAuth) {
		return <Navigate to="/pryaniky-test/" />;
	}

	return (
		<div>
			<form className={s.authForm} onSubmit={handleSubmit(onSubmit)}>
				<Controller
					render={({ field }) => (
						<TextField
							{...field}
							className="materialUIInput"
							label="Username"
							variant="outlined"
							color="primary"
							style={{ marginBottom: 20 }}
							required
							error={field.value.trim() === ""}
							helperText={
								field.value.trim() === "" &&
								"It's required field"
							}
						/>
					)}
					name="username"
					control={control}
					rules={{ required: true }}
				/>
				<Controller
					render={({ field }) => (
						<TextField
							{...field}
							label="Password"
							type="password"
							variant="outlined"
							color="primary"
							style={{ marginBottom: 20 }}
							required
							error={field.value.trim() === ""}
							helperText={
								field.value.trim() === "" &&
								"It's required field"
							}
						/>
					)}
					name="password"
					control={control}
					rules={{ required: true }}
				/>
				<Button
					color="primary"
					variant="contained"
					size="medium"
					type="submit"
					disabled={!isValid}
				>
					LOG IN
				</Button>
			</form>
			{error && (
				<Alert
					severity="error"
					action={
						<Button
							color="inherit"
							size="medium"
							onClick={() => setError("")}
						>
							OK
						</Button>
					}
				>
					{error}
				</Alert>
			)}
		</div>
	);
};
