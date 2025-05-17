const userService = require('../services/user.service');

exports.getUsers = async (req, res) => {
  const users = await userService.getAllUsers();
  res.json(users);
};

exports.getUser = async (req, res) => {
  const user = await userService.getUserById(req.user.UserID);
  if (!user) return res.status(404).json({ error: 'Not found' });
  res.json(user);
};

exports.updateUser = async (req, res) => {
  try {
    if (req.body.is_changing_password === true) {
      if (!req.body.currentPassword || !req.body.newPassword) {
        res.status(400).json({ error: 'Fill all fields' });
        return;
      }
      await userService.updatePassword(req.user.UserID, req.body, res);
      return res.status(200).json({success: true, message: 'Password updated successfully'});
    } else {
      const updated = await userService.updateUser(req.user.UserID, req.body);
      if (!updated) return res.status(404).json({ error: 'Not found' });
      res.json(updated);
    }
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    await userService.deleteUser(req.user.UserID);
    res.json({ message: 'Deleted successfully' });
  } catch (e) {
    res.status(403).json({ error: e.message });
  }
};
