const fs = require('fs');
const Student = require("../models/student.model");
const run = require("../../functions")
const path = require("path")
require('dotenv').config();


exports.addStudent = async (req, res) => {
  try {
    const { body: payload } = req;
    if (!payload) {
      return res.status(400).json({
        success: false,
        message: "Payload Incomplete",
      });
    }
    const newStudent = await Student.create(payload);
    if (newStudent) {
      const studentsWithFeedback = await Student.aggregate([
        {
          $group: {
            _id: { $toLower: "$studentName" },
            feedback: { $push: { $toLower: "$studentFeedback" } },
          },
        },
      ]);
      const studentsWithFeedbackString = JSON.stringify(studentsWithFeedback, 2);

      fs.writeFile('./docs/feedback.json', studentsWithFeedbackString, error => {
        if (error) {
          console.log(error)
        }
      })
      return res.status(200).json({
        success: true,
        message: "Student Created and save Successfully",
        data: newStudent,
        feedbacks: studentsWithFeedback
      });
    } else {
      return res.status(500).send({
        success: false,
        message: "Could Not Create The Student.",
      });
    }


  } catch (error) {
    console.error(error);
    return res.status(500).send({
      success: false,
      message: "Error creating the Student",
      error: error,
    });
  }
};

exports.getStudents = async (req, res) => {
  try {
    const studentList = await Student.find();

    if (studentList) {
      return res.status(200).send({
        success: true,
        message: "Students Fetched Successfully.",
        data: studentList,
      });
    } else {
      return res.status(404).send({
        success: false,
        message: "Students Not Found.",
      });
    }
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: "Error while fetching the Student",
      error: error,
    });
  }
};

exports.getAllSubjects = async (req, res) => {
  try {
    const distinctSubjects = await Student.distinct("studentSubject");

    if (!distinctSubjects || distinctSubjects.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No subjects found",
      });
    }
    const averageScores = await Student.aggregate([
      {
        $match: {
          studentSubject: { $in: distinctSubjects }
        }
      },
      {
        $project: {
          studentSubject: 1,
          percentageScore: {
            $multiply: [
              { $divide: ["$studentScore", "$totalScore"] },
              100
            ]
          }
        }
      },
      {
        $group: {
          _id: "$studentSubject",
          averagePercentageScore: { $avg: "$percentageScore" }
        }
      },
      {
        $project: {
          subject: "$_id",
          averagePercentageScore: 1,
          _id: 0
        }
      }
    ]);
    return res.status(200).json({
      success: true,
      message: "Subjects fetched successfully",
      data: averageScores,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Error fetching subjects",
      error: error,
    });
  }
};

exports.getFeedbacks = async (req, res) => {
  try {
    const studentsWithFeedback = await Student.aggregate([
      {
        $group: {
          _id: { $toLower: "$studentName" },
          studentFeedback: { $push: { $toLower: "$studentFeedback" } },
        },
      },
    ]);

    if (studentsWithFeedback.length > 0) {
      return res.status(200).json({
        success: true,
        message: "Fetching feedbacks",
        data: studentsWithFeedback,

      })
    } else {
      return res.status(200).json({
        success: false,
        message: "No students with feedback",
      });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Error fetching feedbacks",
      error: error,
    });
  }
};

exports.getLlmPredictions = async (req, res) => {
  try {
    const message = req.body;
    const result = await run(message.message)
    if (result) {
      return res.status(200).send({
        success: true,
        message: "Student predict Successfully.",
        data: result.output_text,
      });
    } else {
      return res.status(500).send({
        success: false,
        message: "Not able to predict.",
      });
    }
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: "Error while fetching the Student",
      error: error,
    });
  }


}