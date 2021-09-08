

const Product = require(`./../models/Products`);


//to add/create a product
module.exports.addProduct = (reqBody) =>{
	let newProduct = new Product({

		name: reqBody.name,
		description: reqBody.description,
		price: reqBody.price
	});
	return newProduct.save().then((data, error)=>{
		if (error){
			return error
		}
		else{
			return data
		}

	})
}

//to get ALL producs
module.exports.allProducts = () => {
	
	return Product.find().then( result => {
		return result
	})
}

//to get single item/product
module.exports.singleProduct = (params) => {

	console.log(params)
	return Product.findById(params.productId).then( (result) => {
	return result
	})
}

/*//to get all unarchived/active
module.exports.activeProduct = () => {

	return Product.find({isActive: true}).then( result => {
		
		return result
	})
}*/

