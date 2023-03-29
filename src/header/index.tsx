import { Button, Toolbar, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { changeToken } from "../store/slices/authSlice";
import {
	clearData,
	setCurrentItem,
	setModalWindow,
} from "../store/slices/postSlice";
import s from "../style/header.module.css";

export const Header = () => {
	const dispatch = useAppDispatch();
	const isAuth = Boolean(useAppSelector((state) => state.auth.token));
	const modal = useAppSelector((state) => state.post.modal);

	const newItem = () => {
		dispatch(
			setCurrentItem({
				companySigDate: "",
				companySignatureName: "",
				documentName: "",
				documentStatus: "",
				documentType: "",
				employeeNumber: "",
				employeeSigDate: "",
				employeeSignatureName: "",
				id: "",
			})
		);
		dispatch(setModalWindow());
	};

	const onClickLogout = () => {
		if (window.confirm("Do you really want to logout?")) {
			window.localStorage.removeItem("x-auth");
			dispatch(changeToken());
			dispatch(clearData());
		}
	};
	return (
		<Toolbar className={s.headerToolbar}>
			<Link to="/pryaniky-test/" style={{ textDecoration: "none" }}>
				<Typography
					sx={{
						mr: 2,
						display: { xs: "none", md: "flex" },
						fontFamily: "monospace",
						fontWeight: 700,
						fontSize: 40,
						letterSpacing: ".3rem",
						color: "black",
						textDecoration: "none",
						cursor: "pointer",
					}}
				>
					ПРЯНИКИ
				</Typography>
			</Link>
			{isAuth ? (
				<div className={s.controls}>
					<Button
						variant="contained"
						onClick={newItem}
						disabled={modal}
					>
						New Post
					</Button>
					<Link
						to="/pryaniky-test/"
						style={{ textDecoration: "none" }}
					>
						<Button
							variant="contained"
							color="error"
							onClick={onClickLogout}
							disabled={modal}
						>
							Logout
						</Button>
					</Link>
				</div>
			) : (
				<Link
					to="/pryaniky-test/auth"
					style={{ textDecoration: "none" }}
				>
					<Button variant="contained" color="primary">
						Auth
					</Button>
				</Link>
			)}
		</Toolbar>
	);
};
