

const Product = require(`./../models/Products`);
// const User = require(`./../models/Users`);



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

// get all active product
module.exports.activeProducts = () => {
	
	return Product.find({isActive:true}).then( result => {
		return result
	})	
}

//to get single item/product
module.exports.singleProduct = (params) => {

	// console.log(params)
	return Product.findById(params.productId).then( (result) => {
	return result
	})
}


//to edit course
module.exports.editProduct = (params, reqBody) => {
	// console.log(params)

	let updatedProduct = {
		name: reqBody.name,
		description: reqBody.description,
		price: reqBody.price
	}

	return Product.findByIdAndUpdate(params, updatedProduct, {new: true})
	.then((result, error) => {
		if(error){
			return error
		} else {
			return result
		}
	})
}


//to archive products
module.exports.archive = (params)=> {

	let archiveProduct = {
		isActive : false
	}

	return Product.findByIdAndUpdate(params, archiveProduct, {new: true}).then((result, error) => {
		if (error) {
			return false
		} else {
			return true
		}
	})
}

//to unarchive products
module.exports.unarchive = (params)=> {

	let unarchiveProduct = {
		isActive : true
	}

	return Product.findByIdAndUpdate(params, unarchiveProduct, {new: true}).then((result, error) => {
		if (error) {
			return false
		} else {
			return true
		}
	})
}

// to delete product
module.exports.deleteProduct = (params)=> {

	return Product.findByIdAndDelete(params).then((result, error) => {
		if (error) {
			return false
		} else {
			return true
		}
	})
}

