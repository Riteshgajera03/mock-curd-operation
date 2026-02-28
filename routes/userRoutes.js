const express = require("express");
const router = express.Router();
const userController = require("../controllers/userControllers");
const multer = require("multer");

const storage = multer.diskStorage({
    destination: "uploads/",
    filename: (req, file, cb) => {
        cb(null, Date.now() + "-" + file.originalname);
    }
});

const upload = multer({ storage });

router.get("/", userController.list);
router.get("/create", userController.createForm);
router.post("/create", upload.single("image"), userController.create);
router.get("/delete/:id", userController.softDelete);
router.post("/multi-delete", userController.multiDelete);

module.exports = router;