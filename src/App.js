import { useState, useEffect, createContext } from 'react';

import './assets/styles/smart-table.scss';

import Settings from './components/settings/';
import Intro from './components/intro/';
import Search from './components/search/';
import Count from './components/count/';
import Table from './components/table/';
import Pagination from './components/pagination/';
import ConfirmationModal from './components/modal';
import * as utils from './utils/';

import { RECORDS_PER_PAGE } from './config/data';

export const ThemeContext = createContext('blue');


function App() {
	const [userColor, setUserColor] = useState('blue');
	const [searchedData, setSearchedData] = useState('');
	const [sortOrder, setSortOrder] = useState(false);
	const [tableHeaderData, setTableHeaderData] = useState([]);
	const [columnSearchData, setColumnSearchData] = useState({});
	const [enableColumnSearch, setEnableColumnSearch] = useState(false);
	const [showConfirmationModal, setShowConfirmationModal] = useState(false);
	const [toBeDeletedData, setToBeDeletedData] = useState({});


	const colorSelected = (color) => {
		setUserColor(color);
	}

	const searchedText = (event) => {
		setSearchedData(event.target.value);
	}

	const activateColumnSearch = (event) => {
		setEnableColumnSearch((prevData) => !prevData);
		setColumnSearchData({});
		setSearchedData('');
	}

	const sortColumns = (columnName) => {
		setSortOrder((prevOrder) => ({...prevOrder, [columnName]: !prevOrder[columnName]}));
		const sortedData = utils.sortData(apiStatus.filteredData, columnName, sortOrder);
		setApiStatus((prevState) => ({...prevState, filteredData: sortedData}));
	}

	const searchColumns = (event, columnName) => {
		setColumnSearchData((prevData) => ({...prevData, [columnName]: event.target.value}));
	}

	const activateConfirmationModal = (status, id=null, action=null, data=null) => {
		setShowConfirmationModal(status);
		setToBeDeletedData({id, data});
	}

	const inlineEditDelete = (id, action, editedData=null) => {
		if (action === 'DELETE') {
			getData('DELETE', id);
		} else {
			getData('PATCH', id, editedData);
		}
	}

	useEffect(() => {
		if (apiStatus.data) {
			const globalFilter = apiStatus.data.filter((item) => tableHeaderData.some((subItem) => String(item[subItem]).toLowerCase().includes(searchedData.toLowerCase())));

			const columnFilter = apiStatus.data.filter((item) => Object.keys(columnSearchData).every((subItem) => String(item[subItem]).toLowerCase().includes(String(columnSearchData[subItem]).toLowerCase())));

			const searchFilteredData = enableColumnSearch ? columnFilter : globalFilter;
			setApiStatus((prevState) => ({...prevState, filteredData: searchFilteredData}));
			setTotalRecords(searchFilteredData.length);
		}
	}, [searchedData, columnSearchData]);

	const loadActivePageData = (activePage) => {
		if (apiStatus.data) {
			setApiStatus((prevState) => ({...prevState, filteredData: prevState.data.slice(RECORDS_PER_PAGE * (activePage - 1), (RECORDS_PER_PAGE * activePage) - 1)}));
		}
	}

	const initStatus = {
		data: null,
		loading: true,
		error: null
	};

	const [apiStatus, setApiStatus] = useState(initStatus);
	const [totalRecords, setTotalRecords] = useState(null);

	useEffect(() => {
		getData('GET');
	}, []);

	async function getData(methodType, id=null, editedData=null) {
		let url = 'https://jsonplaceholder.typicode.com/posts';

		let options = {};
		options.headers = {
	        'Content-Type': 'application/json',
	        'Accept': 'application/json'
	    }

	    options.credentials = 'include';
	    options.method = methodType;

	    if (methodType !== 'GET') {
			//	Append the id received in data param if its a POST or DELETE method type
		    if (['DELETE', 'PUT', 'PATCH'].includes(methodType)) {
		    	url = `${url}/${id}`;
		    }

		    //	Append body to the options if its a POST or PUT or PATCH method type
			if (['POST', 'PUT', 'PATCH'].includes(methodType)) {
				delete editedData.id;
			 	options.body = JSON.stringify(editedData);
		    }
		}

		
		await fetch(url, options)
		.then((res) => {
			if (res.ok) {
				if (methodType === 'GET') {
					return res.json();
				} else if (methodType === 'DELETE') {
					const refinedData = apiStatus.data.filter(item => item.id !== id);
					setApiStatus((prevState) => ({...prevState, data: refinedData, filteredData: refinedData}));
					setTotalRecords(refinedData.length);
					setShowConfirmationModal(false);
					return;
				} else if (methodType === 'PATCH') {
					const matchedIndex = apiStatus.data.findIndex(item => item.id === id);
					const refinedData = [...apiStatus.data];
					refinedData[matchedIndex] = editedData;
					setApiStatus((prevState) => ({...prevState, data: refinedData, filteredData: refinedData}));
					return;
				}
			}
			setApiStatus((prevState) => ({...prevState, error: res.status}));
		})
		.then((response) => {
			if (methodType === 'GET') {
				setApiStatus((prevState) => ({...prevState, data: response, filteredData: response.slice(0, RECORDS_PER_PAGE - 1)}));
				setTotalRecords(response.length);
				setTableHeaderData(utils.filterData(Object.keys(response[0]), ['id']));
			}
		})
		.catch((error) => {
			setApiStatus((prevState) => ({...prevState, error: error}));
		})
		.finally(() => {
			setApiStatus((prevState) => ({...prevState, loading: false}));
		});
	}


    return (
    	<ThemeContext.Provider value={userColor}>
	        <main>
	        	<Settings selectColor={colorSelected} />
	        	<Intro />

	        	<section className="st-searchAndCount">
	        		<Search {...{searchedText}} {...{searchedData}} {...{activateColumnSearch}} {...{enableColumnSearch}} />
	        		<Count {...{totalRecords}} />
	        	</section>
	            
	            <Table {...apiStatus} {...{tableHeaderData}} {...{sortColumns}} {...{searchColumns}} {...{columnSearchData}} {...{enableColumnSearch}} {...{inlineEditDelete}} {...{activateConfirmationModal}} />
	            <Pagination {...{totalRecords}} {...{loadActivePageData}} />
	            { showConfirmationModal && <ConfirmationModal {...toBeDeletedData} {...{inlineEditDelete}} {...{activateConfirmationModal}} /> }
	        </main>
	    </ThemeContext.Provider>
    );
}

export default App;
