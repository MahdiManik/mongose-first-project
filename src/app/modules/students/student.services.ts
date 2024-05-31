import { TStudent } from './student.interface';
import { Student } from './student.model';

// create data
const createStudentIntoDB = async (studentData: TStudent) => {
  if (await Student.isUserExist(studentData.id)) {
    throw new Error('User already exist!');
  }

  const result = await Student.create(studentData); //built in static method

  // const student = new Student(studentData); // built in instance method

  // if (await student.isUserExist(studentData.id)) {
  //   throw new Error('User already exist!');
  // }
  // const result = await student.save();

  return result;
};

const getAllStudentsFromDB = async () => {
  const result = await Student.find();
  return result;
};

const getSingleStudentFromDB = async (id: string) => {
  const result = await Student.findOne({ id });
  return result;
};

const deleteStudentFromDB = async (id: string) => {
  const result = await Student.updateOne({ id }, { isDeleted: true });
  return result;
};

export const studentServices = {
  createStudentIntoDB,
  getAllStudentsFromDB,
  getSingleStudentFromDB,
  deleteStudentFromDB,
};
