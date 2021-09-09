
const express = require('express');
const router = express.Router();
let auth = require('./../auth');
const User = require(`./../models/Users`);

const productControllers = require('./../controllers/productControllers');



//to add/create a product
router.post("/addProduct", auth.verify, (req, res) => {

	let userData = auth.decode(req.headers.authorization)
	console.log(userData)
	let userType = userData.isAdmin
	console.log(userType)
	if (userType === false || userType === null ) {
		console.log("User not authorized to create product")
	}
	else {
	productControllers.addProduct(req.body).then( result => res.send(result))
	}
})

//to get ALL producs
router.get("/allProducts", (req, res) => {

	productControllers.allProducts().then( result => res.send(result))
})

//to get single item/product
router.get("/:productId", (req, res) => {

	productControllers.singleProduct(req.params).then( result => res.send(result))
})

// to get all unarchived/active products

router.get("/activeProduct", (req, res) => {

	productControllers.activeProduct().then( result => res.send(result))
})

// edit product details

router.put("/:productId/edit", auth.verify, (req, res) => {

let userData = auth.decode(req.headers.authorization)
	console.log(userData)
	let userType = userData.isAdmin
	console.log(userType)
	if (userType === false || userType === null ) {
		console.log("User not authorized to perform action")
	}
	else {

	productControllers.editProduct(req.params.productId, req.body).then( result => res.send(result))
	}
})


//to archive products

router.put('/:productId/archive', auth.verify,(req,res)=>{
	let userData = auth.decode(req.headers.authorization)
		console.log(userData)
	let userType = userData.isAdmin
		console.log(userType)
		if (userType === false || userType === null ) {
			console.log("User not authorized to perform action")
		}
		else {
		productControllers.archive(req.params.productId).then(result => res.send(result));
		}

})

//to unarchive products

router.put('/:productId/unarchive', auth.verify,(req,res)=>{
	let userData = auth.decode(req.headers.authorization)
		console.log(userData)
	let userType = userData.isAdmin
		console.log(userType)
		if (userType === false || userType === null ) {
			console.log("User not authorized to perform action")
		}
		else {
	productControllers.unarchive(req.params.productId).then(result => res.send(result));
	}

})


module.exports = router;


