import { useEffect, useState } from "react";
import { useAppSelector, useAppDispatch } from "../store/hooks";
import {
	Alert,
	Button,
	Collapse,
	IconButton,
	LinearProgress,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { Link } from "react-router-dom";
import { fetchPosts } from "../store/slices/postSlice";
import { Post } from "./post/post";

export const Mainpage = () => {
	const [open, setOpen] = useState(true);
	const isAuth = Boolean(useAppSelector((state) => state.auth.token));
	const isLoaded =
		useAppSelector((state) => state.post.loading) === "succeeded";
	const dispatch = useAppDispatch();
	const postData = useAppSelector((state) => state.post.data);
	const errCode = useAppSelector((state) => state.post.error_code);
	const errMessage = useAppSelector((state) => state.post.error_message);

	useEffect(() => {
		isAuth && dispatch(fetchPosts());
	}, [isAuth]);
	return (
		<div>
			{errCode !== 0 && (
				<Collapse in={open}>
					<Alert
						severity="error"
						action={
							<IconButton
								aria-label="close"
								color="inherit"
								size="small"
								onClick={() => {
									setOpen(false);
								}}
							>
								<CloseIcon fontSize="inherit" />
							</IconButton>
						}
						sx={{ mb: 2 }}
					>
						Error {errCode}. Details: {errMessage}
					</Alert>
				</Collapse>
			)}
			{isAuth ? (
				isLoaded ? (
					postData.length !== 0 ? (
						postData
							.map((item) => <Post key={item.id} {...item} />)
							.reverse()
					) : (
						<Alert severity="info">No posts here.</Alert>
					)
				) : (
					<LinearProgress />
				)
			) : (
				<Alert
					severity="warning"
					action={
						<Link
							to="/pryaniky-test/auth"
							style={{ textDecoration: "none" }}
						>
							<Button color="inherit" size="medium">
								Fix it
							</Button>
						</Link>
					}
				>
					You are not authorized. You must be logged in to see
					content.
				</Alert>
			)}
		</div>
	);
};
