const express=require('express');
const { Getallusers, createuser, userdetail, updateuser, loginUser, logout, forgotPassword, resetPassword, updatePassword, getadminuser, getsingleuser, getSingleUser, updateUserRole, deleteUser, getAllUser } = require('../Controller/UserController');
const { isAnthentication, authorizeRoles } = require('../midleware/auth');
const { UpdateProduct } = require('../Controller/ProductController');

const router =express.Router();

router.route("/adduser").post(createuser);
router.route("/update/me").put(isAnthentication,updateuser);
router.route("/me").get(isAnthentication,userdetail)
router.route("/userlogin").post(loginUser);
router.route("/logout").get(logout);
router.route("/forgotpassword").post(forgotPassword);
router.route("/password/reset/:token").put(resetPassword);
router.route("/password/update").put(isAnthentication,updatePassword);
router.route("/admin/users").get(getAllUser)
router.route("/admin/user/:id").get(getSingleUser)
.put(isAnthentication, authorizeRoles("admin"), updateUserRole)
  .delete(isAnthentication, authorizeRoles("admin"), deleteUser);
module.exports=router;