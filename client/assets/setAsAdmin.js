
let params = new URLSearchParams(window.location.search);
let userId = params.get('userId');
console.log(userId);

let token = localStorage.getItem('token');

fetch(`http://localhost:3000/api/users/${userId}/setAsAdmin`,
	{
		method: "PUT",
		headers: {
			"Authorization": `Bearer ${token}`
		}
	}
)
.then(result => result.json())
.then( result => {
	console.log(result)

	if (result === true) {
		alert(`User account set to admin`)
		window.location.replace(`./users.html`)
	} else {
		alert(`Something went wrong.`);
	}
})