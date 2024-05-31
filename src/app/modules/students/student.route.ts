import express from 'express';
import { studentController } from './student.controllers';

const router = express.Router();

// Create
router.post('/create-student', studentController.createStudent);

// Read
router.get('/', studentController.getAllStudents);

// Read single data by id
router.get('/:studentId', studentController.getSingleStudent);

// Delete a single data by id
router.delete('/:studentId', studentController.deleteStudent);

export const studentRoutes = router;
