const { z } = require('zod');

const createUserSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
  name: z.string().optional(),
  phone: z.string().optional(),
});

module.exports = {
  createUserSchema,
};
