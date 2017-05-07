var movieAPI = ((showResults) => {
	showResults.writeProfileDom = (keys, buttonId, movieName) => {
		movieAPI.getUserMovieList(keys).then((results) => {
			let movies = results;
			let movieString = "";
			console.log(keys);
			for (let j=0; j< movies.length; j++){
				movieString += `<div class="col-md-6"><section>`;
				movieString += `<h2>${movies[j].movieTitle}</h2>`;
				movieString += `<h3>${movies[j].yearReleased}</h3>`;
				movieString += `<p>Actors: ${movies[j].actors}</p>`;
				movieString += `<div class="userRating">`;
				for (let i=0; i<movies[j].ratings; i++) {
					movieString +=`&#9733;`;
				}
				movieString += `</div>`;
				movieString += `<button class="delete" id="${movies[j].id}">DELETE</button><button class="edit" id="${movies[j].id}">EDIT</button>`;
				movieString += `</section></div>`;
			}
			$("#movieList").html(movieString);
		}).catch((error) => {
			console.log("write Profile Dom error", error);
		});
	};

	showResults.writeDom = (results) =>{
		let searchResults = results;
		let resultString = "";

		resultString += `<div class="col-md-6"><section>`;
		resultString += `<h2>${searchResults.Title}</h2>`;
		resultString += `<h3>${searchResults.Year}</h3>`;
		resultString += `<p>Actors: ${searchResults.Actors}</p>`;
		resultString += `<button class"btn btn-danger col-xs-12" id="addToMyMovies">Add To My Movies</button><br>`;
		resultString += `<div id="watchedStatus" class="hidden"><label for="seen">Watched</label>`;
		resultString += `<input class"checkboxStyle" type="checkbox" id="seen">`;
		resultString += `<label for="unseen">Must Watch</label>`;
		resultString += `<input class"checkboxStyle" type="checkbox" id="unseen"></div>`;
		resultString += `<p>Ratings: <br>${searchResults.Ratings[0].Source} ${searchResults.Ratings[0].Value}<br>`;
		resultString += `${searchResults.Ratings[1].Source} ${searchResults.Ratings[1].Value}<br>`;
		resultString += `${searchResults.Ratings[2].Source} ${searchResults.Ratings[2].Value}</p>`;
		resultString += `<div id="myRating" class="hidden"><input class="radioButton" type="radio" id="rating1" value="1">1`;
		resultString += `<input class="radioButton" type="radio" id="rating2" value="2">2`;
		resultString += `<input class="radioButton" type="radio" id="rating3" value="3">3`;
		resultString += `<input class="radioButton" type="radio" id="rating4" value="4">4`;
		resultString += `<input class="radioButton" type="radio" id="rating5" value="5">5</div>`;
		resultString += `</section><button id="saveMovie" class="hidden">SAVE</button></div>`;

		$('#new-search-results').html(resultString);
	};

	return showResults;
})(movieAPI || {});

