import { z } from 'zod';
import validator from 'validator';

// UserName Schema
const nameValidationSchema = z.object({
  firstName: z
    .string()
    .min(1, { message: 'First name is required' })
    .max(20, { message: 'First name must be at most 20 characters long' })
    .trim()
    .refine((value) => /^[A-Z][a-zA-Z]*$/.test(value), {
      message: '{VALUE} is not capitalize format',
    }),

  middleName: z
    .string()
    .max(20, { message: 'Middle name must be at most 20 characters long' })
    .trim()
    .optional(),
  lastName: z
    .string()
    .min(1, { message: 'Last name is required' })
    .max(20, { message: 'Last name must be at most 20 characters long' })
    .trim()
    .refine((value) => validator.isAlpha(value), {
      message: '{VALUE} is not valid',
    }),
});

// Parent Schema
const parentValidationSchema = z.object({
  fatherName: z.string().min(1, { message: 'Father name is required' }),
  fatherOccupation: z
    .string()
    .min(1, { message: 'Father Occupation is required' }),
  fatherContactNo: z
    .string()
    .min(1, { message: 'Father contact no is required' }),
  matherName: z.string().min(1, { message: 'Mother name is required' }),
  matherOccupation: z
    .string()
    .min(1, { message: 'Mother occupation is required' }),
  matherContactNo: z
    .string()
    .min(1, { message: 'Mother contact no is required' }),
});

// Student Schema
const studentValidationSchema = z.object({
  id: z.string().min(1, { message: 'id is required' }),
  password: z.string().min(1, { message: 'password is required' }),
  name: nameValidationSchema,
  gender: z.enum(['male', 'female', 'other'], {
    errorMap: () => ({ message: '{VALUE} is not valid' }),
  }),
  email: z
    .string()
    .email({ message: '{VALUE} is not a valid email' })
    .min(1, { message: 'Email is required' }),
  avatar: z.string().min(1, { message: 'avatar is required' }),
  dateOfBirth: z.string().optional(),
  bloodGroup: z
    .enum(['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'])
    .optional(),
  parent: parentValidationSchema,
  isActive: z.enum(['Active', 'Blocked']).default('Active'),
  isDeleted: z.boolean(),
});

export default studentValidationSchema;
