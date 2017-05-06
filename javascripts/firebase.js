var movieAPI =  (() => {
	let movieList = [];

	return {
		firebaseCredentials : () => {
			return new Promise((resolve, reject) => {
				$.ajax("apiKeys.json")
				.done((data) => {
					resolve(data);
				})
				.fail((error) => {
					reject(error);
				});
			});
		}
	};
})();