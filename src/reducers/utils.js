/** @format */

const findItem = (data, id) => {
	const item = data.find((ele) => ele.id == id);
	return item;
};

const utils = {
	findItem,
};
export default utils;
