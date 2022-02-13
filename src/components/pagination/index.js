import { useState, useEffect } from 'react';
import { RECORDS_PER_PAGE } from '../../config/data';

export default function Pagination({ totalRecords, loadActivePageData }) {
	const pages = Math.ceil(totalRecords/RECORDS_PER_PAGE);
	const [activePage, setActivePage] = useState(1);

	const updateActivePage = (type) => {
		if (type === 'next') {
			setActivePage(prevPage => prevPage < pages ? prevPage + 1 : prevPage);
		} else if (type === 'prev') {
			setActivePage(prevPage => prevPage > 1 ? prevPage - 1 : prevPage);
		}
	}

	useEffect(() => {
		loadActivePageData(activePage);
	}, [activePage])

	return (
		<section className="st-pagination">
			<ul>
				<li onClick={ () => updateActivePage('prev') } className={ activePage === 1 ? 'st-paginationDisabled' : '' }>Previous</li>
				<li className={ activePage === 1 ? 'st-paginationActive' : '' }>1</li>
				{
					activePage > 2 ? (
						<li className="st-paginationGap">...</li>
					) : (null)
				}

				{ 
					activePage > 3 ? (
						<li>{ activePage - 1 }</li>
					) : (null)
				}

				{
					activePage !== 1 && activePage !== pages ? (
						<li className={ activePage !== 1 && activePage !== pages ? 'st-paginationActive' : '' }>{ activePage }</li>
					) : (null)
				}

				{
					activePage < pages - 2 ? (
						<li>{ activePage + 1 }</li>
					) : (null)
				}

				{
					activePage < pages - 1 ? (
						<li className="st-paginationGap">...</li>
					) : (null)
				}
				
				<li className={ activePage === pages ? 'st-paginationActive' : '' }>{ pages }</li>
				<li onClick={ () => updateActivePage('next') } className={ activePage === pages ? 'st-paginationDisabled' : '' }>Next</li>
			</ul>
		</section>
	)
}