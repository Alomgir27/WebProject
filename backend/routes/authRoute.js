const express = require("express");
const {
  createUser,
  loginUserCtrl,
  getallUser,
  getaUser,
  deleteaUser,
  updatedUser,
  blockUser,
  unblockUser,
  handleRefreshToken,
  logout,
  updatePassword,
  forgotPasswordToken,
  resetPassword,
  loginAdmin,
  getWishlist,
  saveAddress,
  userCart,
  getUserCart,
  emptyCart,
  applyCoupon,
  createOrder,
  getOrders,
  updateOrderStatus,
  getAllOrders,
} = require("../controller/userCtrl");
const router = express.Router();
router.post("/register", createUser);
router.post("/forgot-password-token", forgotPasswordToken);

router.put("/reset-password/:token", resetPassword);

router.put("/password", updatePassword);
router.post("/login", loginUserCtrl);
router.post("/admin-login", loginAdmin);
router.post("/cart", userCart);
router.post("/cart/applycoupon", applyCoupon);
router.post("/cart/cash-order", createOrder);
router.get("/all-users", getallUser);
router.get("/get-orders",  getOrders);
router.get("/getallorders", getAllOrders);
router.post("/getorderbyuser/:id", getAllOrders);
router.get("/refresh", handleRefreshToken);
router.get("/logout", logout);
router.get("/wishlist", getWishlist);
router.get("/cart", getUserCart);

router.get("/:id", getaUser);
router.delete("/empty-cart", emptyCart);
router.delete("/:id", deleteaUser);
router.put(
  "/order/update-order/:id",
  updateOrderStatus
);
router.put("/edit-user", updatedUser);
router.put("/save-address", saveAddress);
router.put("/block-user/:id",  blockUser);
router.put("/unblock-user/:id", unblockUser);

module.exports = router;
