
let params = new URLSearchParams(window.location.search);
let userId = params.get('userId');
console.log(userId);

let token = localStorage.getItem('token');

fetch(`https://gentle-wave-67856.herokuapp.com/api/users/${userId}/remove-admin-access`,
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

	if (result) {
		
		alert(`User role has been updated`)
		window.location.replace(`./users.html`)
	} else {
		alert(`Something went wrong.`);
	}
})