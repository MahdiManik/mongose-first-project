import { Model } from 'mongoose';

export type TUserName = {
  firstName: string;
  middleName?: string;
  lastName: string;
};
export type TParent = {
  fatherName: string;
  fatherOccupation: string;
  fatherContactNo: string;
  matherName: string;
  matherOccupation: string;
  matherContactNo: string;
};

export type TStudent = {
  id: string;
  password: string;
  name: TUserName;
  email: string;
  avatar: string;
  gender: 'male' | 'female' | 'other';
  dateOfBirth?: string;
  bloodGroup?: 'A+' | 'A-' | 'B+' | 'B-' | 'AB+' | 'AB-' | 'O+' | 'O-';
  parent: TParent;
  isActive: 'Active' | 'Blocked';
  isDeleted: boolean;
};

// for creating instance method

// export type StudentMethods = {
//   isUserExist(id: string): Promise<TStudent | null>;
// };

// export type StudentModel = Model<
//   TStudent,
//   Record<string, never>,
//   StudentMethods
// >;

// for creating static method

export interface StudentMOdel extends Model<TStudent> {
  isUserExist(id: string): Promise<TStudent | null>;
}
