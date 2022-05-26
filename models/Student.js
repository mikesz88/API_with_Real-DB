const mongoose = require('mongoose');

const StudentSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: [true, 'Please add first name'],
    trim: true,
    maxlength: [50, 'First name cannot be more than 50 characters'],
  },
  lastName: {
    type: String,
    required: [true, 'Please add last name'],
    trim: true,
    maxlength: [50, 'Last name cannot be more than 50 characters'],
  },
  createdOn: {
    type: Date,
    default: Date.now(),
  },
  grade: {
    type: Number,
    required: [true, 'Please add a grade'],
    max: [100, 'Grade cannot be more than 100'],
    min: [0, 'Grade cannot be more than 0'],
  },
  classes: {
    type: Array,
    required: [true, 'Please add a list an array of classes'],
  },
  updatedOn: {
    type: Date || '',
  }
});

module.exports = mongoose.model('Student', StudentSchema);