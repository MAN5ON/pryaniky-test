import { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import { Auth } from "./auth";
import { Header } from "./header";
import { Mainpage } from "./mainpage";
import { changeToken } from "./store/slices/authSlice";
import { Modal } from "./modal";
import { useAppSelector, useAppDispatch } from "./store/hooks";
import s from "./style/App.module.css";

function App() {
	const dispatch = useAppDispatch();
	const modal = useAppSelector((state) => state.post.modal);
	const currentItem = useAppSelector((state) => state.post.currentItem);
	useEffect(() => {
		dispatch(changeToken());
	}, []);
	return (
		<div>
			{modal && <Modal {...currentItem} />}
			<Header />
			<Routes>
				<Route path="/pryaniky-test/" element={<Mainpage />} />
				<Route path="/pryaniky-test/auth" element={<Auth />} />
			</Routes>
		</div>
	);
}

export default App;
