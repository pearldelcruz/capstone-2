const express = require(`express`);
const mongoose = require(`mongoose`);
const PORT = process.env.PORT || 4000;

let app = express();
const cors = require(`cors`);


//routes

let userRoutes = require(`./routes/userRoutes`)
let productRoutes = require(`./routes/productRoutes`)
// let orderRoutes = require(`./routes/orderRoutes`)


// middleware
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cors());

mongoose.connect(`mongodb+srv://zuittDBBatch125:70pez0265@cluster0.l6bhm.mongodb.net/e-commerce?retryWrites=true&w=majority`,
	{
			useNewUrlParser:true,
			useUnifiedTopology:true
		}).then(()=> {
			console.log(`Connected to Database.`);
		}).catch((error)=> {
			console.log(error);
		});

app.use(`/api/users`, userRoutes);
app.use(`/api/products`, productRoutes);
// app.use(`/api/orders`, orderRoutes);
app.listen(PORT,()=>console.log(`Server is running on port ${PORT}`));
