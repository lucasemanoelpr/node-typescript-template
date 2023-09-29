import multer from 'multer'
import path from 'path'

const storage = multer.diskStorage({
  destination: function (_req, _file, cb) {
    cb(null, 'src/infrastructure/storage/initiativeUploads/')
  },
  filename: function (req, file, cb) {
    cb(
      null,
      req.body.company_id + '-' + Date.now() + path.extname(file.originalname)
    )
  },
})

const uploadMiddleware = multer({ storage })

export { uploadMiddleware }
