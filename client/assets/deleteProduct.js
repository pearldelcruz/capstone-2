

// to delete products
let params = new URLSearchParams(window.location.search);
let productId = params.get('productId');
console.log(productId);

let token = localStorage.getItem('token');

fetch(`http://localhost:3000/api/products/${productId}/delete`,
	{
		method: "DELETE",
		headers: {
			"Authorization": `Bearer ${token}`
		}
	}
)
.then(result => result.json())
.then( result => {
	console.log(result)

	if (result) {
		alert(`Product Succesfully Deleted!`)
		window.location.replace(`./products.html`)
	} else {
		alert(`Something went wrong.`);
	}
})