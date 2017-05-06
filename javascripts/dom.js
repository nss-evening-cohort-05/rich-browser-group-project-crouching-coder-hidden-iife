var movieAPI = ((showResults) => {

	showResults.writeDom = (results) =>{
		let searchResults = results;
		let resultString = "";

		resultString += `<div class="col-md-6"><section>`;
		resultString += `<h2>${searchResults.Title}</h2>`;
		resultString += `<h3>${searchResults.Year}</h3>`;
		resultString += `<p>Actors: ${searchResults.Actors}</p>`;
		resultString += `<button class"btn btn-danger col-xs-12" id="addToMyMovies">Add To My Movies</button><br>`;
		resultString += `<label for="seen">Watched</label>`
		resultString += `<input class"checkboxStyle" type="checkbox" id="seen">`;
		resultString += `<label for="unseen">Must Watch</label>`
		resultString += `<input class"checkboxStyle" type="checkbox" id="unseen">`;
		resultString += `<p>Ratings: <br>${searchResults.Ratings[0].Source} ${searchResults.Ratings[0].Value}<br>`;
		resultString += `${searchResults.Ratings[1].Source} ${searchResults.Ratings[1].Value}<br>`;
		resultString += `${searchResults.Ratings[2].Source} ${searchResults.Ratings[2].Value}</p>`;
		resultString += `<div class="hidden"><input class"radioButton" type="radio" id="rating1">1`;
		resultString += `<input class"radioButton" type="radio" id="rating2">2`;
		resultString += `<input class"radioButton" type="radio" id="rating3">3`;
		resultString += `<input class"radioButton" type="radio" id="rating4">4`;
		resultString += `<input class"radioButton" type="radio" id="rating5">5</div>`;
		resultString += `</section></div>`;

		$('#new-search-results').html(resultString);
	}






		return showResults;
})(movieAPI || {});