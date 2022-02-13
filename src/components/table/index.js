import { useState, useContext } from 'react';
import { ThemeContext } from '../../App';


const ErrorContainer = ({ error }) => {
	return (
		<section className="ai4-errorContainer">
			<h4>Following error has happened</h4>
			<p>{ error }</p>
			<h5>Please try after a while!</h5>
		</section>
	)
}


const LoadingContainer = ({ loading }) => {
	return (
		<section className="ai4-loadingContainer">
			<h4>Loading...</h4>
		</section>
	)
}


const TableHeader = ({ item, sortColumns }) => {
	return (
		<th onClick={ () => sortColumns(item) }>{ item }</th>
	)
}


const ColumnSearch = ({ item, searchColumns, columnSearchData }) => {
	return (
		<th>
			<input type="search" onChange={ (event) => searchColumns(event, item) } placeholder={`Search ${item}`} value={columnSearchData[item] ? columnSearchData[item] : ''} />
		</th>
	)
}


const TableBody = ({ id, userId, title, body, inlineEditDelete, activateConfirmationModal }) => {
	const [enableEdit, setEnableEdit] = useState(false);
	const [editedData, setEditedData] = useState({
		userId,
		title,
		body
	});

	const saveEditedData = (event, type) => {
		setEditedData(prevData => ({...prevData, [type]: event.target.value}));
	}

	return (
		<tr>
			
			{
				enableEdit ? (
					<>
						<td>
							<input type="text" placeholder={ userId } onChange={ (event) => saveEditedData(event, 'userId') } value={ editedData[userId] } />
						</td>
						<td>
							<input type="text" placeholder={ title } onChange={ (event) => saveEditedData(event, 'title') } value={ editedData[title] } />
						</td>
						<td>
							<textarea placeholder={ body } onChange={ (event) => saveEditedData(event, 'body') } value={ editedData[body] }></textarea>
						</td>
					</>
				) : (
					<>
						<td>{ userId }</td>
						<td>{ title }</td>
						<td>{ body }</td>
					</>
				)
			}			
			<td>
				<span onClick={ () => setEnableEdit(true) }>Edit</span>
				<span onClick={ () => activateConfirmationModal(true, id, 'DELETE', title) }>Delete</span>
				{
					enableEdit ? (
						<>
							<span onClick={ () => inlineEditDelete(id, 'EDIT', editedData) }>Save</span>
							<span onClick={ () => setEnableEdit(false) }>Cancel</span>
						</>
					) : (null)
				}
			</td>
		</tr>
	)
}


const TableWithoutData = ({ tableHeaderData }) => {
	return (
		<tr>
			<td colSpan={ tableHeaderData.length + 1 }>No matches found! Please change the search text and try again.</td>
		</tr>
	)
}


const Table = ({ filteredData, loading, error, tableHeaderData, sortColumns, searchColumns, columnSearchData, enableColumnSearch, inlineEditDelete, activateConfirmationModal }) => {
	const themeColor = useContext(ThemeContext);

	if (loading) return <LoadingContainer {...{loading}} />;
	if (error) return <ErrorContainer {...{error}} />;

	return (
		<section className={`st-table st-theme-${themeColor}`}>
			<div className="st-container">
				<table>
					<thead>
						<tr>
							{
								tableHeaderData.map((item, index) => <TableHeader key={ `th_${index}` } {...{item}} {...{sortColumns}} />)
							}
							<th>Actions</th>
						</tr>
						{
							enableColumnSearch ? (
								<tr>
									{
										tableHeaderData.map((item, index) => <ColumnSearch key={ `cs_${index}` } {...{item}} {...{searchColumns}} {...{columnSearchData}} />)
									}
									<th></th>
								</tr>
							) : (null)
						}
					</thead>
					<tbody>
						{
							filteredData.length ? (
								filteredData.map((item, index) => <TableBody key={ `tr_${item.id}` } {...item} {...{inlineEditDelete}} {...{activateConfirmationModal}} />)
							) : (
								<TableWithoutData {...{tableHeaderData}} />
							)
						}
					</tbody>
				</table>
			</div>
		</section>
	)
}

export default Table;