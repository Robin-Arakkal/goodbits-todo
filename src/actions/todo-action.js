/** @format */

import TODO_ACTION_TYPES from '../types/todo-types';

const todoListing = (data) => (dispatch) => {
	dispatch({
		type: TODO_ACTION_TYPES.LOAD_LIST_SUCCESS,
		data: data,
		isError: false,
	});
};
const todoDetails = (id) => (dispatch) => {
	dispatch({
		type: TODO_ACTION_TYPES.LOAD_TODO_DATA_SUCCESS,
		data: JSON.parse(localStorage.getItem('todos')),
		id: id,
		isError: false,
	});
};
const todoAction = {
	todoListing,
	todoDetails,
};
export default todoAction;
