$(document).ready(function() {
	let apiKeys;
	let editId = "";


//**********************************************************
	//FIREBASE INITIALIZING
	movieAPI.firebaseCredentials().then((myKeys) => {
		apiKeys = myKeys;
		firebase.initializeApp(apiKeys);
	}).catch((error) => {
		console.log("key errors", error);
	});

//**********************************************************
	//CRUD FUNCTIONALITY
	//ADD MOVIE
	let addMovieClick = (results, id) => {
		let newMovie = {
			movieTitle: results.Title,
			yearReleased: results.Year,
			actors: results.Actors,
			isSeen: false,
			ratings: 0
		};
		$("#addToMyMovies").on("click", () => {
			$("#watchedStatus").removeClass("hidden");
			$("#addToMyMovies").toggleClass("hidden");

			$(":checkbox").on("click", (e) => {
				if (e.target.id === "seen") {
					$("#myRating").removeClass("hidden");
					newMovie.isSeen = true;
					$("#saveMovie").removeClass("hidden");
				} else {
					newMovie.isSeen = false;
					$("#saveMovie").removeClass("hidden");
				}
			});
			$("#saveMovie").on("click", (e) => {
				let radioRatings = $("input:radio");
				 for (let i =0; i < radioRatings.length; i++){
				 	if (radioRatings[i].checked === true) {
				 		newMovie.ratings = radioRatings[i].value;
				 	}
				 }
				if (id === "search"){				
				movieAPI.addMovie(apiKeys, newMovie).then(() => {
		        $('#search-new-container').addClass('hidden');
		        $('#user-profile-container').removeClass('hidden');
		        let id = "save";
		        movieAPI.writeProfileDom(apiKeys, id);
				}).catch((error) => {
					console.log(error);
				});
				} else if (id === "edit"){
					console.log(newMovie);
					movieAPI.editMovie(apiKeys, newMovie, editId).then(() => {
						$('#search-new-container').addClass('hidden');
				        $('#user-profile-container').removeClass('hidden');
				        let id = "save";
				        movieAPI.writeProfileDom(apiKeys, id);
					}).catch((error) => {
						console.log(error);
					});
				}
				});
			});
	};

	//WATCHED VS UNWATCHED VIEW

	$("#watched-btn").click(() => {
		let buttonID = "watched";
		movieAPI.writeProfileDom(apiKeys, buttonID);
	});

	$("#unwatched-btn").click(() => {
		let buttonID = "unwatched";
		movieAPI.writeProfileDom(apiKeys, buttonID);
	});

	//DELETE MOVIE
	$("#movieList").on("click", ".delete", (e) => {
		let targetId = e.target.id;
		movieAPI.deleteMovie(apiKeys, targetId).then(() => {

		//prevents error of no items in keys - possibly cashing issue?
		if (apiKeys !== undefined){
			let id = "delete";
			movieAPI.writeProfileDom(apiKeys, id);
		} else {
			$("#movieList").html("You have no movies! Go find and add some");
		}	
		}).catch((deleteError) => {
			console.log("deleteTodo error: ", deleteError);
		});
	});

	//EDIT MOVIE
	$("#movieList").on("click", ".edit", (e) => {
		editId = e.target.id;
		let movieName = e.target.parentNode.firstChild.textContent;
		$("#search-new-container").removeClass("hidden");
	    $("#user-profile-container").addClass("hidden");
	    $("#search-yours-container").addClass("hidden");
	    movieAPI.getMovie(movieName).then((results) => {
	    	let id = "edit";
	    	movieAPI.writeDom(results, id);
	    	addMovieClick(results, id);
	    }).catch((error) => {
	    	console.log("edit movie error", error);
	    });
	});

//**********************************************************
	//BROAD MOVIE SEARCH
  $('#getMovie').click((event) => {
    let movieTitle = $('#movieSearch').val();
    movieAPI.getMovie(movieTitle).then((results) =>{
      let id = "search";
      movieAPI.writeDom(results, id);
      addMovieClick(results, id);
      clearInput();
      console.log("Movie API results:", results);
    }).catch((error) => {
      console.log("getMovie Error", error);
    });
  });

//**********************************************************
  //LOGIN FUNCTIONALITY
  $("#userRegisterBtn").click(() => {
  	$('body').removeClass("background-image");
  	$('body').addClass("logo");
		let email = $("#userEmail").val();
		let password = $("#userPassword").val();
		let username = $("#userName").val();

		let user = {email, password};
		movieAPI.registerUser(user).then((response) => {
			let newUser = {
				uid: response.uid,
				username: username
			};

			movieAPI.addUser(apiKeys, newUser).then((response) => {
				movieAPI.loginUser(user).then((response) => {
					$("#login-container").addClass("hidden");
					$("#user-profile-container").removeClass("hidden");
					$("#logout").removeClass("hidden");
    				$("#new-movies").removeClass("hidden");
    				$("#search-your-movies").removeClass("hidden");
				}).catch((error) => {
					console.log("login error: ", error);
				});
			}).catch((newUserError) => {
				console.log("add user error: ", newUserError);
			});
		}).catch((error) => {
			console.log("register user error: ", error);
		});
	});

  $("#userLoginBtn").click(() => {
  	$('body').removeClass("background-image");
  	$('body').addClass("logo");
		let email = $("#userEmail").val();
		let password = $("#userPassword").val();

    $("#logout").removeClass("hidden");
    $("#new-movies").removeClass("hidden");
    $("#search-your-movies").removeClass("hidden");
    $("#my-profile").removeClass("hidden");

		let user = {email, password};
		movieAPI.loginUser(user).then((response) => {
			$("#login-container").addClass("hidden");
			$("#user-profile-container").removeClass("hidden");
			let id = "login";
     	movieAPI.writeProfileDom(apiKeys, id);
		}).catch((error) => {
			console.log("login error: ", error);
		});
	});


  $("#new-movies").click(() => {
    $("#search-new-container").removeClass("hidden");
	$("#movieSearch").focus();
    $("#user-profile-container").addClass("hidden");
    $("#search-yours-container").addClass("hidden");

  });

  $("#search-your-movies").click(() => {
    $("#user-profile-container").addClass("hidden");
    $("#search-yours-container").removeClass("hidden");
	$("#my-movie-search").focus();
    $("#search-new-container").addClass("hidden");

  });

  $("#logout").on("click", () => {
  	$('body').addClass("background-image");
  	$('body').removeClass("logo");
		$("#login-container").removeClass("hidden");
		$("#user-profile-container").addClass("hidden");
		$("#search-yours-container").addClass("hidden");
		$("#search-new-container").addClass("hidden");
		$("#new-movies").addClass("hidden");
   		$("#search-your-movies").addClass("hidden");
   		$("#my-profile").addClass("hidden");
		movieAPI.logoutUser();
		$("#userEmail").val("");
		$("#userPassword").val("");
		$("#userName").val("");
	});

//**********************************************************
	//EVENT LISTENERS
  const clearInput = () => {
    $("#my-movie-search").val("");
    $("#movieSearch").val("");
  };

  $("#get-my-movie").click((e) => {
    let myMovie = $("#my-movie-search").val().toLowerCase();
    let id = e.target.id;
    clearInput();
    $("#search-yours-container").addClass("hidden");
    $("#user-profile-container").removeClass("hidden");
    movieAPI.writeProfileDom(apiKeys, id, myMovie);
  });

  
});




