import { createSlice } from "@reduxjs/toolkit";

const usersInitialState = {
	users: JSON.parse(localStorage.getItem('users')) || []
};

const Users = createSlice({
	name: "users",
	initialState: usersInitialState,
	reducers: {
		addUserTemplate(state, action) {
			let userList = {}
			for (let user of action.payload){
				userList[user['id']] = user
			}
			state.users = userList
		},
		toggleFavorite(state,action){
			state.users[action.payload]['isFavorite'] = !state.users[action.payload].isFavorite
		},
		editUser(state, action) {
			let email = action.payload.email
			let phone = action.payload.phone
			let website = action.payload.website
			state.users[action.payload.id] = {...state.users[action.payload.id],email:email,phone:phone,website:website}
		},
		deleteUser(state, action) {
			delete state.users[action.payload]
		},
	},
});

export const userActions = Users.actions;

export default Users.reducer;
