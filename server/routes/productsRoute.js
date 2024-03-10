const Router = require("express");
const router = new Router();
const productsController = require("../controllers/productsController");
const auth = require("../middleware/auth.middleware");

router.post("/createProduct", auth, productsController.createProduct);
router.get("/getAllProducts", productsController.getAllProducts);
router.get("/getProduct/:id", productsController.getProduct);

module.exports = router;
