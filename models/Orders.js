const mongoose = require(`mongoose`);

let orderSchema = new mongoose.Schema(
	{
			userId: {
			  type: String,
			  required: [true, `User ID is required`]
			},
			products: 
				[{
				    productId: String,
				    qty: Number,
				    name: String,
				    unitPrice: Number,
				    totalUnitPrice: Number
				  }],
			orderedOn: {
				type: Date,
				default: new Date()
			},
			isProductActive: {
				type: Boolean,
				default: true
			}
});


module.exports = mongoose.model(`Order`, orderSchema);

