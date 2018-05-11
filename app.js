const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser')
const mongoose = require('mongoose');



const productRoutes = require('./api/routes/products');
const userRoutes = require('./api/routes/users');


// mongoose.connect('mongodb+srv://kapilvishwakarma26%40gmail.com:ksvksv%40007@cluster0-mc751.mongodb.net/test?retryWrites=true');
mongoose.connect('mongodb://localhost:27017');


app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());


app.use((req,res,next)=>{
	res.header('Access-Control-Allow-Origin',"*");
	res.header('Access-Control-Allow-Headers','Origin, X-Requested-With, Content-Type,Accept,Authorization');
	if(req.method === 'OPTIONS'){
		res.header('Access-Controll-Allow-Methods',"PUT,POST,PATCH,DELETE,GET");
		return res.status(200).json({});
	}
	next();
});
//handles routes middlware
app.use('/products', productRoutes);
app.use('/user', userRoutes);

app.use((req,res,next)=>{
	const error = new Error('Not Found');
	error.status = 404;
	next(error); 
})
app.use((error,req,res,next)=>{
	res.status(error.status || 500);
	res.json({
		error:{
			messgae:error.message
		}

	})
})
module.exports = app;