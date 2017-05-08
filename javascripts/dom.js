var movieAPI = ((showResults) => {
	showResults.writeProfileDom = (keys, buttonId, movieName) => {
		movieAPI.getUserMovieList(keys).then((results) => {
			let movies = [];
			for (var x=0; x<results.length; x++){
				let movieNameResults = results[x].movieTitle.toLowerCase();
				if (buttonId==="watched" && results[x].isSeen===true){
					movies.push(results[x]);
				}
				if (buttonId==="unwatched" && results[x].isSeen===false){
					movies.push(results[x]);
				}
				if (buttonId === "get-my-movie" && movieNameResults === movieName) {
					movies.push(results[x]);
				}
			}
			if (buttonId==="login" || buttonId==="save" || buttonId==="delete") {
				movies = results;
			}

			let movieString = "";
			for (let j=0; j< movies.length; j++){
				movieString += `<div class="col-xs-6 col-md-4"><section>`;
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

	showResults.writeDom = (results, id) =>{
		let searchResults = results;
		let resultString = "";
		let counter = 0;

		resultString += `<div class="col-xs-6 col-md-4"><section>`;
		resultString += `<h2>${searchResults.Title}</h2>`;
		resultString += `<h3>${searchResults.Year}</h3>`;
		resultString += `<p>Actors: ${searchResults.Actors}</p>`;
		if (id === "search"){
			resultString += `<button class"btn btn-danger col-xs-12" id="addToMyMovies">Add To My Movies</button><br>`;
		} else if (id === "edit") {
			resultString += `<button class"btn btn-danger col-xs-12" id="addToMyMovies">Edit My Movie</button><br>`;
		}
		resultString += `<div id="watchedStatus" class="hidden"><label for="seen">Watched</label>`;
		resultString += `<input class"checkboxStyle" type="checkbox" id="seen">`;
		resultString += `<label for="unseen">Must Watch</label>`;
		resultString += `<input class"checkboxStyle" type="checkbox" id="unseen"></div>`;
		resultString += `<p>Ratings: <br>${searchResults.Ratings[0].Source} ${searchResults.Ratings[0].Value}<br>`;
		resultString += `${searchResults.Ratings[1].Source} ${searchResults.Ratings[1].Value}<br>`;
		resultString += `${searchResults.Ratings[2].Source} ${searchResults.Ratings[2].Value}</p>`;
		resultString += `<div id="myRating" class="hidden"><input class="radioButton" type="radio" name="rating" id="rating1" value="1">1`;
		resultString += `<input class="radioButton" type="radio" name="rating" id="rating2" value="2">2`;
		resultString += `<input class="radioButton" type="radio" name="rating" id="rating3" value="3">3`;
		resultString += `<input class="radioButton" type="radio" name="rating" id="rating4" value="4">4`;
		resultString += `<input class="radioButton" type="radio" name="rating" id="rating5" value="5">5</div>`;
		resultString += `</section><button id="saveMovie" class="hidden">SAVE</button></div>`;
		counter++;
		if(counter === 3){
			resultString += `<div class="clearfix visible-xs-block"></div>`;
		}

		$('#new-search-results').html(resultString);
	};

	return showResults;
})(movieAPI || {});

