const FileController = require("../controllers/FileController");
const router = require("express").Router();
const multer = require("multer");
const path = require("path");
const {getAccessToRoute} = require("../middlewares/auth");

const storage = multer.diskStorage({
    destination: (req,file,callback)=>{
        callback(null,"./uploads/files");
    },
    filename: (req,file,callback)=>{
        const filename = file.originalname.split(".")[0];
        callback(null, filename + Date.now() + path.extname(file.originalname));
    }
})

const upload = multer({storage});
router.use([getAccessToRoute]);
router.get("/", FileController.getAll);
router.post("/upload", upload.single('file'), FileController.upload);
module.exports = router;