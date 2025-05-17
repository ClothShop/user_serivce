const { z } = require('zod');

const updateUserSchema = z.object({
  email: z.string().email().optional(),
  name: z.string().optional(),
  phone: z.string().optional(),
  current_password: z.string().optional(),
  new_password: z.string().optional(),
  is_changing_password: z.boolean().optional(),
});

module.exports = {
  updateUserSchema,
};
