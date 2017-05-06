var movieApi = ((oldCrap) => {

	oldCrap.getUserMovieList = (apiKeys) => {
		let items = [];
		return new Promise ((resolve, reject) => {
			let uid = FbApi.credentialsCurrentUser().uid;
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

	return oldCrap;
})(FbApi || {});