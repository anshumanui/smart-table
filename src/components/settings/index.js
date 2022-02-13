import { COLORS } from '../../config/data';

const Settings = ({ selectColor }) => {
	return (
		<section className="st-settings">
			<ul>
				{
					COLORS.map((item, index) => {
						return (
							<li key={ `li_colors_${index}` } onClick={ () => selectColor(item) }>
								<span className={ `st-${item}` }></span>
							</li>
						)
					})
				}
			</ul>
		</section>
	)
}

export default Settings;