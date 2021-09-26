
let token = localStorage.getItem("token");
let adminUser = localStorage.getItem("isAdmin") === "true";
// let manageUsers = document.querySelector(`#manageUsers`)
// let adminButton = document.querySelector('#adminButton');
let cardFooter;

/*if(adminUser === false || adminUser === null){

	manageUsers.innerHTML = null
} else {

	adminButton.innerHTML =
	`
		<div class="col-md-2 offset-md-10">
			<a href="./addProduct.html" class="btn btn-block btn-primary">
				Add Product
			</a>
		</div>
	`
	manageUsers.innerHTML = 
	`
		<a href="./users.html" class="nav-link"> Manage Users </a>
	`
}
*/
fetch("https://gentle-wave-67856.herokuapp.com/api/users/getAllUsers", 
	{
		method: "GET",
		headers: {
			"Authorization": `Bearer ${token}`
		}
	}
)
.then( result => result.json())
.then( result => {

		// let userData;

		console.log(result)

		if(result.length < 1){

			userData = `No registered users`
			
		} else {

			userData = result.map( (users) => {
				console.log(users);


				// if(adminUser === false || !adminUser){
				// 	cardFooter = null
				// } 
				// else {
					
					if(users.isAdmin == true){
						cardFooter =

						`
							<a href="./unsetAsAdmin.html?userId=${users._id}" class="btn btn-danger text-white btn-block removeAdminButton">
								Remove as admin
							</a>
						`
					} else {
						cardFooter =
						`
							<a href="./setAsAdmin.html?userId=${users._id}" class="btn btn-success text-white btn-block setAsAdminButton">
								Set as admin
							</a>
													
						`
					}
				// }
			

				return (
					`
						<div class="col-md-4 my-2 text-center">
							<div class="card">
								<div class="card-body">
									<h5 class="card-title">
										${users.firstName + " " + users.lastName}
									</h5>
									<p class="card-text text-center">
										${users.email}
									</p>
								</div>
								<div class="card-footer">
									${cardFooter}
								</div>
							</div>
						</div>
					`
				)
			}).join('');
		}

		let container = document.querySelector('#userContainer');

		container.innerHTML = userData
})
