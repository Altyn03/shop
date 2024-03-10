const Router = require("express");
const router = new Router();

router.use("/user", require("./userRoute"));
router.use("/products", require("./productsRoute"));
router.use("/order", require("./orderRoute"));

module.exports = router;
