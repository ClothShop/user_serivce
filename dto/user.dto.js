const { z } = require('zod');

const createUserSchema = z.object({
  email: z.string().email(),
  name: z.string().optional(),
  phone: z.string().optional(),
});

const updateUserSchema = createUserSchema.partial();

module.exports = {
  createUserSchema,
  updateUserSchema,
};
