const userService = require('../services/user.service');
const { createUserSchema } = require('../dto/user.dto');
const bcrypt = require('bcrypt');

exports.createUser = async (req, res) => {
  try {
    const validated = createUserSchema.parse(req.body);
    const passwordHash = await bcrypt.hash(validated.password, 10);
    const user = await userService.createUser({ ...validated, passwordHash });
    res.json(user);
  } catch (e) {
    res.status(400).json({ error: e.errors || e.message });
  }
};

exports.getUsers = async (req, res) => {
  const users = await userService.getAllUsers();
  res.json(users);
};

exports.getUser = async (req, res) => {
  const user = await userService.getUserById(req.params.id);
  if (!user) return res.status(404).json({ error: 'Not found' });
  res.json(user);
};

exports.updateUser = async (req, res) => {
  try {
    const updated = await userService.updateUser(req.params.id, req.body);
    res.json(updated);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const requester = req.user || { role: 'Admin' };
    await userService.deleteUser(req.params.id, requester);
    res.json({ message: 'Deleted successfully' });
  } catch (e) {
    res.status(403).json({ error: e.message });
  }
};
