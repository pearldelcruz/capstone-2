
const Order = require(`./../models/Orders`);
const Product = require(`./../models/Products`);
const User = require(`./../models/Users`);

const auth = require(`./../auth`);


//to get all orders
module.exports.allOrders = () => {
	
	return Order.find().then( result => {
		return result

	})
}
//to place order
module.exports.checkout =  async (data) => {

	
		//returns document containing userId
		let user = data.userId
		let userId = await Order.find({ user });
	   // console.log(userId)

	   
	   // returns all document containing the same productId
		let product = data.productId
		let productId = await Order.find({user,product});
		var x = JSON.parse(JSON.stringify(productId));
		//console.log(x[0].name);
	 	//console.log(productId);
		//const order = await Order.find({userId, product});
		//console.log(order);
	 try {
	 	
	   	//console.log(productId)

	   	// let a = Order.find({$and:userId,productId})
		const order = await Order.find({userId, product});
	    //let i = order.indexOf(a)
	    console.log(order)
	    //console.log(a)
	    //console.log(order.products.productId)

	    if (order) {
	      //cart exists for user
	      /*let i = order.products.findIndex();

	      console.log(i)

	      if (i > -1) {
	        //product exists in the cart, update the quantity
	        let productItem = order.products[i];
	        productItem.qty = qty;
	        order.products[i] = productItem;
	      } else {
	        //product does not exists in cart, add new item
	        order.products.push({ productId, qty, name, totalUnitPrice });
	      }
	      order = await order.save();
	      return res.send(order);*/
	    } else {
	      //no cart for user, create new cart
	      // const newOrder = await Order.create({
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
  					})

/*	      return res.send(newOrder);*/
	    }
	  } catch (err) {
	    console.log(err);
	    //res.send("Something went wrong");
	  }
	
}

