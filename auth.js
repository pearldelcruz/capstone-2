let jwt = require(`jsonwebtoken`);
let secret = "ecommerceAPI";

// create token
module.exports.createAccessToken = (user) => {

	const data = {
		id: user._id,
		email: user.email,
		isAdmin: user.isAdmin
	}

	return jwt.sign(data, secret, {});
}

// to verify token
module.exports.verify = (req, res, next) => {
	let token = req.headers.authorization

		console.log(token);

	if(typeof token !== "undefined"){
		token = token.slice(7,token.length);

		// console.log(token);
		return jwt.verify(token, secret, (error, data) =>{
			if(error){
				return res.send({auth:`failed`})
			}
			else {
				next();
			}
		})


	}

}

//to decode token

module.exports.decode = (token) => {
		if(token !== "undefined"){
			token = token.slice(7)
			// return jwt.decode(token, {complete:true,header:true}).payload;
			return jwt.verify(token, secret, (error, data) =>{
				if(error){
					return res.send({auth:`failed`})
				}
				else {
					return jwt.decode(token, {complete:true,header:true}).payload;
				}
			})
			
		}
		else {
			return null
		}
}
// decode(req.headers.authorization)