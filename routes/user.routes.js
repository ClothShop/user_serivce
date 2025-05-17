const express = require('express');
const userController = require('../controllers/user.controller');
const {validateBody} = require("../middleware/validateDto");
const {updateUserSchema} = require("../dto/user.dto");
const {authenticateJWT, authorizeAdmin} = require("../middleware/jwt");


const router = express.Router();

router.get('/admin/users', authenticateJWT, authorizeAdmin, userController.getUsers);
router.get('/users/me', authenticateJWT, userController.getUser);
router.patch('/users/me', authenticateJWT, validateBody(updateUserSchema), userController.updateUser);
router.delete('/users/me', authenticateJWT, userController.deleteUser);

module.exports = router;
