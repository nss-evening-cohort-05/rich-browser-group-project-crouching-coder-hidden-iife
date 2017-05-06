$(document).ready(function() {

  $('#getMovie').click((event) => {
    let movieTitle = $('#movieSearch').val();
    movieAPI.getMovie(movieTitle).then((results) =>{
      console.log("Movie API results:", results);
    }).catch((error) => {
      console.log("getMovie Error", error);
    });
  });


  movieAPI.firebaseCredentials().then((firebaseKeys) => {
  	apiKeys = firebaseKeys;
  	firebase.initializeApp(apiKeys);
  }).catch((error) => {
  	console.log("initialize error", error);
  });
});
