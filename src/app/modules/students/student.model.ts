import { Schema, model, connect } from 'mongoose';
import { Student, Parent } from './student.interface';

// export type StudentName =

const studentSchema = new Schema<Student>({
  id: {
    type: String,
    required: true,
  },

  name: {
    firstName: {
      type: String,
      required: true,
    },
    middleName: {
      type: String,
    },
    lastName: {
      type: String,
      required: true,
    },
  },

  gender: ['male', 'female'],
  email: {
    type: String,
    required: true,
  },

  avatar: {
    type: String,
    required: true,
  },
  dateOfBirth: String,
  bloodGroup: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'],
  parent: {
    fatherName: { type: String, required: true },

    fatherOccupation: {
      type: String,
      required: true,
    },
    fatherContactNo: {
      type: String,
      required: true,
    },
    matherName: {
      type: String,
      required: true,
    },
    matherOccupation: {
      type: String,
      required: true,
    },
    matherContactNo: {
      type: String,
      required: true,
    },
  },
  isActive: ['Active', 'Blocked'],
});
