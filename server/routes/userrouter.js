const router = require("express").Router();
const controller = require("../controller/usercontroller")
router.post("/signup",controller.signup);
router.post("/login",controller.login);
router.get("/alluser/:id",controller.alluser);
module.exports=router;