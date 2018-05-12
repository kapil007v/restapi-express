const express = require('express');
const router = express.Router();
const Product = require('../models/product');
const mongoose = require('mongoose');
const checkAuth = require('../middleware/check-auth');

router.get('/',(req,res,next)=>{
	Product.find().exec().then(doc=>{
		res.status(200).json({
			products:doc
		});
	}).catch(err=>{
		console.log("No Data Found",err);
	});
});
router.post('/',checkAuth,(req,res,next)=>{
	const product = new Product({
		_id : new mongoose.Types.ObjectId(),
		name :req.body.name,
		price : req.body.price,
	});
	product.save().then(result => {
      console.log(result);
      res.status(201).json({
        message: "Handling POST requests to /products",
        createdProduct: result
      });
    });
	res.status(200).json({
		"msg":"post products",
		createdPorduct : product
	})
});
router.put('/:id',(req,res,next)=>{
	res.status(200).json({
		"msg":"put products"
	})
});
router.get('/:id',(req,res,next)=>{
	var id = req.params.id;
	Product.findById(id).exec().then(doc=>{
		console.log("GET DATA ");
		if(doc){
			res.status(200).json(doc);
		}else
		{
			res.status(404).json({
				error:"ID NOT FOUND "
			});
		}	
	}).catch(err =>{
		console.log(err);
		res.status(500).json({error:err});
	});
});

router.delete('/:id',(req,res,next)=>{
	var id = req.params.id;
		res.status(200).json({
			message:`Delete product id is ${id} `
		});
});

module.exports = router;