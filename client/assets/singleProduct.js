
console.log(window.location.search);
let params = new URLSearchParams(window.location.search); 
//method of URLSearchParams
	//URLSearchParams.get()
console.log(params.id);
let productId = params.get('productId');
console.log(productId);

let name = document.querySelector('#name');
let description = document.querySelector('#description');
let price = document.querySelector('#price');
let productContainer = document.querySelector('#productContainer');

let token = localStorage.getItem('token');

fetch(`http://localhost:3000/api/products/${productId}`,
	{
		method: "GET",
		headers: {
			"Authorization": `Bearer ${token}`
		}
	}
)
.then( result => result.json())
.then( result => {

	console.log(result)	


	//to show course details
	name.innerHTML = result.name
	description.innerHTML = result.description
	price.innerHTML = result.price
	productContainer.innerHTML =
	`
		<button class="btn btn-primary btn-block" id="addToCart">Add to cart</button>
	`
	let addToCart = document.querySelector(`#addToCart`);

	addToCart.addEventListener("click",()=>{
		fetch(`http://localhost:3000/api/users/singleProduct`,
		{
			method:"POST",
			headers:{
				"Content-Type": "application/json",
				"Authorization":`Bearer ${token}`
			},
			body:JSON.stringify({
				productId:productId

			})
		}).then(result=> result.json())
		.then(result=>{
			// console.log(result)
			if(result){
				alert(`Item successfully added to cart`);
				window.location.replace(`./products.html`) 
			}
			else{
				alert(`Something went wrong`)
			}
		})
	})

})
