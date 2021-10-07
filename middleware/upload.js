const multer = require('multer');

const upload = multer({
  storage: multer.diskStorage({
    destination(req, file, cb) {
      cb(null, './uploads')
    },
    filename(req, file, cb) {
      // cb(null, `${new Date().getTime()}_${file.originalname}`)
      cb(null, file.originalname)
    }
  }),
  limits: {
    fileSize: 100000000 // max file size 1MB = 1000000 bytes
  },
  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(jpeg|jpg|JPG|PNG|png|mp3|MP3|AAC|aac|wav|WAV)$/)) {
      return cb(
        new Error(
          'only upload files with jpg, jpeg, png, pdf, doc, docx, xslx, xls format.'
        )
      )
    }
    cb(undefined, true) // continue with upload
  } 
});

module.exports = upload;