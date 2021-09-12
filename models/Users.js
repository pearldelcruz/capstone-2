const mongoose = require(`mongoose`);

let userSchema = new mongoose.Schema(
	{
		firstName: {
			type: String,
			required:[true,`First name is required`]
		},
		lastName: {
			type: String,
			required:[true,`Last name is required`]
		},
		email: {
			type: String,
			required:[true,`Email is required`]
		},
		password: {
			type: String,
			required:[true,`Password is required`]
		},
		isAdmin: {
			type: Boolean,
			default: false
		},
		mobileNo: {
			type: String,
			required:[true,`Mobile number is required`]
		}/*,
		orders: 
		[{
			
			productId: {
				type: String,
				required: [true, `Order ID is required`]
			},
			unitPrice: {
				type: Number,
				required: [true, `Unit Price is required`]
			},
			qty: {
				type: Number,
				required: [true, `Quantity Price is required`]
			},
			totalUnitPrice: {
				type: Number,
				required: [true, `Total unit price is required`]
			},
			orderedOn: {
				type: Date,
				default: new Date()
			},
			isProductActive: {
				type: Boolean,
				default: true
			}
		}]
*/
	}
);
module.exports = mongoose.model(`User`, userSchema);