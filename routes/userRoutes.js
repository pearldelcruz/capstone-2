

let express = require(`express`);
const router = express.Router();

const userController = require(`./../controllers/userControllers`);
const auth = require(`./../auth`)


router.post(`/checkEmail`,(req,res)=>{

	userController.checkEmailExist(req.body).then(result =>res.send(result)
	);
})


//user registration
router.post(`/register`,(req,res)=>{

	userController.register(req.body).then(result =>res.send(result)
	);

})

//user login
router.post(`/login`,(req,res)=>{


	userController.login(req.body).then(result =>res.send(result)
	);
})

// user profile

router.get(`/profile`, auth.verify,(req,res)=>{

	const userData = auth.decode(req.headers.authorization)
	// console.log(userData.firstName);
	

	userController.getProfile(userData.id).then(result => res.send(result))
})

/*//to retrieve all non-admin
router.get("/getNonAdmin", auth.verify, (req, res) => {

	userController.getNonAdmin().then( result => res.send(result))
})*/

//to retrieve all users
router.get("/getAllUsers", auth.verify, (req, res) => {

	let userData = auth.decode(req.headers.authorization).isAdmin
	// console.log(userData)
			// let userType = userData.isAdmin
			// console.log(userType)
	if (userData === false || userData === null ) {
		console.log("User not authorized")
	}
	else {
	userController.getAllUsers().then( result => res.send(result))
	}
})

//to switch user isAdmin true to false
router.put('/:userId/setAsAdmin', auth.verify,(req,res)=>{
	// console.log(req.params.userId)

	let userData = auth.decode(req.headers.authorization).isAdmin
	// console.log(userData)
			/*let userType = userData.isAdmin
			console.log(userType)*/
	if (userData === false || userData === null ) {
		console.log("User not authorized")
	}
	else {

	userController.setAsAdmin(req.params.userId).then(result => res.send(result));
	}
})

//to switch user isAdmin false to true
router.put('/:userId/remove-admin-access', auth.verify,(req,res)=>{
	// console.log(req.params.userId)

	let userData = auth.decode(req.headers.authorization).isAdmin
	// console.log(userData)
	// let userType = userData.isAdmin
	// console.log(userType)
	if (userData === false || userData === null ) {
		console.log("User not authorized")
	}
	else {
	userController.unsetAsAdmin(req.params.userId).then(result => res.send(result));
	}

})


//----Orders -----//

/*//to place order
router.post(`/checkout`, auth.verify,(req,res)=>{
	let userData = auth.decode(req.headers.authorization).isAdmin
		console.log(userData)
	
	
	if (userData === false  ) {
	let data = {
		userId: auth.decode(req.headers.authorization).id,
		productId:req.body.productId
	}
	userController.checkout(data).then(result => res.send(result))
	// console.log(data)
	}
	else{
		console.log("ADMIN: Please login to a regular account to place order")
	}
	
})


//check order

router.get(`/myOrder`, auth.verify, (req, res)=>{

	userController.myOrder(req.params.userId).then(result => res.send(result));	

})

router.get(`/orders`, auth.verify, (req, res)=>{

	let userData = auth.decode(req.headers.authorization).isAdmin
	console.log(userData)
	if (userData === false || userData === null ) {
		console.log("User not authorized")
	}
	else {

	userController.orders().then(result => res.send(result));	
	}

})*/



module.exports = router;