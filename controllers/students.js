const Student = require('../models/Student');

// @desc Get all students
// @route GET /api/v1/students
// // @access PUBLIC
exports.getStudents = async (request, response, next) => {
  try {
    const students = await Student.find();
    response.status(200).json({ success: true, count: students.length, data: students });
  } catch (error) {
    response.status(400).json({ success: false })
  }
}

// // @desc Get List of Classes from Student
// // @route GET /api/v1/students/classes/:id
// // @access PUBLIC
exports.getClassesByStudent = async (request, response, next) => {
  try {
    const student = await Student.findById(request.params.id);
    response.status(200).json({ success: true, data: student.classes});
  } catch (error) {
    response.status(400).json({ success: false })
  }
}

// @desc Create new Student
// @route POST /api/v1/students
// @access PRIVATE
exports.createStudent = async (request, response, next) => {
  try {
    const student = await Student.create(request.body);
    response.status(201).json({ success: true, data: student });
  } catch (error) {
    response.status(400).json({ success: false });
  }
}

// @desc Add New Classes
// @route POST /api/v1/students/class/:id
// // @access PRIVATE
exports.createStudentsClass = async (request, response, next) => {
  request.body.updatedOn = Date.now();
  
  try {
    const updatedStudent = await Student.findByIdAndUpdate(request.params.id, request.body, {
        new: true,
        runValidators: true
      }
    );
    if (!updatedStudent) {
      return response.status(400).json(
        { 
          success: false, 
          body: `Could not find student with id: ${request.params.id}`
        });
    }
    response.status(200).json({ success: true, data: updatedStudent.classes});
  } catch (error) {
    response.status(400).json({ success: false });
  }
}

// @desc Update  single student
// @route POST /api/v1/student/:id
// // @access PRIVATE
exports.updateStudent = async (request, response, next) => {
  request.body.updatedOn = Date.now();

  try {
    const student = await Student.findByIdAndUpdate(request.params.id, request.body, {
      new: true,
      runValidators: true
    })

    if (!student) {
      response.status(400).json({ success: false });
    }
    response.status(200).json({ success: true, data: student});
  } catch (error) {
    response.status(400).json({ success: false });
    
  }
}

// @desc Update student's single class
// @route PUT /api/v1/student/class/:id
// // @access PRIVATE
exports.updateStudentsClass = async (request, response, next) => {
  request.body.updatedOn = Date.now();
  
  try {
    const updatedStudent = await Student.findByIdAndUpdate(
      request.params.id, 
      {$addToSet: {classes: { $each: request.body.classes}},
        updatedOn: request.body.updatedOn  
    }, 
      {
        new: true,
        runValidators: true
      }
    );
    if (!updatedStudent) {
      return response.status(400).json(
        { 
          success: false, 
          body: `Could not find student with id: ${request.params.id}`
        });
    }
    response.status(200).json({ success: true, data: updatedStudent.classes});
  } catch (error) {
    response.status(400).json({ success: false });
  }
}


// @desc Delete single student
// @route DELETE /api/v1/students/:id
// // @access PRIVATE
exports.deleteStudent = async (request, response, next) => {
  try {
    const student = await Student.findByIdAndDelete(request.params.id);
    if (!student) {
      response.status(400).json({ success: false });
    }

    response.status(200).json({ success: true, message: "The Student has been deleted."});
  } catch (error) {
    response.status(400).json({ success: false });
  }
}

// @desc Delete student's classes
// @route DELETE /api/v1/student/class/:id
// // @access PRIVATE
exports.deleteStudentsClasses = async (request, response, next) => {
  request.body.updatedOn = Date.now();

  try {
    const student = await Student.findByIdAndUpdate(request.params.id, {
      $pullAll: { classes: request.body.classes}
    }, 
    {
      new: true,
      runValidators: true
    })

    if (!student) {
      response.status(400).json({ success: false });
    }
    
    response.status(200).json({ success: true, message: 'The class(es) have been deleted.'});
  } catch (error) {
    response.status(400).json({ success: false });
  }
}




