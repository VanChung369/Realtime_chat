const router = require("express").Router();
const controller = require("../controller/messagescontroller")
router.post("/get",controller.get);
router.post("/add",controller.add);
router.post("/delete",controller.delete);
module.exports=router;