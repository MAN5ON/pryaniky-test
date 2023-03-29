import axios from "axios";

const instance = axios.create({
	baseURL: "https://test.v5.pryaniky.com",
});

instance.defaults.headers.common["x-auth"] =window.localStorage.getItem("x-auth")

export default instance;
