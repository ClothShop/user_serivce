const express = require('express');
const userController = require('../controllers/user.controller');
const {validateBody} = require("../middleware/validateDto");
const {updateUserSchema} = require("../dto/user.dto");
const {authenticateJWT, authorizeAdmin} = require("../middleware/jwt");


const router = express.Router();

router.get('/', authenticateJWT, authorizeAdmin, userController.getUsers);
router.get('/me', authenticateJWT, userController.getUser);
router.patch('/me', authenticateJWT, validateBody(updateUserSchema), userController.updateUser);
router.delete('/me', authenticateJWT, userController.deleteUser);

module.exports = router;
