
let userLogin = document.querySelector('#userLogin');

userLogin.addEventListener("submit", (event) => {
	event.preventDefault();

let email = document.querySelector('#email').value
let password = document.querySelector('#password').value


	if(email === "" || password === ""){
		alert(`Please inpute required fields`)
	} 
	else {
		fetch('https://gentle-wave-67856.herokuapp.com/api/users/login',
			{
				method: "POST",
				headers: {
					"Content-Type": "application/json"
				},
				body: JSON.stringify({
					email: email,
					password: password
				})

			}
		)
		.then(result => result.json())
		.then(result => {

			localStorage.setItem("token", result.access);
			let token = result.access
			// console.log(result.access)

			if(token){
				fetch('https://gentle-wave-67856.herokuapp.com/api/users/profile', 
					{
						method: "GET",
						headers: {
							"Authorization": `Bearer ${token}`
						}
					}
				)
				.then(result => result.json())
				.then(result => {
					console.log(result)

					localStorage.setItem("id", result._id);
					localStorage.setItem("isAdmin", result.isAdmin);

					window.location.replace('./profile.html');



				})

			}
		})
	}

})