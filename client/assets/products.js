
let token = localStorage.getItem("token");
let adminUser = localStorage.getItem("isAdmin") === "true";
let manageUsers = document.querySelector(`#manageUsers`)
let adminButton = document.getElementById('adminButton');
let cardFooter;


if(adminUser === false || adminUser === null){

	adminButton.innerHTML = null
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

fetch("http://localhost:3000/api/products/allProducts", 
	{
		method: "GET",
		headers: {
			"Authorization": `Bearer ${token}`
		}
	}
)
.then( result => result.json())
.then( result => {

		// let prodData;

		if(result.length < 1){

			prodData = `No Item Available`
			
		} else {

			prodData = result.map( (product) => {
				console.log(product);

				if(adminUser === false || !adminUser){

					cardFooter =
					`
						<a href="./singleProduct.html?productId=${product._id}" class="btn btn-success text-white btn-block selectButton">
							Select Item
						</a>
					`

				} else {
					
					if(product.isActive === true){
						cardFooter = 
						`
							<a href="./editProduct.html?productId=${product._id}" class="btn btn-primary text-white btn-block editButton">
								Edit Product
							</a>
							<a href="./archiveProduct.html?productId=${product._id}" class="btn btn-secondary text-white btn-block archiveButton">
								Archive Product
							</a>
							<a href="./deleteProduct.html?productId=${product._id}" class="btn btn-danger text-white btn-block deleteButton">
								Delete Product
							</a>
						`
					} else {
						cardFooter =
						`
							<a href="./unarchiveProduct.html?productId=${product._id}" class="btn btn-success text-white btn-block unarchiveButton">
								Unarchive Product
							</a>
						`
					}
				}

				return (
					`
						<div class="col-md-4 my-5 p-3">
							<div class="card">
								<div class="card-body">
									<h5 class="card-title">
										${product.name}
									</h5>
									<p class="card-text text-left">
										${product.description}
									</p>
									<p class="card-text text-right">
										${product.price}
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

		let container = document.querySelector('#productContainer');

		container.innerHTML = prodData
})
