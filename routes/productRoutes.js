
const express = require('express');
const router = express.Router();
let auth = require('./../auth');

const productControllers = require('./../controllers/productControllers');

//to add/create a product
router.post("/addProduct", auth.verify, (req, res) => {

	productControllers.addProduct(req.body).then( result => res.send(result))
})

//to get ALL producs
router.get("/allProducts", auth.verify, (req, res) => {

	productControllers.allProducts().then( result => res.send(result))
})

//to get single item/product
router.get("/:productId", auth.verify, (req, res) => {

	productControllers.singleProduct(req.params).then( result => res.send(result))
})

/*//to get all unarchived/active
router.get('/activeProduct', (req, res) => {

	productControllers.activeProduct().then( result => res.send(result));
})
*/
module.exports = router;
