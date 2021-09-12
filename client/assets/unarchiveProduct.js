

//to unarchive products
let params = new URLSearchParams(window.location.search);
let productId = params.get('productId');
console.log(productId);

let token = localStorage.getItem('token');

fetch(`http://localhost:3000/api/products/${productId}/unarchive`,
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
		alert(`Product Succesfully Unarchived!`)
		window.location.replace(`./products.html`)
	} else {
		alert(`Something went wrong.`);
	}
})