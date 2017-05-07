var movieAPI = ((oldCrap) => {

	oldCrap.getUserMovieList = (apiKeys) => {
		let items = [];
		return new Promise ((resolve, reject) => {
			let uid = movieAPI.credentialsCurrentUser().uid;
			$.ajax(`${apiKeys.databaseURL}/items.json?orderBy="uid"&equalTo="${uid}"`)
			.done((data) => {
				let response = data;
				Object.keys(response).forEach((key) => {
					response[key].id = key;
					items.push(response[key]);
				});
				resolve(items);
			})
			.fail((error) => {
				reject(error);
			});
		});
	};
	oldCrap.addMovie = (apiKeys, newMovie) => {
		newMovie.uid = movieAPI.credentialsCurrentUser().uid;
		return new Promise ((resolve, reject) => {
			$.ajax({
				method: 'POST',
				url:`${apiKeys.databaseURL}/items.json`,
				data: JSON.stringify(newMovie)
			}).done(() => {
				resolve();
			}).fail((error) => {
				reject(error);
			});
		});
	};




	oldCrap.deleteMovie = (apiKeys, id) => {
		return new Promise ((resolve, reject) => {
			$.ajax({
				method: 'DELETE',
				url:`${apiKeys.databaseURL}/items/${id}.json`
			}).done(() => {
				resolve();
			}).fail((error) => {
				reject(error);
			});
		});
	};
	
	oldCrap.editMovie = (apiKeys, editMovie, editId) => {
		editMovie.uid = movieAPI.credentialsCurrentUser().uid;
		return new Promise ((resolve, reject) => {
			$.ajax({
				method: 'PUT',
				url: `${apiKeys.databaseURL}/items/${editId}.json`,
				data: JSON.stringify(editMovie)
			}).done(() => {
				resolve();
			}).fail((error) => {
				reject("add error: ", error);
			});
		});
	};


	return oldCrap;
})(movieAPI || {});