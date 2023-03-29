import { IPostCard } from "../../utils/interfaces";
import { Button } from "@mui/material";
import { useAppSelector, useAppDispatch } from "../../store/hooks";
import {
	deleteItem,
	deletePost,
	setCurrentItem,
	setModalWindow,
} from "../../store/slices/postSlice";
import s from "../../style/post.module.css";

export const Post = (item: IPostCard) => {
	const modal = useAppSelector((state) => state.post.modal);
	const dispatch = useAppDispatch();

	const editPost = () => {
		dispatch(setCurrentItem(item));
		dispatch(setModalWindow());
	};

	const deleteThis = (item: IPostCard) => {
		if (
			window.confirm(
				`Do you really want to remove "${item.documentName}"?`
			)
		) {
			item.id && dispatch(deletePost(item.id));
			dispatch(deleteItem(item));
		}
	};

	return (
		<div className={s.post}>
			<h2>{item.documentName}</h2>
			<span>{item.documentStatus}</span>
			<span>{item.documentType}</span>
			<div className={s.sign}>
				<div className={s.company}>
					<h3>Company</h3>
					<span>{item.companySignatureName}</span>
					<span>
						{new Date(item.companySigDate).toLocaleString("en", {
							year: "numeric",
							month: "long",
							day: "numeric",
							hour12: false,
							hour: "numeric",
							minute: "numeric",
						})}
					</span>
				</div>
				<div className={s.employer}>
					<h3>Employee №{item.employeeNumber}</h3>
					<span>{item.employeeSignatureName}</span>
					<span>
						{new Date(item.employeeSigDate).toLocaleString("en", {
							year: "numeric",
							month: "long",
							day: "numeric",
							hour12: false,
							hour: "numeric",
							minute: "numeric",
						})}
					</span>
				</div>
			</div>
			<div className={s.controls}>
				<Button variant="contained" disabled={modal} onClick={editPost}>
					Edit
				</Button>
				<Button
					variant="contained"
					color="error"
					disabled={modal}
					onClick={() => deleteThis(item)}
				>
					Delete
				</Button>
			</div>
		</div>
	);
};
