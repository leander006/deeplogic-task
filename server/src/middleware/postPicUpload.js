const multer = require('multer')

const storage = multer.diskStorage({
      destination:function(req,file,cb){
            cb(null,'./uploads/');
      },
      filename:function(req,file,cb){
            cb(null,new Date().toISOString()+file.originalname)
      }
});

const fileFilter =(req,file,cb) =>{
      if(file.mimetype === 'video/mp4' || file.mimetype === 'image/png' ||file.mimetype === 'image/jpeg' ){
            cb(null,true)
      }
      else{
            cb(new Error("Can only upload image and video"),false)
      }
}

const uploadPost = multer({
      storage:storage,
      limits:{
            fieldSize:1024 * 1024 * 5
      },
      fileFilter:fileFilter
});


module.exports = {
	uploadPost
};