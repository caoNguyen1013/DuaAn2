var express = require('express');
var router = express.Router();

var Place = require('../model/place');

function bodauTiengViet(str) {
    str = str.toLowerCase();
    str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a");
    str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e");
    str = str.replace(/ì|í|ị|ỉ|ĩ/g, "i");
    str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o");
    str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u");
    str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y");
    str = str.replace(/đ/g, "d");
    str = str.replace(/ /g, "-");
    str = str.replace(/\./g, "-");
    return str;
}

/* GET home page. */
router.get('/',function(req, res, next) {
  res.redirect('/admin/place/danh-sach.html'); 
});

router.get('/danh-sach.html', function(req, res, next) {
	 Place.find().then(function(data){
		res.render('admin/place/danhsach', {data: data});
	});
  	
});

router.get('/them-place.html',function(req, res, next) {
  res.render('admin/place/them', { errors: null});
});


router.post('/them-place.html', function(req, res, next) {
  //res.render('admin/cate/them');
  req.checkBody('name', 'Giá Trị không được rổng').notEmpty();
  req.checkBody('name', 'Name 5 đến 32 ký tự').isLength({min:3, max:32});
  var errors = req.validationErrors();
	if (errors) {
	  res.render('admin/place/them',{errors : errors}); 
	}

	var place = new Place({
		name 			: req.body.name,
		nameKhongDau 	: bodauTiengViet(req.body.name)
	});

	place.save().then(function(){
		req.flash('success_msg', 'Đã Thêm Thành Công');
		res.redirect('/admin/place/them-place.html'); 
	});

  
});


router.get('/:id/sua-place.html', function(req, res, next) {
	Place.findById(req.params.id, function(err, data){
		res.render('admin/place/sua',{ errors: null, data: data});
	});	
});

router.post('/:id/sua-place.html',  function(req, res, next) {
	req.checkBody('name', 'Giá Trị không được rổng').notEmpty();
  	req.checkBody('name', 'Name 5 đến 32 ký tự').isLength({min:3, max:32});
  	var errors = req.validationErrors();
  	if(errors){
  		Place.findById(req.params.id, function(err, data){
			res.render('admin/place/sua',{ errors: errors, data: data});
		});	
  	}else{
  		Place.findById(req.params.id, function(err, data){
			data.name 			= req.body.name;
			data.nameKhongDau 	= bodauTiengViet(req.body.name);
			data.save();
			req.flash('success_msg', 'Đã Sửa Thành Công');
			res.redirect('/admin/place/'+req.params.id+'/sua-place.html');
		});
  	}

});

router.get('/:id/xoa-place.html',function(req, res, next) {
	
	Place.findById(req.params.id).remove(function() { 
		req.flash('success_msg', 'Đã Xoá Thành Công');
		res.redirect('/admin/place/danh-sach.html');
	});
});

// function checkAdmin(req, res, next){
   
//     if(req.isAuthenticated()){
//       next();
//     }else{
//       res.redirect('/admin/dang-nhap.html');
//     }
// }
module.exports = router;