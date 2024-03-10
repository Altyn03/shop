const Router = require("express");
const router = new Router();
const orderController = require("../controllers/orderController");
const auth = require("../middleware/auth.middleware");

router.post("/createOrder", auth, orderController.createOrder);
router.get("/getUserOrders/:id", auth, orderController.getUserOrders);

module.exports = router;
