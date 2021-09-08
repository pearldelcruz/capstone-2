
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

module.exports.getNonAdmin = ()=>{

	return User.find({isAdmin: false}).then(result =>{
		return result
	})
}

//to switch user isAdmin false to true
module.exports.setAsAdmin = (params)=> {

	let updatedUserType = {
		isAdmin : false
	}

	return User.findByIdAndUpdate(params, updatedUserType, {new: true}).then((result, error) => {
		if (error) {
			return false
		} else {
			return result
		}
	})
}
