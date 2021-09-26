
//target the form
let addProduct = document.querySelector('#addProduct');
let token = localStorage.getItem(`token`);


//listen to event submit
addProduct.addEventListener("submit", (event) => {
	event.preventDefault();

let name = document.querySelector('#name').value
let price = document.querySelector('#price').value
let description = document.querySelector('#description').value

	if(name !== "" && price !== "" && description !== ""){
	//use fetch to send the data to the server
	// 
		fetch("https://gentle-wave-67856.herokuapp.com/api/products/addProduct", 
			{
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					"Authorization": `Bearer ${token}`
				},
				body: JSON.stringify({
					name: name,
					price: price,
					description: description
				})
			}
		)
		.then( result => result.json())
		.then( result => {
			console.log(result)

			if(result){
				alert("Product succesfully saved");

				window.location.replace('./products.html')
			} else {
				alert("Failed to add item. Something went wrong.")
			}

		})
	}

})
