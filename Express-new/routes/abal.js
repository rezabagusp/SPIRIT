var express = require('express'),
    router = express.Router(),
    path = require('path'),
    multer  = require('multer'),
    storage = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, 'public/images');
    },
    filename: function (req, file, callback) {
    let ext = path.extname(file.originalname);
        callback(null, `${Math.random().toString(36).substring(7)}${ext}`);
    }
  }),
  upload = multer({ storage : storage, 
    fileFilter: function (req, file, callback) {
      var ext = path.extname(file.originalname);
        if(ext !== '.png' && ext !== '.jpg' && ext !== '.gif' && ext !== '.jpeg') {
            return callback(new Error('Only images are allowed'))
        }
        callback(null, true);
    }
  });
/* GET home page. */
router.post('/', function(req, res, next) {
  console.log(req);
});

module.exports = router;
