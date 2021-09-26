
let token = localStorage.getItem('token')

let name = document.querySelector('#name');
let email = document.querySelector('#email');
let mobileNo = document.querySelector('#mobileNo');
let editButton = document.querySelector('#editButton');
let enrollmentContainer = document.querySelector(`#enrollContainer`);

let adminUser = localStorage.getItem("isAdmin") === "true";
let manageUsers = document.querySelector(`#manageUsers`)
// let adminButton = document.querySelector('#adminButton');
let cardFooter;

if(adminUser === false || adminUser === null){

	manageUsers.innerHTML = null
} else {

	/*adminButton.innerHTML =
	`
		<div class="col-md-2 offset-md-10">
			<a href="./addProduct.html" class="btn btn-block btn-primary">
				Add Product
			</a>
		</div>
	`*/
	manageUsers.innerHTML = 
	`
		<a href="./users.html" class="nav-link"> Manage Users </a>
	`
}

fetch('https://gentle-wave-67856.herokuapp.com/api/users/profile',
	{
		method: "GET",
		headers: {
			"Authorization": `Bearer ${token}`
		}
	}
)
.then(result => result.json())
.then( result => {
	console.log(result)

	/*if(result){
		name.innerHTML = `${result.firstName} ${result.lastName}`
		email.innerHTML = result.email
		mobileNo.innerHTML = result.mobileNo
		editButton.innerHTML =
		`
			<div class="mb-2">
				<a href="./editProfile.html" class="btn btn-primary">Edit Profile</a>
			</div>
		`
		result.enrollments.forEach((course)=>{
			// console.log(course)
			let courseId = course.courseId
			fetch(`http://localhost:3000/api/courses/${courseId}`,
			{
				method:"GET",
				headers:{
					"Authorization": `Bearer ${token}`
				}
			}).then(result=> result.json())
				.then(result => {
					console.log(result)
					if (result) {
						enrollContainer.innerHTML =
						`
						<div class="card my-5">
							<div class"card-body">
								<h4 class="card-title">${result.courseName}</h4>
								<p class="card-title">${result.courseDesc}</p>
								<h5 class="card-title">${course.enrolledOn}</h4>
								<p class="card-title">${course.status}</p>
							</div>
						</div>
						`
					}
					else{
						alert(`Something went wrong`)
					}
				})

		})
	}*/

})
