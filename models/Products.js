const mongoose = require(`mongoose`);

let productSchema = new mongoose.Schema({
	name:{

		type:String,
		required:[true, `Product name is required`]
	},
	description:{

		type:String,
		required:[true, `Description is required`]
	},
	price:{

		type:Number,
		required:[true, `Price is required`]
	},
	isActive:{

		type:Boolean,
		default: true
	},
	createdOn:{

		type:Date,
		default: new Date()
	},
	orders:[
		{
			userId:{

				type:String,
				required:[true, `User ID is required`]
			},
			orderedOn:{

				type:Date,
				default: new Date()
			}
		
		}]

});


module.exports = mongoose.model(`Product`, productSchema);