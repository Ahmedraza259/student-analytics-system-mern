const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema(
  {
    studentName: {
      type: String,
      required: true,
    },
    studentSubject: {
      type: String,
      required: true,
    },
    totalScore: {
      type: Number,
      required: true,
      validate: {
        validator: function (value) {
          return Number.isFinite(value) && value >= 0;
        },
        message: 'Total score must be a non-negative number and not in exponential notation',
      },
    },
    studentScore: {
      type: Number,
      required: true,
      validate: {
        validator: function (value) {
          return Number.isFinite(value) && value >= 0;
        },
        message: 'Student score must be a non-negative number and not in exponential notation',
      },
    },
    studentFeedback: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Student", studentSchema);
