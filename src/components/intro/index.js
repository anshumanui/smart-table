
export default function Intro() {
	//	Change this to dynamic markers, like h2, p to be put and called in json

	return (
		<section className="st-intro">
			<div className="st-container">
				<h3>Smart Table</h3>
				<p>This is first version of smart table. As the name suggests, it's basically a data table which has all the smart features like lazy loading, pagination, global search and on demand column search, sorting, filtering as well as smart data loading.</p>
				<p>Play around with it. The dataset has been taken from <strong>JSONPlaceholder</strong>. You can test it with your own API as well.</p>
			</div>
		</section>
	)
}