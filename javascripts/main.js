$(document).ready(function() {
	let apiKeys;

	//FIREBASE INITIALIZING
	movieAPI.firebaseCredentials().then((firebaseKeys) => {
		apiKeys = firebaseKeys;
		firebase.initializeApp(apiKeys);
	}).catch((error) => {
		console.log("key errors", error);
	});

  $('#getMovie').click((event) => {
    let movieTitle = $('#movieSearch').val();
    movieAPI.getMovie(movieTitle).then((results) =>{
      movieAPI.writeDom(results);
      clearInput();
      console.log("Movie API results:", results);
    }).catch((error) => {
      console.log("getMovie Error", error);
    });
  });

  //LOGIN FUNCTIONALITY
  $("#userRegisterBtn").click(() => {
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
		let email = $("#userEmail").val();
		let password = $("#userPassword").val();

    $("#logout").removeClass("hidden");
    $("#new-movies").removeClass("hidden");
    $("#search-your-movies").removeClass("hidden");

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
    $("#user-profile-container").addClass("hidden");
    $("#search-yours-container").addClass("hidden");

  });

  $("#search-your-movies").click(() => {
    $("#user-profile-container").addClass("hidden");
    $("#search-yours-container").removeClass("hidden");
    $("#search-new-container").addClass("hidden");

  });

  const clearInput = () => {
    $("#my-movie-search").val("");
    $("#movieSearch").val("");
  };

  $("#get-my-movie").click((e) => {
    let myMovie = $("#my-movie-search").val();
    let id = e.target.id;
    clearInput();



    // movieAPI.writeProfileDom(apiKeys, id, myMovie);
  });

  $("#watched-btn").click((e) => {
    let id = e.target.id;


    // movieAPI.writeProfileDom(apiKeys, id)
  });

  $("#unwatched-btn").click((e) => {
    let id = e.target.id;

    // movieAPI.writeProfileDom(apiKeys, id)
  });

});
