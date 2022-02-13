import { useContext } from 'react';
import { ThemeContext } from '../../App';

export default function ConfirmationModal ({ id, data, inlineEditDelete, activateConfirmationModal }) {
	const themeColor = useContext(ThemeContext);

	return (
		<section className={`st-confirmationModal st-theme-${themeColor}`}>
			<div className="st-confirmationModalBox">
				<div className="st-confirmationModalBody">
					Are you sure you want to delete the record having title - {data}?
				</div>
				<div className="st-confirmationModalFooter">
					<button type="button" className="st-btn st-primaryBtn" onClick={ () => inlineEditDelete(id, 'DELETE') }>Delete</button>
					<button type="button" className="st-btn st-defaultBtn" onClick={ () => activateConfirmationModal(false) }>Cancel</button>
				</div>
			</div>
		</section>
	)
}