import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./users";

const store = configureStore({
	reducer: {
		users: userSlice,
	},
});

store.subscribe(() => {
	localStorage.setItem("users", JSON.stringify(store.getState('users')['users']['users']));
});

export default store;
