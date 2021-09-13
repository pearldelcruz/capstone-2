

let express = require(`express`);
const router = express.Router();

const orderController = require(`./../controllers/orderControllers`);
const auth = require(`./../auth`)


//to get all orders
router.get("/", auth.verify, (req, res) => {

	let userData = auth.decode(req.headers.authorization).isAdmin
		// console.log(userData)
	
	
	if (userData === false  ) {
		console.log ("Account not authorized")
	}

	else{
	// let userId = auth.decode(req.headers.authorization).id

	orderController.allOrders().then( result => res.send(result))
	}
})

//to get user's respective order
router.get(`/myOrder`, auth.verify,(req,res)=>{

	const userData = auth.decode(req.headers.authorization)
	orderController.myOrder(userData).then(result => res.send(result))
	
})



// })

// router.get(`/orders`, auth.verify, (req, res)=>{

// 	let userData = auth.decode(req.headers.authorization).isAdmin
// 	console.log(userData)
// 	if (userData === false || userData === null ) {
// 		console.log("User not authorized")
// 	}
// 	else {

// 	userController.orders().then(result => res.send(result));	
// 	}

// })

// to place order
router.post(`/checkout`, auth.verify,(req,res)=>{
	let userData = auth.decode(req.headers.authorization).isAdmin
		// console.log(userData)
	
	
	if (userData === false  ) {
		// let userId = auth.decode(req.headers.authorization).id
		// let productId = req.body.productId
	let data = {
		userId: auth.decode(req.headers.authorization).id,
		productId:req.body.productId,
		qty:req.body.qty
	}
	orderController.checkout(data).then(result => res.send(result))
	// console.log(data)
	}
	else{
		console.log("ADMIN ACCOUNT! Please login to a regular account to place order")
	}
	
})

module.exports = router;