

let regForm = document.querySelector(`#registerUser`);


regForm.addEventListener("submit",(event) =>{

		event.preventDefault();
	let firstName = document.getElementById(`firstName`).value;
	let lastName = document.getElementById(`lastName`).value;
	let mobileNo = document.getElementById(`mobileNo`).value;
	let email = document.getElementById(`email`).value;
	let password = document.getElementById(`password`).value;
	let password2 = document.getElementById(`password2`).value;

	if( 
		password === password2 && mobileNo.length === 11 && password !== "" && password2 !== "" ){

		// fetch(<url>, {options}).then()
		fetch("http://localhost:3000/api/users/checkEmail", 
			{
				method: "POST",
				headers: {
					"Content-Type": "application/json"
				},
				body: JSON.stringify({
					email: email
				})

			}
		)
		.then(result => result.json())
		.then(result => {
			//result === false
				//means this can be saved in the database

			// console.log(result)
			if(result === false){
			
				fetch("http://localhost:3000/api/users/register",
					{
						method: "POST",
						headers: {
							"Content-Type": "application/json"
						},
						body: JSON.stringify({
							firstName: firstName,
							lastName: lastName,
							mobileNo: mobileNo,
							email: email,
							password: password
						})
					}
				)
				.then( result => result.json())
				.then( result => {
					
					if(result === true){
						alert("Registration successfully completed");

						window.location.replace('./login.html');
					} else {
						alert("Something went wrong");
					}
				})
				
			} else {

				alert("Email already exists");
			}

		})


	}
	

});

