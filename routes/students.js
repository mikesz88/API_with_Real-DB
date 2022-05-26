const express = require('express');
const router = express.Router();

const {
  getStudents,
  getClassesByStudent,
  createStudent,
  createStudentsClass,
  updateStudent,
  updateStudentsClass,
  deleteStudent,
  deleteStudentsClasses
} = require('../controllers/students');

router.route('/')
.get(getStudents)
.post(createStudent);

router.route('/:id')
.put(updateStudent)
.delete(deleteStudent);

router.route('/class/:id')
.get(getClassesByStudent)
.post(createStudentsClass)
.put(updateStudentsClass)
.delete(deleteStudentsClasses);

module.exports = router;