const multer = require('multer')

const storage = multer.diskStorage({
      destination:function(req,file,cb){
            cb(null,'./uploadProfile/');
      },
      filename:function(req,file,cb){
            cb(null,new Date().toISOString()+file.originalname)
            console.log("original name ",file);
      }
});

const fileFilter =(req,file,cb) =>{
      if(file.mimetype === 'image/jpeg' || file.mimetype === 'image/jpg' ||file.mimetype === 'image/jpeg' ){
            cb(null,true)
      }
      else{
            cb(new Error("Can only upload image"),false)
      }
}

const upload = multer({
      storage:storage,
      limits:{
            fieldSize:1024 * 1024 * 5
      },
      fileFilter:fileFilter
});


module.exports = {
	upload
};