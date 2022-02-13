
export const filterData = (data, selectedArr) => {
	return data.filter((item) => !selectedArr.includes(item));
}


export const sortData = (data, columnName, sortOrder) => {
	return data.sort((a, b) => {
		if (Number(a[columnName])) {
			return sortOrder[columnName] ? a[columnName] - b[columnName] : b[columnName] - a[columnName];
		}
		
		let firstValue = a[columnName].toUpperCase();
		let secondValue = b[columnName].toUpperCase();
		if (firstValue < secondValue) {
			return sortOrder[columnName] ? -1 : 1;
		}
		if (firstValue > secondValue) {
			return sortOrder[columnName] ? 1 : -1;
		}

		return 0;
	});
}