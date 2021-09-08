

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
	// console.log(userData);
	

	userController.getProfile(userData.id).then(result => res.send(result))
})

//to retrieve all non-admin
router.get("/getNonAdmin", auth.verify, (req, res) => {

	userController.getNonAdmin().then( result => res.send(result))
})

//to switch user isAdmin false to true
router.put('/:userId/setAsAdmin', auth.verify,(req,res)=>{
	console.log(req.params.userId)

	userController.setAsAdmin(req.params.userId).then(result => res.send(result));
	
})


module.exports = router;