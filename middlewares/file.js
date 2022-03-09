import multer from "multer";

const storage = multer.diskStorage({})

const types = ["image/png", "image/jpeg", "image/jpg"];

const fileFilter = (req, file, cb) => 
{
    if(types.includes(file.mimetype))
    {
        cb(null, true)
    }
    else
    {
        cb(null, false)
    }
}

export default multer({ storage, fileFilter })