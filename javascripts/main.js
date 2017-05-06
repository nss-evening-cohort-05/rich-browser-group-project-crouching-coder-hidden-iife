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

		let user = {email, password};
		movieAPI.loginUser(user).then((response) => {
			$("#login-container").addClass("hidden");
			$("#user-profile-container").removeClass("hidden");
		}).catch((error) => {
			console.log("login error: ", error);
		});
	});

});
