
const User = require(`./../models/Users`);
const Product = require(`./../models/Products`);
const bcrypt = require(`bcrypt`);


const auth = require(`./../auth`);

//email validation/checking if exist
module.exports.checkEmailExist = (reqBody) => {
	return User.find({email:reqBody.email}).then((result)=>{
		if (result.length != 0) {
			return true
		}
		else {
			return false
		}
	})
}

//user registration
module.exports.register = (reqBody) =>{
	let newUser = new User({
		firstName: reqBody.firstName,
		lastName: reqBody.lastName,
		email: reqBody.email,
		mobileNo: reqBody.mobileNo,
		password: bcrypt.hashSync(reqBody.password,10)
	});
	return newUser.save().then((savedUser, error)=>{
		if (error){
			return error
		}
		else{
			return true
		}
	})
}

//user login
module.exports.login =(reqBody) => {

	return User.findOne({email:reqBody.email}).then((result)=>{
		if(result == null){
			return false
		}
		else{
			const isPasswordCorrect = bcrypt.compareSync(reqBody.password, result.password)

			if (isPasswordCorrect === true) {

				return {access: auth.createAccessToken(result.toObject())}
			}
			else {
				return false
			}
		}
	})
}

//user profile
module.exports.getProfile = (data) =>{

	return User.findById(data).then(result => {
		result.password = "******"
		return result
	
	})
}

//to retrieve all users
module.exports.getAllUsers = ()=>{

	return User.find().then(result =>{
		return result

	})
}

//to switch user isAdmin false to true
module.exports.setAsAdmin = (params)=> {

	let userType1 = {
		isAdmin : true
	}

	return User.findByIdAndUpdate(params, userType1, {new: true}).then((result, error) => {
		if (error) {
			return false
		} else {
			return result
		}
	})
}


//to switch user isAdmin false to true
module.exports.unsetAsAdmin = (params)=> {

	let userType2 = {
		isAdmin : false
	}

	return User.findByIdAndUpdate(params, userType2, {new: true}).then((result, error) => {
		if (error) {
			return false
		} else {
			return true
		}
	})
}

//to place order
module.exports.addCart = async (data) => {

	const price = await Product.findById(data.productId).then(product => product.price)
	// console.log(price)

	//save user order
	const userSavedOrder = await User.findById(data.userId).then( user => {

		user.orders.push(
				{	
					productId: data.productId,
					totalOrderValue: price
				})

		return user.save().then( (user, error) => {
			// console.log(user)
			if(error){
				return false
			} else {
				return true
			}
		})
	})

	//save orders by users
	const orderByUsers = await Product.findById(data.productId).then( product => {
		
		product.orders.push(
			{
				userId: data.userId,
				totalOrderValue: price
			})

		return product.save().then( (product, error) => {
			// console.log(product)
			if(error){
				return false
			} else {
				return true
			}
		})
	})

	if(userSavedOrder && orderByUsers){
		return true
	} else {
		return false
	}
}



//get user's respective order
module.exports.myOrder = (data) =>{

	return User.findById(data).then(result => {
		
		return result.orders
	
	})
}

