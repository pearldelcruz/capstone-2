const Order = require(`./../models/Orders`);
const Product = require(`./../models/Products`);
const User = require(`./../models/Users`);

const auth = require(`./../auth`);

//get orders
module.exports.allOrders = () => {
	
	return Order.find().then( result => {
		return result

	})
}

//to get user's respective order
module.exports.myOrder = (data) =>{
	// console.log(data)
	let userId = data.id
	return Order.find({userId}).then( (result) => {
    return result
	})
}

// module.exports.myOrder = (data) =>{

// 	return User.findById(data).then(result => {
	
// 	})
// }


//create order
module.exports.checkout = async (data) =>{
	let user = data.userId;
	let userId = await Order.find({ user });
	var x = JSON.parse(JSON.stringify(userId));
	//console.log(x[0].userId);
	//console.log(x.length);
	//console.log(x[1].products);
	var isExist = false;
	var uidIndex;
	for(i=0; i < x.length; i++){
		if(x[i].userId==user){
			isExist = true;
			break;
		}
	}
	//console.log(isExist);

	if(isExist){
		var isUpdate = false;
		//if existing, search for product first
		let prod = data.productId;
		let userIdE = await Order.find({ user });
		var y;
		var userString = JSON.parse(JSON.stringify(userIdE));
		for(i=0; i < x.length; i++){
			if(x[i].userId==user){
				y = JSON.parse(JSON.stringify(x[i].products));
				for(j=0; j< y.length; j++){
					if(y[j].productId == prod){
						isUpdate = true;
						//console.log(y[j].name);
						//console.log(x[i]._id);
						let hehe = x[i]._id;

						/*return Product.findById(data.productId).then(result=>{
							let updatedProduct = {
								qty : data.qty,
								totalUnitPrice : data.qty * result.price
							};
							return Order.findByIdAndUpdate(hehe, updatedProduct, {new: true}).then((result, error) => {
								if(error){
									return error;
								} else {
									return result;
								}
							});
						});*/
						
						return Order.findByIdAndDelete(hehe).then(result =>{
							return Product.findById(data.productId).then(result =>{
								const newOrder = new Order ({
								    userId: data.userId,
								    products: 
								    	[{
											productId: result._id,
										    qty: data.qty,
										    name: result.name,
										    unitPrice: result.price,
										    totalUnitPrice: data.qty * result.price
										}]
								});

							  	return newOrder.save().then((data,error)=>{
									if (error){
										return error
									}
									else {
										return data
									}
								});
					  		});
						});
						

					}
				}
			}
		}
		if(!isUpdate){
			return Product.findById(data.productId).then(result =>{
				const newOrder = new Order ({
				userId: data.userId,
				products: 
				   	[{
						productId: result._id,
					    qty: data.qty,
					    name: result.name,
					    unitPrice: result.price,
					    totalUnitPrice: data.qty * result.price
					}]
				});

			  	return newOrder.save().then((data,error)=>{
					if (error){
						return error
					}
					else {
						return data
					}
				});
			});
			isUpdate = false;
		}

		

	}else{
		//create order if user is not existing in order table
		return Product.findById(data.productId).then(result =>{
			const newOrder = new Order ({
			    userId: data.userId,
			    products: 
			    	[{
						productId: result._id,
					    qty: data.qty,
					    name: result.name,
					    unitPrice: result.price,
					    totalUnitPrice: data.qty * result.price
					}]
			});

		  	return newOrder.save().then((data,error)=>{
				if (error){
					return error
				}
				else {
					return data
				}
			});
  		});
	}
	
}