const Router = require("express");
const router = new Router();
const auth = require("../middleware/auth.middleware");
const userController = require("../controllers/userController");

router.post("/signUp", userController.signUp);
router.post("/signInWithPassword", userController.signInWithPassword);
router.post("/refreshToken", userController.refreshToken);
router.patch("/updateUser/:id", auth, userController.updateUserData);
router.get("/:id", auth, userController.getUserData);

module.exports = router;
