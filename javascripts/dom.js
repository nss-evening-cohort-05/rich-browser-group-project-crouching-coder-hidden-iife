var movieAPI = ((showResults) => {
	showResults.writeProfileDom = (keys, buttonId, movieName) => {
		movieAPI.getUserMovieList(keys).then((results) => {
			let movies = results;
			let movieString = "";
			console.log(movies);
			for (let j=0; j< movies.length; j++){

			}
		}).catch((error) => {
			console.log("write Profile Dom error", error);
		});
	};
	return showResults;

	})(movieAPI || {});
