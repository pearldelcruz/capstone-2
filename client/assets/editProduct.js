
let editForm = document.querySelector('#editProduct');

let params = new URLSearchParams(window.location.search);
console.log(params)
let productId = params.get('productId');
console.log(productId);

let token = localStorage.getItem('token');

let name = document.querySelector('#name');
let description = document.querySelector('#description');
let price = document.querySelector('#price');

fetch(`http://localhost:3000/api/products/${productId}`,
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

	name.value = result.name
	price.value = result.price
	description.value = result.description
})


editForm.addEventListener("submit", (event) => {
	event.preventDefault()

	name = name.value
	description = description.value
	price = price.value

	fetch(`http://localhost:3000/api/products/${productId}/edit`,
		{
			method: "PUT",
			headers: {
				"Content-Type": "application/json",
				"Authorization": `Bearer ${token}`
			},
			body: JSON.stringify({
				name: name,
				description: description,
				price: price
			})
		}
	)
	.then(result => result.json())
	.then( result => {
		console.log(result)

		if(result !== "undefined"){
			alert(`Product details updated`)

			window.location.replace('./products.html')
		} else {
			alert("Something went wrong")
		}
	})
})
