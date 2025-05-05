
const User = require('../models/user');

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

const deleteUser = async (id, requester) => {
  if (requester.role !== 'Admin') throw new Error('Unauthorized');
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
};
