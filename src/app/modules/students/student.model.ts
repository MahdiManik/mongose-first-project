import { Schema, model } from 'mongoose';
import validator from 'validator';
import bcrypt from 'bcrypt';
import {
  TStudent,
  TParent,
  TUserName,
  StudentMOdel,
} from './student.interface';
import config from '../../config';
import { NextFunction } from 'express';

const nameSchema = new Schema<TUserName>({
  firstName: {
    type: String,
    required: [true, 'First name is required'],
    maxlength: 20,
    trim: true,
    validate: {
      validator: function (value: string) {
        const firstNameStr = value.charAt(0).toUpperCase() + value.slice(1);
        return firstNameStr === value;
      },
      message: '{VALUE} is not capitalize format',
    },
  },
  middleName: {
    type: String,
    maxlength: 20,
    trim: true,
  },
  lastName: {
    type: String,
    required: [true, 'Last name is required'],
    maxlength: [20, 'Last Name can not be more than 20 characters'],
    trim: true,
    validate: {
      validator: (value: string) => validator.isAlpha(value),
      message: '{VALUE} in not valid',
    },
  },
});

const parentSchema = new Schema<TParent>({
  fatherName: {
    type: String,
    required: [true, 'Father name is required'],
  },

  fatherOccupation: {
    type: String,
    required: [true, 'Father Occupation is required'],
  },
  fatherContactNo: {
    type: String,
    required: [true, 'Father contact no is required'],
  },
  matherName: {
    type: String,
    required: [true, 'Mather name is required'],
  },
  matherOccupation: {
    type: String,
    required: [true, 'Mather occupation is required'],
  },
  matherContactNo: {
    type: String,
    required: [true, 'Mather contact no is required'],
  },
});

const studentSchema = new Schema<TStudent, StudentMOdel>({
  id: {
    type: String,
    required: [true, 'id is required'],
    unique: true,
  },
  password: {
    type: String,
    required: [true, 'password is required'],
  },

  name: {
    type: nameSchema,
    required: true,
  },

  gender: {
    type: String,
    enum: {
      values: ['male', 'female', 'other'],
      message: '{VALUE} is not valid',
      // message:
      //   "The gender field can only be one of the following: 'male', 'female', or 'other '.",
    },
    required: true,
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    validate: {
      validator: (value: string) => validator.isEmail(value),
      message: '{VALUE} in not valid email',
    },
  },

  avatar: {
    type: String,
    required: [true, 'avatar is required'],
  },
  dateOfBirth: String,

  bloodGroup: {
    type: String,
    enum: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'],
  },

  parent: {
    type: parentSchema,
    required: true,
  },

  isActive: {
    type: String,
    enum: ['Active', 'Blocked'],
    default: 'Active',
  },
  isDeleted: {
    type: Boolean,
    default: false,
  },
});

// pre save middleware / hook this will work on create() and save() function
studentSchema.pre('save', async function (next: NextFunction) {
  // eslint-disable-next-line @typescript-eslint/no-this-alias
  const user = this;
  user.password = await bcrypt.hash(
    user.password,
    Number(config.bcrypt_salt_rounds),
  );
  next();
});

// post save middleware / hook this will work on create() and save() function
studentSchema.post(
  'save',
  function (doc: { password: string }, next: NextFunction) {
    doc.password = '';
    next();
  },
);

studentSchema.pre('find', function (next: NextFunction) {
  this.find({ isDeleted: { $ne: true } });
  next();
});

studentSchema.statics.isUserExist = async function (id: string) {
  const existingUser = Student.findOne({ id });
  return existingUser;
};

// creating a custom instance method
// studentSchema.methods.isUserExist = async function (id: string) {
//   const existingUser = await Student.findOne({ id });
//   return existingUser;
// };

// model
export const Student = model<TStudent, StudentMOdel>('Student', studentSchema);
