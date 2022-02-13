import { useContext } from 'react';
import { ThemeContext } from '../../App';

export default function Search({ searchedText, searchedData, activateColumnSearch, enableColumnSearch }) {
	const themeColor = useContext(ThemeContext);

	return (
		<section className={`st-search st-theme-${themeColor}`}>
			<div>
				<input type="search" placeholder="Search" onChange={ (event) => searchedText(event) } value={ searchedData } />
				<input type="checkbox" onChange={ (event) => activateColumnSearch(event) } value={ enableColumnSearch } />
				<label>Click to activate column level search</label>
			</div>
		</section>
	)
}