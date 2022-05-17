/** @format */

import TODO_ACTION_TYPES from '../types/todo-types';
import utils from './utils';
const initalState = {
	list: [],
	isLoading: false,
	isError: false,
};

const todoReducer = (state = initalState, action) => {
	switch (action.type) {
		case TODO_ACTION_TYPES.LOAD_LIST_SUCCESS:
			return {
				...state,
				list: action.data,
				isLoading: true,
				isError: false,
			};
		case TODO_ACTION_TYPES.LOAD_TODO_DATA_SUCCESS:
			return {
				...state,
				todoItem: utils.findItem(action.data, action.id),
				isLoading: true,
				isError: false,
			};

		default:
			return state;
	}
};

export default todoReducer;
