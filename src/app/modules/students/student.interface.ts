export type UserName = {
  firstName: string;
  middleName: string;
  lastName: string;
};
export type Parent = {
  fatherName: string;
  fatherOccupation: string;
  fatherContactNo: string;
  matherName: string;
  matherOccupation: string;
  matherContactNo: string;
};

export type Student = {
  id: string;
  name: UserName;
  email: string;
  avatar: string;
  gender: 'male' | 'female';
  dateOfBirth?: string;
  bloodGroup: 'A+' | 'A-' | 'B+' | 'B-' | 'AB+' | 'AB-' | 'O+' | 'O-';
  parent: Parent;
  isActive: 'Active' | 'Blocked';
};
