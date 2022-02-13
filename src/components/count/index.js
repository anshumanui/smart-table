import { RECORDS_PER_PAGE } from '../../config/data';

export default function Count({ totalRecords }) {

	return (
		<section className="st-count">
			{ 
				totalRecords ? `Showing ${RECORDS_PER_PAGE} out of ${totalRecords}` : '' 
			}
		</section>
	)
}