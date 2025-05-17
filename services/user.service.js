const {comparePassword, getHashedPassword} = require('../utils/bcrypt.js');
const User = require('../models/user');

const updatePassword = async (UserID, body, res) => {
  const user = await getUserById(UserID);
  if (!await comparePassword(body.currentPassword, user.password_hash)) {
    return res.status(400).json({ success: false, message: "Invalid current password" });
  }
  user.password_hash = await getHashedPassword(body.newPassword);
  await user.save();
}


const createUser = async (data) => {
  return await User.create(data);
};

const getAllUsers = async () => {
  return await User.findAll();
};

const getUserById = async (id) => {
  return await User.findByPk(id);
};

const updateUser = async (id, data) => {
  const user = await User.findByPk(id);
  if (!user) throw new Error('User not found');
  return await user.update(data);
};

const deleteUser = async (id) => {
  const user = await User.findByPk(id);
  if (!user) throw new Error('User not found');
  return await user.destroy();
};

module.exports = {
  createUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
  updatePassword
};
