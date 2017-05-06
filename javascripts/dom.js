var movieAPI = ((showResults) => {

	showResults.writeDom = (results) =>{
		let searchResults = results;
		let resultString = "";

		resultString += `<div>`;
		resultString += `<h1>${searchResults.Title}</h1>`;
		resultString += `</div>`;

		$('#search-new-container').append(resultString);
	}






		return showResults;
})(movieAPI || {});