var express = require('express');
var router = express.Router();

var Place = require('../model/place');
var Product = require('../model/Product.js');
var GioHang = require('../model/giohang.js');
var Cart = require('../model/Cart.js');
var User = require('../model/User');

const { ensureAuthenticated, forwardAuthenticated } = require('../middleware/auth');

var countJson = function(json){
	var count = 0;
	for(var id in json){
			count++;
	}

	return count;
}
// Welcome Page
// router.get('/', forwardAuthenticated, (req, res) => res.render('welcome'));
router.get('/site/page/account', function(req, res){
	res.render('site/page/account');
})
/* GET home page. */
router.get('/',  function (req, res) {
	Product.find().then(function(product){
		Place.find().then(function(place){	
				res.render('site/page/index',{ user :req.user, product: product, place: place});
		});
	});
});
router.get('/place/:name.:id.html', function (req, res) {

	Product.find({placeId: req.params.id}, function(err, data){
		Place.find().then(function(place){
			res.render('site/page/place',{product: data, place: place});
		});
	});
});
// tìm kiếm theo tên 
router.get("/search", function(req, res){
    if(req.query.search) {
        const regex = new RegExp(escapeRegex(req.query.search), 'gi');
        // Get all campgrounds from DB
        Product.find({name: regex}, function(err, product){
            Place.find().then(function(place){      
                if(err){
                    console.log(err);
                } else {
                   res.render("site/page/index",{product: product,place : place});
                }
             });
        });
         
    } else {
        // Get all campgrounds from DB
        Product.find({}, function(err, product){
            Place.find().then(function(place){      
                if(err){
                    console.log(err);
                } else {
                   res.render("site/page/index",{product:product, place : place});
                }
             });
            });
    }
});
function escapeRegex(text) {
    return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
};
router.get('/chi-tiet/:name.:id.:place.html', function (req, res) {
	Product.findById(req.params.id).then(function(data){
		Product.find({placeId: data.cateId, _id: {$ne: data._id}}).limit(4).then(function(pro){
			res.render('site/page/chitiet', {data: data, product: pro});
		});
	});
   
});



router.post('/dat-phong.html',ensureAuthenticated, function (req, res) {
	var giohang = new GioHang( (req.session.cart) ? req.session.cart : {items: {}} );
	var data = giohang.convertArray();
	
	var cart = new Cart({
		  name 		:  req.body.name,
		  email 	: req.body.email,
		  sdt 		: req.body.phone,
		  msg 		: req.body.message,
		  cart 		: data,
		  st 		: 0
	});

	cart.save().then(function(){
		req.session.cart = {items: {}};
		res.redirect('/');
	});
	
});



router.get('/dat-phong.html',ensureAuthenticated, function (req, res) {
	var giohang = new GioHang( (req.session.cart) ? req.session.cart : {items: {}} );
	//var data = giohang.convertArray();
	
	if(req.session.cart){
		if(countJson(req.session.cart.items) > 0){
			res.render('site/page/check', {errors: null});
		}else res.redirect('/');
		
	}else{
		res.redirect('/');
	}
});





router.post('/menu', function (req, res) {
 	Place.find().then(function(data){
 		 res.json(data);
 	});
});

router.get('/add-cart.:id', function (req, res) {
	var id = req.params.id;

	var giohang = new GioHang( (req.session.cart) ? req.session.cart : {items: {}} );
	
	Product.findById(id).then(function(data){
		giohang.add(id, data);
		req.session.cart = giohang;
		res.redirect('/gio-hang.html');
	});

   
});

router.get('/gio-hang.html', function (req, res) {
	var giohang = new GioHang( (req.session.cart) ? req.session.cart : {items: {}} );
	var data = giohang.convertArray();

   	res.render('site/page/cart', {data: data});
});

router.post('/updateCart', function (req, res) {
	var id 			= req.body.id;;
	var soluong 	= req.body.soluong;
	var giohang 	= new GioHang( (req.session.cart) ? req.session.cart : {items: {}} );

	giohang.updateCart(id, soluong);
	req.session.cart = giohang;
	res.json({st: 1});
	
});

router.post('/delCart', function (req, res) {
	var id 			= req.body.id;
	var giohang 	= new GioHang( (req.session.cart) ? req.session.cart : {items: {}} );

	giohang.delCart(id);
	req.session.cart = giohang;
	res.json({st: 1});
	
});

router.get('/test', function (req, res) {
   res.send('a');
});


function escapeRegex(text) {
    return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
};
router.get("/search", function(req, res){
    if(req.query.search) {
        const regex = new RegExp(escapeRegex(req.query.search), 'gi');
        // Get all campgrounds from DB
        Product.find({name: regex}, function(err, product){
            Place.find().then(function(place){      
                if(err){
                    console.log(err);
                } else {
                   res.render("site/page/index",{product: product,place : place});
                }
             });
        });
         
    } else {
        // Get all campgrounds from DB
        Product.find({}, function(err, product){
            Place.find().then(function(place){      
                if(err){
                    console.log(err);
                } else {
                   res.render("site/page/index",{product:product, place : place});
                }
             });
            });
    }
});

module.exports = router;
